"use client";
import { fetchLinks } from "@/api/apis/link.api";
import LinkMenu from "@/components/links/link-menu";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ImageIcon, LinkIcon } from "lucide-react";
import Image from "next/image";

interface LinksViewProps {
  listId: string;
}

export default function LinksView({ listId }: LinksViewProps): JSX.Element {
  const linkQuery = useSuspenseQuery({
    queryKey: ["lists", listId, "links"],
    queryFn: () => {
      return fetchLinks({ listId });
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
                  height={200}
                  src={link.preview_url}
                  width={200}
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
              <LinkMenu link={link} />
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
