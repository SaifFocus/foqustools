import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getMe = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [{ data: profile }, { data: credits }, { data: usage }] = await Promise.all([
      supabase.from("profiles").select("id, email, full_name, avatar_url, created_at").eq("id", userId).maybeSingle(),
      supabase.from("user_credits").select("balance, total_used, updated_at").eq("user_id", userId).maybeSingle(),
      supabase.from("tool_usage").select("tool_slug, tool_name, created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(10),
    ]);
    return {
      profile: profile ?? null,
      credits: credits ?? { balance: 0, total_used: 0, updated_at: new Date().toISOString() },
      recentUsage: usage ?? [],
    };
  });

export const deductCredit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({
      toolSlug: z.string().min(1).max(120),
      toolName: z.string().min(1).max(200),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { data: result, error } = await supabase.rpc("deduct_credit", {
      p_tool_slug: data.toolSlug,
      p_tool_name: data.toolName,
    });
    if (error) {
      return { ok: false as const, reason: error.message.includes("No credits") ? "no_credits" as const : "error" as const, message: error.message };
    }
    const row = Array.isArray(result) ? result[0] : result;
    return { ok: true as const, balance: row?.balance ?? 0, totalUsed: row?.total_used ?? 0 };
  });