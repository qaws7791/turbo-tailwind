import AppSideContent from "@/app/(app)/app-side-content";
import UserButton from "@/components/user-button";
import getProfile from "@/lib/supabase/server/uesrs/users.queries";
import { redirect } from "next/navigation";

export default async function AppLeftBar() {
  const profile = await getProfile();

  if (!profile) {
    return redirect("/login");
  }

  return (
    <div className="h-screen max-w-60 w-full p-4 border border-gray-200 hidden lg:flex lg:flex-col lg:justify-between">
      <div>
        <AppSideContent />
      </div>
      <div>
        <UserButton
          user={{
            name: profile.username,
            email: profile.email,
            avatar: profile.avatar_url,
          }}
        />
      </div>
    </div>
  );
}
