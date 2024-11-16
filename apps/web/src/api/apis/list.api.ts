import type { Link, List } from "@/api/models";
import { clientEnv } from "@/lib/env";

export interface FetchListsRequest {
  cursor?: string | null;
}

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

export interface CreateListRequest {
  type: "empty";
}

export interface UpdateListShareStateRequest {
  id: string;
  type: "public" | "private";
}

const baseUrl = clientEnv.NEXT_PUBLIC_URL;

export async function fetchLists(requestParameters: FetchListsRequest) {
  const response = await fetch(
    `${baseUrl}/api/lists?${requestParameters.cursor ? `cursor=${requestParameters.cursor}` : ""}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch lists");
  }

  return response.json() as Promise<
    (List & {
      links: Link[];
      link_count: number;
    })[]
  >;
}

export async function updateList(requestParameters: UpdateListsRequest) {
  const response = await fetch(`${baseUrl}/api/lists/${requestParameters.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestParameters),
  });

  if (!response.ok) {
    throw new Error("Failed to update list");
  }

  return {
    id: requestParameters.id,
  };
}

export async function fetchList(requestParameters: FetchListRequest) {
  const response = await fetch(`${baseUrl}/api/lists/${requestParameters.id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch list");
  }

  return response.json() as Promise<List>;
}

export async function deleteList(requestParameters: DeleteListRequest) {
  const response = await fetch(`${baseUrl}/api/lists/${requestParameters.id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete list");
  }

  return {
    id: requestParameters.id,
  };
}

export async function createList(requestParameters: CreateListRequest) {
  const response = await fetch(`${baseUrl}/api/lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestParameters),
  });

  if (!response.ok) {
    throw new Error("Failed to create list");
  }

  return response.json() as Promise<List>;
}

export async function updateListShareState(
  requestParameters: UpdateListShareStateRequest
) {
  const { id, ...rest } = requestParameters;
  const response = await fetch(
    `${baseUrl}/api/lists/${id}/share`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update list public state");
  }

  return response.json() as Promise<List>;
}
