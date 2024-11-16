import { Button } from "@repo/ui/button";
import Link from "next/link";

export default function LandingHeader(): JSX.Element {
  return (
    <div className="fixed top-0 left-0 w-full bg-white flex justify-between h-16 px-6 py-4 items-center">
      {/* left section */}

      <Link
        className="font-semibold text-xl inline-flex items-center gap-2 h-full"
        href="/"
      >
        <img
          src="/logo-48.png"
          alt="ListBird"
          className="w-8 h-8 rounded-full"
        />
        ListBird
      </Link>

      {/* right section */}
      <div>
        <Button asChild>
          <Link href="/login">로그인</Link>
        </Button>
      </div>
    </div>
  );
}
