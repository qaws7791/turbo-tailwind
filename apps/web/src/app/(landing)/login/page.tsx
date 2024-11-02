import EmailLoginForm from "@/app/(landing)/login/email-login-form";
import GoogleLoginButton from "@/app/(landing)/login/google-login-button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/app");
  }

  return (
    <div>
      <h1 className="sr-only">Listbird 로그인</h1>
      <div className="max-w-72 mx-auto">
        <p className="text-2xl font-semibold my-4 text-center break-keep">
          Listbird에 오신 것을 환영합니다
        </p>
        <GoogleLoginButton />
        <p className="text-center my-4">또는</p>
        <EmailLoginForm />
        <Link className=" hover:underline text-sm" href="/signup">
          아직 회원이 아니신가요? 회원가입
        </Link>
      </div>
    </div>
  );
}
