import LandingHeader from "@/app/(public)/landing-header";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="pt-20">
      <LandingHeader />
      {children}
    </div>
  );
}
