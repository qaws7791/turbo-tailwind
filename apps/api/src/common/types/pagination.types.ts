export interface PaginationRes<T> {
  data: T[];
  meta: {
    nextCursor: string | null;
    hasNextPage: boolean;
  };
}
