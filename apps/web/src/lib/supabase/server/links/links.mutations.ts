import { createClient } from "@/lib/supabase/server";
import { downloadImage, scrapLinkInfo } from "@/server/scrap";
import { nanoid } from "nanoid";
import { z } from "zod";
import { getPublicUrl } from "@/lib/supabase/server/links/links.queries";

export const createLinkSchema = z.object({
  url: z.string().url(),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

export const updateLinkSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  memo: z.string().max(1000).optional(),
});

export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

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

    const maxPositionOfList = await supabase
      .from("links")
      .select("position")
      .eq("list", listId)
      .order("position", { ascending: false })
      .limit(1);

    const newPosition =
      maxPositionOfList.data && maxPositionOfList.data[0]
        ? maxPositionOfList.data[0].position + 1
        : 1;

    const { data, error: insertLinkError } = await supabase
      .from("links")
      .insert([
        {
          url: url.href,
          title: result.title,
          preview_url: ogImageUrl,
          favicon_url: faviconUrl,
          list: listId,
          position: newPosition,
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

export async function updateLink(id: string, data: UpdateLinkInput) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("User not found");
  }

  // link가 속한 list가 user의 list인지 확인
  const { data: link, error: linkError } = await supabase
    .from("links")
    .select("id, list:lists (user)")
    .eq("id", id)
    .limit(1)
    .single();

  if (linkError || !link.list || link.list.user !== user.id) {
    throw new Error("Link not found");
  }

  const { data: updatedData, error: updateError } = await supabase
    .from("links")
    .update(data)
    .eq("id", id)
    .select();

  if (updateError || !updatedData[0]) {
    throw new Error("Failed to update link");
  }

  return {
    ...updatedData[0],
    favicon_url: updatedData[0].favicon_url
      ? getPublicUrl(updatedData[0].favicon_url)
      : null,
    preview_url: updatedData[0].preview_url
      ? getPublicUrl(updatedData[0].preview_url)
      : null,
  };
}

export async function deleteLink(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("User not found");
  }

  // link가 속한 list가 user의 list인지 확인
  const { data: link, error: linkError } = await supabase
    .from("links")
    .select("id, list:lists (user)")
    .eq("id", id)
    .limit(1)
    .single();

  if (linkError || !link.list || link.list.user !== user.id) {
    throw new Error("Link not found");
  }

  const { error: deleteError } = await supabase
    .from("links")
    .delete()
    .eq("id", id);

  if (deleteError) {
    throw new Error("Failed to delete link");
  }

  return {
    id: link.id,
  };
}
