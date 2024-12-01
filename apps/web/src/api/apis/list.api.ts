import httpClient from "@/api/http-client";
import type { Link, List } from "@/api/models";

export interface FetchListsRequest {
  cursor?: string | null;
}

export type FetchListsResponse = (List & {
  links: Link[];
  link_count: number;
})[];

export interface UpdateListsRequest {
  id: string;
  title: string;
  description: string;
}

export interface FetchListRequest {
  id: string;
}

export interface DeleteListRequest {
  id: string;
}

export interface UpdateListShareStateRequest {
  id: string;
  type: "public" | "private";
}

export function fetchLists({ cursor }: FetchListsRequest) {
  const searchParams = new URLSearchParams();
  if (cursor) {
    searchParams.set("cursor", cursor);
  }

  return httpClient
    .get<FetchListsResponse>(`lists${searchParams.toString()}`)
    .json();
}

export function updateList({ id, ...data }: UpdateListsRequest) {
  return httpClient.put<void>(`lists/${id}`, {
    json: data,
  });
}

export function fetchList({ id }: FetchListRequest) {
  return httpClient.get<List>(`lists/${id}`).json();
}

export function deleteList({ id }: DeleteListRequest) {
  return httpClient.delete<void>(`lists/${id}`);
}

export function createEmptyList() {
  return httpClient
    .post<List>(`lists`, {
      json: {
        type: "empty",
      },
    })
    .json();
}

export function updateListShareState({
  id,
  ...data
}: UpdateListShareStateRequest) {
  return httpClient
    .post<List>(`lists/${id}/share`, {
      json: data,
    })
    .json();
}

export function reorderList({
  id,
  links,
}: {
  id: string;
  links: { id: string }[];
}) {
  return httpClient.post<void>(`lists/${id}/reorder`, {
    json: {
      links,
    },
  });
}
