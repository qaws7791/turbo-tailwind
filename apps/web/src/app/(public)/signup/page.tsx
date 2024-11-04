import EmailSignupForm from "@/app/(public)/signup/email-signup-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/app");
  }
  return (
    <div>
      <div className="max-w-xs mx-auto">
        <h1 className="text-2xl font-semibold my-4">Login</h1>
        <EmailSignupForm />
      </div>
    </div>
  );
}
