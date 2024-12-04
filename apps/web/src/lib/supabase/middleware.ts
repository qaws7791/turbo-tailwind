/* eslint-disable @typescript-eslint/no-unsafe-argument -- supabase setup
 */
import { clientEnv } from "@/lib/env";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const SUPABASE_URL = clientEnv.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const isPrivateRoute = request.nextUrl.pathname.startsWith("/app");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (isPrivateRoute && !user) {
    supabaseResponse = NextResponse.redirect(new URL("/login", request.url));
  }

  return supabaseResponse;
}
