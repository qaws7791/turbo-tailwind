import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import "server-only";
import { type Database } from "../supabase";
import { clientEnv } from "@/lib/env";

const SUPABASE_URL = clientEnv.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function createClient() {
  const cookieStore = await cookies();

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- `options` is a valid argument
            cookieStore.set(name, value, { ...options })
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
