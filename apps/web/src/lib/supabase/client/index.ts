import { createBrowserClient } from "@supabase/ssr";
import { type Database } from "../supabase";
import { clientEnv } from "@/lib/env";

const SUPABASE_URL = clientEnv.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
}
