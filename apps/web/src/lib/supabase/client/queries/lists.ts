import { createClient } from "@/lib/supabase/client";

export async function getList(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  if (error) {
    throw new Error("Failed to fetch list");
  }

  return data;
}

export async function getLists(nextCursor: string | null = null) {
  const supabase = createClient();

  let query = supabase
    .from("lists")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (nextCursor) {
    query = query.lt("created_at", nextCursor);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error("Failed to fetch lists");
  }

  return data;
}
