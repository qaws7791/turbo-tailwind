import { createClient } from "@/lib/supabase/client";

export const signInWithPassword = async (email: string, password: string) => {
  const supabase = createClient();
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signUpWithPassword = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  const supabase = createClient();
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_name: username,
      },
    },
  });
};

export const signInWithGoogle = async (credential: string) => {
  const supabase = createClient();
  return supabase.auth.signInWithIdToken({
    provider: "google",
    token: credential,
  });
};

export const signOut = async () => {
  const supabase = createClient();
  return supabase.auth.signOut();
};
