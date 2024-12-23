export type ResourcesResponse<T> = {
  data: {
    items: T[];
    itemsPerPage: number;
    currentItemCount: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    nextPage: number | null;
    previousPage: number | null;
  };
};

export type ResourceResponse<T> = {
  data: T;
};

export type ErrorResponse = {
  error: string;
};
