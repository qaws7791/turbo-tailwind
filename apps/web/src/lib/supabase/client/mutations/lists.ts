import { createClient } from "@/lib/supabase/client";
import type { TablesUpdate } from "@/lib/supabase/supabase";

export async function createEmptyList() {
  const supabase = createClient();

  // 1. Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not found");
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
    throw new Error("Error counting lists");
  }

  // 3. If the user has more than 100 lists, throw an error
  if (count > 100) {
    throw new Error("You have too many lists");
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
    throw new Error("Error creating list");
  }

  return list[0];
}

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
