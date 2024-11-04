import { createClient } from "@/lib/supabase/server";
import type { TablesUpdate } from "@/lib/supabase/supabase";
import { z } from "zod";

export async function createEmptyList() {
  const supabase = createClient();

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

export const updateListSchema = z.object({
  title: z.string().max(1000),
  description: z.string().max(5000),
  is_public: z.boolean(),
});

export async function updateList(id: string, data: TablesUpdate<"lists">) {
  const supabase = createClient();

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
  const supabase = createClient();

  // 1. Delete the list
  const { error } = await supabase.from("lists").delete().eq("id", id);

  if (error) {
    throw new Error("Error deleting list");
  }

  return { id };
}
