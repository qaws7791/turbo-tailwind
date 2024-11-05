import AppDrawer from "@/app/(app)/app-drawer";
import UserButton from "@/components/user-button";
import getProfile from "@/lib/supabase/server/queries/users";
import { redirect } from "next/navigation";

export default async function AppHeader(): Promise<JSX.Element> {
  const profile = await getProfile();

  if (!profile) {
    return redirect("/login");
  }
  return (
    <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 lg:hidden bg-white">
      {/* left section */}
      <div>
        <AppDrawer />
      </div>
      {/* right section */}
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
