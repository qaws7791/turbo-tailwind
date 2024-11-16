import {
  updateListPublicState,
  updateListPublicStateSchema,
} from "@/lib/supabase/server/lists/lists.mutations";
import { HttpErrorResponse, HttpSuccessResponse } from "@/server/utils/http";
import { expirePath } from "next/cache";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ listId: string }>;
  }
) {
  const { listId } = await params;
  const json = await request.json();

  const input = updateListPublicStateSchema.safeParse(json);

  if (!input.success) {
    return new HttpErrorResponse("Invalid input", 400);
  }

  try {
    const res = await updateListPublicState(listId, input.data.type);
    const path = `/share/${listId}`;
    expirePath(path);
    return new HttpSuccessResponse(res);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new HttpErrorResponse(errorMessage, 500);
  }
}
