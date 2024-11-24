import { createClient } from "@/lib/supabase/server";
import { generateSlug } from "@/lib/utils/generator";

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
