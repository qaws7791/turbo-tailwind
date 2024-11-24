import { clientEnv } from "@/lib/env";
import { uploadUserAvatar } from "@/lib/supabase/server/uesrs/user.mutations";
import { HttpErrorResponse, HttpSuccessResponse } from "@/server/utils/http";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return new Response("No file provided", { status: 400 });
  }

  try {
    const result = await uploadUserAvatar(file);

    return new HttpSuccessResponse({
      path: `${clientEnv.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${result.fullPath}`,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to upload avatar";
    return new HttpErrorResponse(message, 500);
  }
}
