import type { Link } from "@/client/api/models";

export interface CreateLinkRequest {
  url: string;
  listId: string;
}

export interface DeleteLinkRequest {
  id: string;
}

export interface UpdateLinkRequest {
  id: string;
  title: string;
  memo: string;
}

export interface FetchLinksRequest {
  listId: string;
}

export async function createLink(requestParameters: CreateLinkRequest) {
  const res = await fetch(`/api/lists/${requestParameters.listId}/links`, {
    method: "POST",
    body: JSON.stringify({
      url: requestParameters.url,
      listId: requestParameters.listId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create link");
  }
  return res.json() as Promise<Link>;
}

export async function deleteLink(requestParameters: DeleteLinkRequest) {
  const res = await fetch(`/api/links/${requestParameters.id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete link");
  }

  return {
    id: requestParameters.id,
  };
}

export async function updateLink(requestParameters: UpdateLinkRequest) {
  const res = await fetch(`/api/links/${requestParameters.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: requestParameters.title,
      memo: requestParameters.memo,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update link");
  }

  return res.json() as Promise<Link>;
}

export async function fetchLinks(requestParameters: FetchLinksRequest) {
  const res = await fetch(`/api/lists/${requestParameters.listId}/links`);

  if (!res.ok) {
    throw new Error("Failed to fetch links");
  }

  return res.json() as Promise<Link[]>;
}
