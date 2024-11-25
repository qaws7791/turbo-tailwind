import { createClient } from "@/lib/supabase/server";
import { generateSlug } from "@/lib/utils/generator";
import { z } from "zod";

export const uploadUserAvatar = async (file: File) => {
  // 1. check file type and size
  if (!file) {
    throw new Error("No file provided");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Invalid file type");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File too large");
  }

  const supabase = await createClient();

  // 2. Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Error getting user");
  }

  const newId = generateSlug();

  const uploadPath = `public/${newId}`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(uploadPath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error("Error uploading file");
  }

  return data;
};

export const updateUserProfileSchema = z.object({
  avatar_url: z.string().optional(),
  username: z.string().min(1).max(20).optional(),
});

export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;

export const updateUserProfile = async (data: UpdateUserProfileInput) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Error getting user");
  }

  const { data: updatedUser, error: updateError } = await supabase
    .from("users")
    .update(data)
    .eq("id", user.id);

  if (updateError) {
    throw new Error("Error updating user");
  }

  return true;
};
