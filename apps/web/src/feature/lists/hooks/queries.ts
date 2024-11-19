import { fetchList, fetchLists } from "@/api/apis/list.api";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

const listQueries = {
  all: () => ["lists"],
  lists: () => [...listQueries.all(), "list"],
  list: () =>
    infiniteQueryOptions({
      queryKey: ["lists"],
      queryFn: ({ pageParam = undefined }) => {
        return fetchLists({ cursor: pageParam });
      },
      getNextPageParam: (lastPage) => {
        return lastPage.length === 20 ? lastPage[lastPage.length - 1].id : null;
      },
      initialPageParam: null as string | null,
    }),
  details: () => [...listQueries.all(), "details"],
  detail: (listId: string) =>
    queryOptions({
      queryKey: [...listQueries.details(), listId],
      queryFn: () => fetchList({ id: listId }),
    }),
};

export default listQueries;
