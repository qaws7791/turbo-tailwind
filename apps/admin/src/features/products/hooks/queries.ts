import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../api/apis/products.api";
import { PaginationParams } from "../../../api/models/api-request";

export const useFetchProducts = (requestParams: PaginationParams) => {
  return useSuspenseQuery({
    queryKey: ["products", requestParams],
    queryFn: () => fetchProducts(requestParams),
  });
};
