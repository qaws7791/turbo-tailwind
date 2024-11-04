"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import { ErrorMessage } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";

const logisnSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginData = z.infer<typeof logisnSchema>;

export default function EmailLoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<LoginData>({
    resolver: zodResolver(logisnSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data: LoginData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      if (error.code === "invalid_credentials") {
        form.setError("root", {
          message: "이메일 주소 또는 비밀번호가 올바르지 않습니다.",
        });
        return;
      }
      form.setError("root", {
        message: "로그인 중 문제가 발생했습니다. 나중에 다시 시도해주세요.",
      });
    }

    router.push("/app");
  });

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <Label>
        이메일
        <Input
          className="mt-2"
          type="email"
          {...form.register("email")}
          aria-invalid={Boolean(form.formState.errors.email)}
        />
      </Label>
      <ErrorMessage>{form.formState.errors.email?.message}</ErrorMessage>
      <Label>
        비밀번호
        <Input
          className="mt-2"
          type="password"
          {...form.register("password")}
          aria-invalid={Boolean(form.formState.errors.password)}
        />
      </Label>
      <ErrorMessage>{form.formState.errors.password?.message}</ErrorMessage>
      <div className="flex justify-end">
        <Link className="hover:underline text-sm" href="/forgot-password">
          비밀번호를 잊으셨나요?
        </Link>
      </div>
      <ErrorMessage>{form.formState.errors.root?.message}</ErrorMessage>
      <Button type="submit">로그인</Button>
    </form>
  );
}
