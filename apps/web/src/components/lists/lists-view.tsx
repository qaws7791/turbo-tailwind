/* eslint-disable @next/next/no-img-element -- Using img element for better control over image rendering */
"use client";
import { fetchLists } from "@/client/api/apis/list.api";
import { Button } from "@repo/ui/button";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Album, Lock, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ListsView(): JSX.Element {
  const listQuery = useSuspenseInfiniteQuery({
    queryKey: ["lists"],
    queryFn: ({ pageParam = undefined }) => {
      return fetchLists({ cursor: pageParam });
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
            className="border border-gray-200 rounded-lg overflow-hidden"
            href={`/app/lists/${list.id}`}
            key={list.id}
          >
            <div className="relative rounded-lg overflow-hidden">
              <ListThumbnail
                links={list.links
                  .filter((link) => link.preview_url !== null)
                  .map(
                    (link) =>
                      ({ src: link.preview_url, title: link.title }) as {
                        src: string;
                        title: string;
                      }
                  )}
              />
              <div className="absolute bottom-2 right-2 px-2 bg-black/60 text-white rounded-full text-sm">
                {list.links.length}
              </div>
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

function ListThumbnail({
  links,
}: {
  links: {
    title: string;
    src: string;
  }[];
}): JSX.Element {
  const visibleLinks = links.slice(0, 3);

  if (visibleLinks.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 bg-blue-100">
        <Album />
      </div>
    );
  }

  if (visibleLinks.length === 1) {
    return (
      <div className="h-32 bg-blue-100 relative w-full">
        <Image
          alt={visibleLinks[0].title}
          className="object-cover w-full h-full"
          fill
          sizes="300px"
          src={visibleLinks[0].src}
        />
      </div>
    );
  }

  if (visibleLinks.length === 2) {
    return (
      <div className="h-32 flex">
        {visibleLinks.map((link) => (
          <div className="relative w-1/2 h-full" key={link.src}>
            <Image
              alt={link.title}
              className="object-cover w-full h-full"
              fill
              sizes="300px"
              src={link.src}
            />
          </div>
        ))}
      </div>
    );
  }

  const [first, ...rest] = visibleLinks;
  return (
    <div className="flex h-32">
      <div className="relative w-2/3 h-full">
        <Image
          alt={first.title}
          className="object-cover w-full h-full"
          fill
          sizes="300px"
          src={first.src}
        />
      </div>
      <div className="relative w-1/3 h-full">
        {rest.map((link) => (
          <div className="relative w-full h-1/2" key={link.src}>
            <Image
              alt={link.title}
              className="object-cover w-full h-full"
              fill
              sizes="300px"
              src={link.src}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
