import { createClient } from "@/lib/supabase/server";
import { downloadImage, scrapLinkInfo } from "@/server/scrap";
import { nanoid } from "nanoid";
import { z } from "zod";

export const createLinkSchema = z.object({
  url: z.string().url(),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

export async function createLink(listId: string, input: CreateLinkInput) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      error: "User not found",
    };
  }

  const url = new URL(input.url);

  const result = await scrapLinkInfo(url.href);

  if (result.error) {
    return {
      error: result.error,
    };
  }

  const newId = nanoid();
  // save favicon to storage, save image to storage
  try {
    const ogImage = result.image ? await downloadImage(result.image) : null;
    const favicon = result.favicon ? await downloadImage(result.favicon) : null;
    let ogImageUrl = null;
    let faviconUrl = null;
    if (ogImage) {
      const ogImageUpload = await supabase.storage.from("links").upload(
        `${newId}/image`,
        await ogImage.image,
        ogImage.contentType
          ? {
              contentType: ogImage.contentType,
            }
          : {}
      );
      if (ogImageUpload.error) {
        return {
          error: "Failed to upload image",
        };
      }
      ogImageUrl = ogImageUpload.data.fullPath;
    }
    if (favicon) {
      const faviconUpload = await supabase.storage.from("links").upload(
        `${newId}/favicon`,
        await favicon.image,
        favicon.contentType
          ? {
              contentType: favicon.contentType,
            }
          : {}
      );
      if (faviconUpload.error) {
        return {
          error: "Failed to upload favicon",
        };
      }
      faviconUrl = faviconUpload.data.fullPath;
    }

    const { data, error: insertLinkError } = await supabase
      .from("links")
      .insert([
        {
          url: url.href,
          title: result.title,
          preview_url: ogImageUrl,
          favicon_url: faviconUrl,
          list: listId,
        },
      ])
      .select();

    if (insertLinkError) {
      return {
        error: "Failed to save link",
      };
    }

    return {
      data,
    };
  } catch (e) {
    return {
      error: "Failed to save link",
    };
  }
}
