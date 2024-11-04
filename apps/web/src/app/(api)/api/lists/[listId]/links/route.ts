import {
  createLink,
  createLinkSchema,
} from "@/lib/supabase/server/mutations/links";
import { getLinks } from "@/lib/supabase/server/queries/links";
import { HttpErrorResponse, HttpSuccessResponse } from "@/server/utils/http";

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
    const res = await getLinks(listId);

    return new HttpSuccessResponse(res);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new HttpErrorResponse(errorMessage, 500);
  }
}

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ listId: string }>;
  }
) {
  const { listId } = await params;
  const input = createLinkSchema.safeParse(await request.json());

  if (!input.success) {
    return new HttpErrorResponse("Invalid input", 400);
  }

  try {
    const res = await createLink(listId, input.data);
    if (res.error) {
      throw new Error(res.error);
    }

    return new HttpSuccessResponse(res);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new HttpErrorResponse(errorMessage, 500);
  }
}
