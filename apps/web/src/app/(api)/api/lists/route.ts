import { createEmptyList } from "@/lib/supabase/server/lists/lists.mutations";
import { getLists } from "@/lib/supabase/server/lists/lists.queries";
import { HttpErrorResponse, HttpSuccessResponse } from "@/server/utils/http";
import type { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const nextCursor = request.nextUrl.searchParams.get("cursor");

  try {
    const lists = await getLists(nextCursor);
    return new HttpSuccessResponse(lists);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch lists";
    return new HttpErrorResponse(message, 500);
  }
}

const bodySchema = z.object({
  type: z.enum(["empty"]),
});

export async function POST(request: Request) {
  const body = bodySchema.safeParse(await request.json());

  if (!body.success) {
    return new HttpErrorResponse("Invalid body", 400);
  }

  const newList = await createEmptyList();

  if ("error" in newList) {
    return new HttpErrorResponse(newList.error, 500);
  }

  return new HttpSuccessResponse(newList);
}
