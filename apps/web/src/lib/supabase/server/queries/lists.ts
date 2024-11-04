import { createClient } from "@/lib/supabase/server";
import { getPublicUrl } from "@/lib/supabase/server/queries/links";

export async function getList(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  if (error) {
    throw new Error("Failed to fetch list");
  }

  return data;
}

export async function getLists(nextCursor: string | null = null) {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Failed to fetch user");
  }

  let query = supabase
    .from("lists")
    .select("*")
    .eq("user", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  if (nextCursor) {
    query = query.lt("created_at", nextCursor);
  }

  const { data, error: selectError } = await query;

  if (selectError) {
    throw new Error("Failed to fetch lists");
  }

  return data;
}

export async function getPublicListWithLinks(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("lists")
    .select(
      `
      id,
      created_at,
      updated_at,
      title,
      description,
      is_public,
      user: users (id,username,avatar_url),
      links: links (id, title, memo, url, favicon_url,preview_url)
    `
    )
    .eq("id", id)
    .eq("is_public", true)
    .limit(1)
    .single();

  if (error) {
    throw new Error("Failed to fetch list");
  }

  return {
    ...data,
    links: data.links.map((link) => ({
      ...link,
      favicon_url: link.favicon_url ? getPublicUrl(link.favicon_url) : null,
      preview_url: link.preview_url ? getPublicUrl(link.preview_url) : null,
    })),
  };
}
