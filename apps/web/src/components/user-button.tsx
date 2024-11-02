"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import React from "react";
import { createClient } from "@/lib/supabase/client";
import { IconButton } from "@repo/ui/icon-button";

interface UserButtonProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export default function UserButton({ user }: UserButtonProps): JSX.Element {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton className="rounded-full" variant="ghost">
          <Avatar>
            <AvatarImage alt={user.name} src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="font-normal flex gap-3 items-center">
          <Avatar>
            <AvatarImage alt={user.name} src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1 overflow-hidden">
            <span className="text-sm font-medium leading-none">
              {user.name}
            </span>
            <span className="text-xs leading-none text-gray-600">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}> Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
