import ListCreateButton from "@/components/lists/list-create-button";
import ListsView from "@/components/lists/lists-view";
import { getLists } from "@/lib/supabase/server/lists/lists.queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

export default async function AppMainPage(): Promise<JSX.Element> {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    initialPageParam: null as string | null,
    queryKey: ["lists"],
    queryFn: ({ pageParam = null }) => {
      return getLists(pageParam);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-4 max-w-screen-xl mx-auto">
        <section className="py-8">
          <h1 className="text-2xl font-medium text-center">
            링크를 저장하고 공유하세요.
          </h1>
          <p className="text-lg text-blue-600 text-center">
            내가 저장한 링크를 다른 사람들과 공유하세요.
          </p>
        </section>
        <div className="flex justify-between items-center my-4">
          <h2 className="text-xl font-medium">내 리스트</h2>
          <ListCreateButton />
        </div>
        <div>
          <Suspense fallback={<div />}>
            <ListsView />
          </Suspense>
        </div>
      </div>
    </HydrationBoundary>
  );
}
