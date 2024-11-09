import { Button } from "@repo/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>404 Not Found</h2>
      <p>페이지를 찾을 수 없습니다.</p>
      <Button asChild size="lg">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
