import { Button } from "@repo/ui/button";
import Link from "next/link";

export default function LandingPage(): JSX.Element {
  return (
    <div>
      <section className="max-w-screen-xl mx-auto text-center mt-12 p-4">
        <h1 className="text-blue-600 text-6xl font-semibold">링크버드</h1>
        <p className="text-5xl font-semibold mt-4">
          링크들을 하나의 리스트에 모으고 공유하세요
        </p>

        <div className="mt-10">
          <Button size="lg" className="mx-auto max-w-50" asChild>
            <Link href="/login">지금 시작하기</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
