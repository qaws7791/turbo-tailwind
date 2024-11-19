import { fetchLinks } from "@/api/apis/link.api";
import { queryOptions } from "@tanstack/react-query";

const linkQueries = {
  all: () => ["links"],
  lists: () => [...linkQueries.all(), "list"],
  list: (listId: string) =>
    queryOptions({
      queryKey: [...linkQueries.lists(), listId],
      queryFn: () => fetchLinks({ listId }),
    }),
};

export default linkQueries;
