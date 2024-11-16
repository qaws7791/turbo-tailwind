import LandingHeader from "@/app/(public)/landing-header";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="pt-16">
      <LandingHeader />
      {children}
    </div>
  );
}
