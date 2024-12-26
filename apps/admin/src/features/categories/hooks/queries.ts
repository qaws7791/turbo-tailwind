import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../api/apis/categories.api";

export const useFetchCategories = () => {
  return useSuspenseQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });
};
