"use client";
import { signUpWithPassword } from "@/lib/supabase/client/users/users.mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import { ErrorMessage } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
  username: z.string().min(3).max(30),
});

type SignupData = z.infer<typeof signupSchema>;

export default function EmailSignupForm() {
  const router = useRouter();
  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data: SignupData) => {
    // Sign up the user
    const { error } = await signUpWithPassword(data);

    if (error) {
      form.setError("root", {
        message: error.message,
      });
      return;
    }

    // Redirect to the home page
    router.push("/app");
  });

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <Label>
        Email
        <Input className="mt-2" type="email" {...form.register("email")} />
      </Label>
      <ErrorMessage>{form.formState.errors.email?.message}</ErrorMessage>
      <Label>
        Password
        <Input
          className="mt-2"
          type="password"
          {...form.register("password")}
        />
      </Label>
      <ErrorMessage>{form.formState.errors.password?.message}</ErrorMessage>
      <Label>
        Username
        <Input className="mt-2" {...form.register("username")} />
      </Label>
      <ErrorMessage>{form.formState.errors.username?.message}</ErrorMessage>
      <Button type="submit">Signup</Button>
      <ErrorMessage>{form.formState.errors.root?.message}</ErrorMessage>
    </form>
  );
}
