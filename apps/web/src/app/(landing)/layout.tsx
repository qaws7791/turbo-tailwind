import LandingHeader from "@/app/(landing)/landing-header";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div>
      <LandingHeader />
      {children}
    </div>
  );
}
