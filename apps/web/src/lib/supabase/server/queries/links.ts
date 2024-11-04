import { createClient } from "@/lib/supabase/server";

export const getPublicUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
};

export async function getLinks(
  listId: string,
  nextCursor: string | null = null
) {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Failed to fetch user");
  }

  let query = supabase
    .from("links")
    .select("*")
    .eq("list", listId)
    .order("created_at", { ascending: false })
    .limit(500);

  if (nextCursor) {
    query = query.lt("created_at", nextCursor);
  }

  const { data, error: selectError } = await query;

  if (selectError) {
    throw new Error("Failed to fetch links");
  }

  return data.map((link) => {
    return {
      ...link,
      favicon_url: link.favicon_url ? getPublicUrl(link.favicon_url) : null,
      preview_url: link.preview_url ? getPublicUrl(link.preview_url) : null,
    };
  });
}
