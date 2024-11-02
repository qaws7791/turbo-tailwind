import { Button } from "@repo/ui/button";
import Link from "next/link";

export default function LandingHeader(): JSX.Element {
  return (
    <div className="fixed top-0 left-0 w-full bg-white flex justify-between h-20 px-6 py-4 items-center">
      {/* left section */}
      <div>
        <Link href="/">
          <span className="font-semibold text-lg">📍 ListBird</span>
        </Link>
      </div>
      {/* right section */}
      <div>
        <Button asChild>
          <Link href="/login">로그인</Link>
        </Button>
      </div>
    </div>
  );
}
