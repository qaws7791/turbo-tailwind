import { getPublicListWithLinks } from "@/lib/supabase/server/lists/lists.queries";
import { ImageIcon, LinkIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
interface PublicSharePageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 3600;
export const dynamic = "force-static";

export default async function PublicSharePage({
  params,
}: PublicSharePageProps) {
  const id = (await params).id;

  try {
    const list = await getPublicListWithLinks(id);
    if (!list.user) {
      throw new Error("User not found");
    }
    return (
      <div className="max-w-screen-md mx-auto">
        <div className="p-4">
          <h1 className="text-4xl font-semibold">{list.title}</h1>
          <p className="text-lg text-gray-600">{list.description}</p>
          <div className="flex items-center gap-2 mt-4">
            <img
              alt="Avatar"
              className="rounded-full w-8 h-8"
              src={list.user.avatar_url}
            />
            <span>{list.user.username}</span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold px-4 mt-8">링크</h2>
        <ul className="mt-4">
          {list.links.map((link) => (
            <li
              className="flex gap-3 py-4 mx-4 border-b border-gray-200 min-h-35"
              key={link.id}
            >
              <div className="flex-shrink-0">
                {link.preview_url ? (
                  <Image
                    alt=""
                    className="rounded-md aspect-square object-cover w-24 h-24"
                    height={200}
                    src={link.preview_url}
                    width={200}
                  />
                ) : (
                  <ImageIcon />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold line-clamp-2">
                  {link.title}
                </h3>
                <p className="line-clamp-1 text-gray-600">{link.memo}</p>
                <a
                  className="flex gap-1 items-center line-clamp-1 text-gray-500"
                  href={link.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <LinkIcon className="size-4" />
                  {new URL(link.url).hostname}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
