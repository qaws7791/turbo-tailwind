import httpClient from "../http-client";
import { PaginationParams } from "../models/api-request";
import { ResourcesResponse } from "../models/api-response";
import { Product } from "../models/product";

export async function fetchProducts(requestParams: PaginationParams) {
  const { data } = await httpClient
    .get("products", {
      searchParams: requestParams,
    })
    .json<ResourcesResponse<Product>>();
  return data;
}
