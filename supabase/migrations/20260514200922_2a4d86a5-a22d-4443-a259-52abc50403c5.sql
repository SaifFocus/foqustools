-- PROFILES
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  provider text,
  marketing_consent boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- USER CREDITS
create table public.user_credits (
  user_id uuid primary key references auth.users(id) on delete cascade,
  balance integer not null default 10,
  total_used integer not null default 0,
  updated_at timestamptz not null default now()
);
alter table public.user_credits enable row level security;
create policy "Users can view own credits" on public.user_credits for select using (auth.uid() = user_id);
create policy "Users can update own credits" on public.user_credits for update using (auth.uid() = user_id);

-- TOOL USAGE LOG
create table public.tool_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tool_slug text not null,
  tool_name text,
  created_at timestamptz not null default now()
);
alter table public.tool_usage enable row level security;
create policy "Users can view own usage" on public.tool_usage for select using (auth.uid() = user_id);
create policy "Users can insert own usage" on public.tool_usage for insert with check (auth.uid() = user_id);
create index tool_usage_user_id_created_idx on public.tool_usage (user_id, created_at desc);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();
create trigger user_credits_set_updated_at before update on public.user_credits
  for each row execute procedure public.set_updated_at();

-- Auto-create profile and credits on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, provider)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_app_meta_data->>'provider', 'email')
  )
  on conflict (id) do nothing;

  insert into public.user_credits (user_id, balance)
  values (new.id, 10)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Atomic credit decrement
create or replace function public.deduct_credit(p_tool_slug text, p_tool_name text)
returns table (balance integer, total_used integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_new_balance integer;
  v_total_used integer;
begin
  if v_uid is null then
    raise exception 'Not authenticated';
  end if;

  update public.user_credits
    set balance = balance - 1,
        total_used = total_used + 1
    where user_id = v_uid and balance > 0
    returning balance, total_used into v_new_balance, v_total_used;

  if v_new_balance is null then
    raise exception 'No credits remaining' using errcode = 'P0001';
  end if;

  insert into public.tool_usage (user_id, tool_slug, tool_name)
  values (v_uid, p_tool_slug, coalesce(p_tool_name, p_tool_slug));

  return query select v_new_balance, v_total_used;
end;
$$;