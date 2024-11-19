import AddLinkButton from "@/feature/links/components/add-link-button";
import LinksReorderView from "@/feature/links/components/links-reorder-view";
import linkQueries from "@/feature/links/hooks/queries";
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
    queryKey: [...linkQueries.lists(), id],
    queryFn: () => {
      return getLinks(id);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1 className="sr-only">{list.title} 링크 재정렬</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <LinksReorderView listId={id} />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
