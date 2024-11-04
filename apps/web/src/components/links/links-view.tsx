"use client";
import type { Tables } from "@/lib/supabase/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { IconButton } from "@repo/ui/icon-button";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Edit2Icon,
  EllipsisVertical,
  ImageIcon,
  LinkIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";

interface LinksViewProps {
  listId: string;
}

export default function LinksView({ listId }: LinksViewProps): JSX.Element {
  const linkQuery = useSuspenseQuery({
    queryKey: ["lists", listId, "links"],
    queryFn: () => {
      return fetch(`http://localhost:3000/api/lists/${listId}/links`).then(
        (res) => res.json() as Promise<Tables<"links">[]>
      );
    },
  });

  return (
    <div className="flex gap-3 flex-col">
      {linkQuery.data.map((link) => (
        <div className="mx-4 " key={link.id}>
          <div className="flex gap-3 min-h-32 py-4">
            <div className="flex-shrink-0">
              {link.preview_url ? (
                <Image
                  alt="Preview"
                  className="rounded-md aspect-square object-cover w-24 h-24"
                  height={96}
                  src={link.preview_url}
                  width={96}
                />
              ) : (
                <ImageIcon />
              )}
            </div>
            <div className="flex-1 justify-between flex flex-col">
              <h3 className="text-lg font-semibold line-clamp-3 leading-tight">
                {link.title}
              </h3>

              <a
                className="flex gap-1 items-center line-clamp-1 text-gray-500 hover:underline"
                href={link.url}
                rel="noreferrer"
                target="_blank"
              >
                <LinkIcon className="size-4" />
                {new URL(link.url).hostname}
              </a>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton variant="ghost">
                    <EllipsisVertical className="size-5" />
                  </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="sr-only">
                    링크 메뉴
                  </DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Edit2Icon />
                      <span>수정</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash2Icon />
                      <span>삭제</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex border-b border-gray-200 pb-2">
            <p className="text-gray-600">{link.memo}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
