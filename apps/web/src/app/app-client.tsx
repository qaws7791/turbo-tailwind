"use client";
import { button, Button } from "@repo/ui/button";
import Link from "next/link";

export default function AppClient() {
  return (
    <div>
      <Button>AppClient</Button>
      <Link className={button()} href="/app">
        App
      </Link>
    </div>
  );
}
