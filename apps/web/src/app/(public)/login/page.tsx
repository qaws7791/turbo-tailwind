import EmailLoginForm from "@/components/auth/email-login-form";
import GoogleLoginButton from "@/components/auth/google-login-button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/app");
  }

  return (
    <div>
      <h1 className="sr-only">Listbird 로그인</h1>
      <div className="max-w-80 mx-auto border border-gray-200 p-4 rounded-2xl">
        <p className="text-2xl font-semibold my-4 text-center break-keep">
          Listbird에 오신 것을 환영합니다
        </p>
        <GoogleLoginButton />
        <div className="flex items-center my-4">
          {/* left line */}
          <div className="h-px bg-gray-200 flex-1" />
          <p className="text-center mx-4 text-gray-500">또는</p>
          <div className="h-px bg-gray-200 flex-1" />
        </div>
        <EmailLoginForm />
        <Link
          className=" hover:underline inline-block w-full text-center text-sm mt-4"
          href="/signup"
        >
          아직 회원이 아니신가요? 회원가입
        </Link>
      </div>
    </div>
  );
}
