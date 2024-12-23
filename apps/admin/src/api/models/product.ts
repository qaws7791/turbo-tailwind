export type Product = {
  id: number;
  image: string;
  name: string;
  brand: string;
  modelName: string;
  status: string;
  category: {
    id: number;
    name: string;
  };
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
};
