import {
  deleteList,
  updateList,
  updateListSchema,
} from "@/lib/supabase/server/lists/lists.mutations";
import { getList } from "@/lib/supabase/server/lists/lists.queries";
import { HttpErrorResponse, HttpSuccessResponse } from "@/server/utils/http";
import { expirePath } from "next/cache";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ listId: string }>;
  }
) {
  const { listId } = await params;

  try {
    const list = await getList(listId);

    return new HttpSuccessResponse(list);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error fetching list";
    return new HttpErrorResponse(message, 500);
  }
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ listId: string }>;
  }
) {
  const { listId } = await params;

  const input = updateListSchema.safeParse(await request.json());

  if (!input.success) {
    return new HttpErrorResponse("Invalid body", 400);
  }

  try {
    const updatedList = await updateList(listId, input.data);
    const path = `/share/${listId}`;
    expirePath(path);
    return new HttpSuccessResponse(updatedList);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error updating list";
    return new HttpErrorResponse(message, 500);
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ listId: string }>;
  }
) {
  const { listId } = await params;

  try {
    await deleteList(listId);

    return new HttpSuccessResponse({ id: listId });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error deleting list";
    return new HttpErrorResponse(message, 500);
  }
}
