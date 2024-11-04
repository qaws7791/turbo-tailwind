"use client";
import type { Tables } from "@/lib/supabase/supabase";
import { Button } from "@repo/ui/button";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Album, Lock, UsersRound } from "lucide-react";
import Link from "next/link";

export default function ListsView(): JSX.Element {
  const listQuery = useSuspenseInfiniteQuery({
    queryKey: ["lists"],
    queryFn: ({ pageParam = null }) => {
      return fetch(`/api/lists?${pageParam ? `cursor=${pageParam}` : ""}`).then(
        (res) => res.json() as Promise<Tables<"lists">[]>
      );
    },
    getNextPageParam: (lastPage) => {
      return lastPage.length === 20 ? lastPage[lastPage.length - 1].id : null;
    },
    initialPageParam: null as string | null,
  });

  const items = listQuery.data.pages.flatMap((page) => page);
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {items.map((list) => (
          <Link
            className="border border-gray-200 rounded-lg"
            href={`/app/lists/${list.id}`}
            key={list.id}
          >
            <div className="flex items-center justify-center h-32 bg-blue-100">
              <Album />
            </div>
            <div className="px-3 py-4">
              <p className="font-medium">{list.title}</p>
              <div className="flex items-center gap-1 text-sm">
                {list.is_public ? (
                  <UsersRound className="size-3" />
                ) : (
                  <Lock className="size-3" />
                )}
                {list.is_public ? "공개" : "비공개"}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-col justify-center p-8">
        {listQuery.hasNextPage ? (
          <Button
            disabled={listQuery.isFetchingNextPage}
            onClick={() => listQuery.fetchNextPage()}
          >
            더보기
          </Button>
        ) : null}
      </div>
    </div>
  );
}
