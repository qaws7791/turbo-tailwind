import AppHeader from "@/app/(app)/app-header";
import AppSideContent from "@/app/(app)/app-side-content";
import QueryProvider from "@/components/query-provider";
import UserButton from "@/components/user-button";
import getProfile from "@/lib/supabase/server/queries/users";
import { Toaster } from "@repo/ui/toaster";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const profile = await getProfile();

  if (!profile) {
    return <div>loading...</div>;
  }

  return (
    <QueryProvider>
      <div className="h-full w-full flex">
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
        <div className="min-h-screen pt-16 lg:pt-0 w-full flex-1">
          <AppHeader />
          {children}
        </div>
        <Toaster />
      </div>
    </QueryProvider>
  );
}
