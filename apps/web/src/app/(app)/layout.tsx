import AppHeader from "@/app/(app)/app-header";
import AppLeftBar from "@/app/(app)/app-left-bar";
import QueryProvider from "@/components/query-provider";
import { Toaster } from "@repo/ui/toaster";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <QueryProvider>
      <div className="h-full w-full flex">
        <AppLeftBar />
        <div className="min-h-screen pt-16 lg:pt-0 w-full flex-1">
          <AppHeader />
          {children}
        </div>
        <Toaster />
      </div>
    </QueryProvider>
  );
}
