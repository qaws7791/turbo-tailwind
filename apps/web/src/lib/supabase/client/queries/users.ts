import { createClient } from "@/lib/supabase/client";

export default async function getProfile() {
  const supabase = createClient();

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
