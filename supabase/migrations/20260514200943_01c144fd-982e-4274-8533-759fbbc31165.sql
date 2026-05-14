-- Fix set_updated_at search_path
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- handle_new_user: only the trigger should ever call it
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- deduct_credit: only signed-in users should call it (intentional)
revoke execute on function public.deduct_credit(text, text) from public, anon;
grant execute on function public.deduct_credit(text, text) to authenticated;