import {
  updateUserProfile,
  updateUserProfileSchema,
} from "@/lib/supabase/server/uesrs/user.mutations";
import { HttpErrorResponse } from "@/server/utils/http";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  const input = updateUserProfileSchema.safeParse(await request.json());

  if (!input.success) {
    return new HttpErrorResponse("Invalid body", 400);
  }

  try {
    await updateUserProfile(input.data);
    return new Response(null, { status: 204 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error updating profile";
    return new HttpErrorResponse(message, 500);
  }
}
