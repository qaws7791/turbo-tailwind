import AddLinkButton from "@/components/links/add-link-button";
import LinksReorderView from "@/components/links/links-reorder-view";
import { getLinks } from "@/lib/supabase/server/links/links.queries";
import { getList } from "@/lib/supabase/server/lists/lists.queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

interface ListReorderPageProps {
  params: Promise<{ id: string }>;
}

export default async function ListReorderPage({
  params,
}: ListReorderPageProps) {
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
        </div>

        <div className="flex items-center justify-between mt-4 p-4">
          <h2 className="text-xl font-medium">Links</h2>
          <AddLinkButton listId={id} />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <LinksReorderView listId={id} />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
