import {
  batchReorderList,
  batchReorderListSchema,
} from "@/lib/supabase/server/lists/lists.mutations";
import { HttpErrorResponse, HttpSuccessResponse } from "@/server/utils/http";

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
  console.log(`listId: ${listId} json: ${JSON.stringify(json)}`);
  const input = batchReorderListSchema.safeParse(json);

  if (!input.success) {
    return new HttpErrorResponse("Invalid input", 400);
  }

  try {
    const res = await batchReorderList(listId, input.data);

    return new HttpSuccessResponse(res);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new HttpErrorResponse(errorMessage, 500);
  }
}
