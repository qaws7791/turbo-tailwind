import { createClient } from "@/lib/supabase/server";
import { generateSlug } from "@/lib/utils/generator";
import { z } from "zod";

export const updateListSchema = z.object({
  title: z.string().max(255),
  description: z.string().max(1000),
});

export type UpdateListInput = z.infer<typeof updateListSchema>;

export async function createEmptyList() {
  const supabase = await createClient();

  // 1. Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: "Error getting user",
    };
  }

  // 2. Count the number of lists the user has
  const { count, error: countError } = await supabase
    .from("lists")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user", user.id);

  if (countError || count === null) {
    return {
      error: "Error counting lists",
    };
  }

  // 3. If the user has more than 100 lists, throw an error
  if (count > 100) {
    return {
      error: "You have too many lists",
    };
  }

  // 4. Create a new list
  const { data: list, error: listError } = await supabase
    .from("lists")
    .insert({
      title: "New List",
      user: user.id,
    })
    .select();

  if (listError || list.length === 0) {
    return {
      error: "Error creating list",
    };
  }

  return list[0];
}

export async function updateList(id: string, data: UpdateListInput) {
  const supabase = await createClient();

  // 1. Update the list
  const { data: list, error: listError } = await supabase
    .from("lists")
    .update(data)
    .eq("id", id)
    .select();

  if (listError || list.length === 0) {
    throw new Error("Error updating list");
  }

  return list[0];
}

export async function deleteList(id: string) {
  const supabase = await createClient();

  // 1. Delete the list
  const { error } = await supabase.from("lists").delete().eq("id", id);

  if (error) {
    throw new Error("Error deleting list");
  }

  return { id };
}

export const batchReorderListSchema = z.object({
  links: z
    .array(z.object({ id: z.string() }))
    .min(1)
    .max(500),
});

export type BatchReorderListInput = z.infer<typeof batchReorderListSchema>;

export async function batchReorderList(
  listId: string,
  { links }: BatchReorderListInput
) {
  const supabase = await createClient();

  // 1. Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not found");
  }

  // 2. Get the list
  const { data: list, error: listError } = await supabase
    .from("lists")
    .select("id, user")
    .eq("id", listId)
    .limit(1)
    .single();

  if (listError || !list) {
    throw new Error("List not found");
  }

  if (list.user !== user.id) {
    throw new Error("List not found");
  }

  // 3. Get all the links in the list
  const { data: currentLinks, error: currentLinksError } = await supabase
    .from("links")
    .select("id, position, list, url")
    .eq("list", listId);

  if (currentLinksError) {
    throw new Error("Error getting links");
  }

  // 4. Update the positions of the links
  const updates = links.map((link, index) => {
    const currentLink = currentLinks.find((l) => l.id === link.id);

    if (!currentLink) {
      throw new Error("Link not found");
    }

    return {
      ...currentLink,
      position: index + 1,
    };
  });

  const { error: updateError } = await supabase.from("links").upsert(updates);

  if (updateError) {
    throw new Error("Error updating links");
  }

  return { id: listId };
}

export const updateListPublicStateSchema = z.object({
  type: z.enum(["public", "private"]),
});

export type UpdateListPublicStateInput = z.infer<
  typeof updateListPublicStateSchema
>;

export async function updateListPublicState(
  id: string,
  type: "public" | "private"
) {
  const supabase = await createClient();

  // 1. get the list
  const { data: existList, error: getListError } = await supabase
    .from("lists")
    .select()
    .eq("id", id)
    .limit(1)
    .single();

  if (getListError || !existList) {
    throw new Error("Error getting list");
  }

  // 2. If the list is already public, return it
  if (type === "public" && existList.public_slug) {
    return existList;
  }

  if (type === "private" && !existList.public_slug) {
    return existList;
  }

  const public_slug = type === "public" ? generateSlug() : null;
  // 3. Update the list to public
  const { data: list, error: listError } = await supabase
    .from("lists")
    .update({ public_slug })
    .eq("id", id)
    .select();

  if (listError || list.length === 0) {
    throw new Error("Error updating list");
  }

  return list[0];
}
