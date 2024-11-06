import AddLinkButton from "@/components/links/add-link-button";
import LinksView from "@/components/links/links-view";
import ListDeleteButton from "@/components/lists/list-delete-button";
import ListEditButton from "@/components/lists/list-edit-button";
import { getLinks } from "@/lib/supabase/server/links/links.queries";
import { getList } from "@/lib/supabase/server/lists/lists.queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Lock, UsersRound } from "lucide-react";
import { Suspense } from "react";

interface ListDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ListDetailPage({ params }: ListDetailPageProps) {
  const id = (await params).id;

  const list = await getList(id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["lists", id, "links"],
    queryFn: () => {
      return getLinks(id);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <div className="p-4">
          <h1 className="text-3xl font-medium">{list.title}</h1>
          <div>
            <p>{list.description}</p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {list.is_public ? (
              <UsersRound className="size-4" />
            ) : (
              <Lock className="size-4" />
            )}
            {list.is_public ? "공개" : "비공개"}
          </div>
          <div className="mt-8 flex gap-2 justify-end">
            <ListEditButton id={id} />
            <ListDeleteButton id={id} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 p-4">
          <h2 className="text-xl font-medium">Links</h2>
          <AddLinkButton listId={id} />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <LinksView listId={id} />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
