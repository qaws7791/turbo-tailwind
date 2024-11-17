import httpClient from "@/api/http-client";
import type { Link } from "@/api/models";

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

export async function createLink({ listId, url }: CreateLinkRequest) {
  return httpClient
    .post<Link>(`lists/${listId}/links`, {
      json: {
        url,
      },
    })
    .json();
}

export async function deleteLink({ id }: DeleteLinkRequest) {
  return httpClient
    .delete<{
      id: string;
    }>(`links/${id}`)
    .json();
}

export async function updateLink({ id, title, memo }: UpdateLinkRequest) {
  return httpClient
    .put<Link>(`links/${id}`, {
      json: {
        title,
        memo,
      },
    })
    .json();
}

export async function fetchLinks({ listId }: FetchLinksRequest) {
  return httpClient.get<Link[]>(`lists/${listId}/links`).json();
}
