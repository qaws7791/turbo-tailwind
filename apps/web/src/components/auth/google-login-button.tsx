"use client";
import { signInWithGoogle } from "@/lib/supabase/client/users/users.mutations";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

export interface CredentialResponse {
  credential: string;
  select_by:
    | "auto"
    | "user"
    | "user_1tap"
    | "user_2tap"
    | "btn"
    | "btn_confirm"
    | "btn_add_session"
    | "btn_confirm_add_session";
}
declare global {
  interface Window {
    handleSignInWithGoogle?: (response: CredentialResponse) => Promise<void>;
  }
}

export default function GoogleLoginButton() {
  const router = useRouter();
  useLayoutEffect(() => {
    const handleSignInWithGoogle = async (response: CredentialResponse) => {
      const { error } = await signInWithGoogle(response.credential);
      if (error) throw error;
      router.push("/app");
    };

    window.handleSignInWithGoogle = handleSignInWithGoogle;
    return () => {
      if (window.handleSignInWithGoogle) {
        delete window.handleSignInWithGoogle;
      }
    };
  });

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full">
      <div
        data-auto_prompt="false"
        data-callback="handleSignInWithGoogle"
        data-client_id="504591125395-jt0hr77qe9q94sc53tl67g316k7c89hb.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        id="g_id_onload"
      />

      <div
        className="g_id_signin"
        data-logo_alignment="center"
        data-shape="pill"
        data-size="large"
        data-text="signin_with"
        data-theme="outline"
        data-type="standard"
        data-width="288"
      />
    </div>
  );
}
