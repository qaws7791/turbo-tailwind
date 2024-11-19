"use client";
import { reorderList } from "@/api/apis/list.api";
import LinkMenu from "@/feature/links/components/link-menu";
import linkQueries from "@/feature/links/hooks/queries";
import { Button } from "@repo/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ImageIcon, LinkIcon, SaveIcon } from "lucide-react";
import { Reorder } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LinksReorderViewProps {
  listId: string;
}

export default function LinksReorderView({
  listId,
}: LinksReorderViewProps): JSX.Element {
  const router = useRouter();
  const linkQuery = useSuspenseQuery(linkQueries.list(listId));
  const [items, setItems] = useState(linkQuery.data);

  const handleSave = async () => {
    await reorderList({
      id: listId,
      links: items.map((link) => ({ id: link.id })),
    });
    router.push(`/app/lists/${listId}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-4 p-4">
        <h2 className="text-xl font-medium">링크 재정렬</h2>
        <Button onClick={handleSave}>
          <SaveIcon className="size-4" />
          저장하기
        </Button>
      </div>
      <Reorder.Group
        values={items}
        onReorder={setItems}
        className="flex gap-3 flex-col"
      >
        {items.map((link) => (
          <Reorder.Item className="mx-4 bg-white/50" key={link.id} value={link}>
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
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
