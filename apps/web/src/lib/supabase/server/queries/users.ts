import { createClient } from "@/lib/supabase/server";
import "server-only";

export default async function getProfile() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("users")
    .select()
    .eq("id", data.user.id)
    .limit(1)
    .single();
  return profile;
}
