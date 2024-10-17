interface APIResponse<T> {
  success: boolean;
  error: {
    clientMessage: string;
    systemMessage: string;
  };
  data: T | null;
}

interface CursorBasedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    nextCursor: string | null;
  };
}
