import {
  deleteLink,
  updateLink,
  updateLinkSchema,
} from "@/lib/supabase/server/links/links.mutations";
import { getLink } from "@/lib/supabase/server/links/links.queries";
import { HttpErrorResponse, HttpSuccessResponse } from "@/server/utils/http";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ linkId: string }>;
  }
) {
  const { linkId } = await params;

  try {
    const link = await getLink(linkId);

    return new HttpSuccessResponse(link);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error fetching link";
    return new HttpErrorResponse(message, 500);
  }
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ linkId: string }>;
  }
) {
  const { linkId } = await params;

  const input = updateLinkSchema.safeParse(await request.json());

  if (!input.success) {
    return new HttpErrorResponse("Invalid body", 400);
  }

  try {
    const updatedLink = await updateLink(linkId, input.data);
    return new HttpSuccessResponse(updatedLink);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error updating link";
    return new HttpErrorResponse(message, 500);
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ linkId: string }>;
  }
) {
  const { linkId } = await params;

  try {
    await deleteLink(linkId);
    return new HttpSuccessResponse({
      id: linkId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error deleting link";
    return new HttpErrorResponse(message, 500);
  }
}
