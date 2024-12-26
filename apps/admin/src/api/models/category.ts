export type Category = {
  id: number;
  childrenCategories: Category[];
  name: string;
};
