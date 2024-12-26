import httpClient from "../http-client";
import { ResourcesResponse } from "../models/api-response";
import { Category } from "../models/category";

export async function fetchCategories() {
  const { data } = await httpClient
    .get("categories")
    .json<ResourcesResponse<Category>>();
  return data;
}
