import { Category } from "../../api/models/category";

export const CATEGORIES: Category[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: index + 1,
    name: `카테고리 ${index + 1}`,
    childrenCategories: Array.from({ length: 5 }, (_, childIndex) => ({
      id: index * 10 + childIndex + 1,
      name: `카테고리 ${index + 1}-${childIndex + 1}`,
      childrenCategories: [],
    })),
  })
);
