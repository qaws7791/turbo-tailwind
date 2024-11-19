import AddLinkButton from "@/components/links/add-link-button";
import LinksView from "@/components/links/links-view";
import ListDeleteButton from "@/components/lists/list-delete-button";
import ListEditButton from "@/components/lists/list-edit-button";
import ListShareDialog from "@/components/lists/list-share-dialog";
import linkQueries from "@/feature/links/hooks/queries";
import listQueries from "@/feature/lists/hooks/queries";
import { getLinks } from "@/lib/supabase/server/links/links.queries";
import { getList } from "@/lib/supabase/server/lists/lists.queries";
import { Button } from "@repo/ui/button";
import { Dialog, DialogTrigger } from "@repo/ui/dialog";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Lock, Share2Icon, UsersRound } from "lucide-react";
import { Suspense } from "react";

interface ListDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ListDetailPage({ params }: ListDetailPageProps) {
  const id = (await params).id;

  const list = await getList(id);

  const queryClient = new QueryClient();

  const queries = [
    queryClient.prefetchQuery({
      queryKey: [...listQueries.details(), id],
      queryFn: () => getList(id),
    }),
    queryClient.prefetchQuery({
      queryKey: [...linkQueries.lists(), id],
      queryFn: () => getLinks(id),
    }),
  ];

  await Promise.all(queries);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <div className="p-4">
          <h1 className="text-3xl font-medium">{list.title}</h1>
          <div>
            <p>{list.description}</p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {list.public_slug ? (
              <UsersRound className="size-4" />
            ) : (
              <Lock className="size-4" />
            )}
            {list.public_slug ? "공개" : "비공개"}
          </div>
          <div className="mt-8 flex gap-2 justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Share2Icon className="size-4" />
                  공유
                </Button>
              </DialogTrigger>
              <Suspense fallback={<div>Loading...</div>}>
                <ListShareDialog listId={id} />
              </Suspense>
            </Dialog>
            <ListEditButton id={id} />
            <ListDeleteButton id={id} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 p-4">
          <h2 className="text-xl font-medium">링크 목록</h2>
          <AddLinkButton listId={id} />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <LinksView listId={id} />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
