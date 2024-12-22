export const PRODUCTS = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  image: "https://placehold.co/100",
  name: "상품 이름",
  brand: "상품 브랜드",
  modelName: "상품 모델명",
  status: "판매중",
  category: {
    id: 1,
    name: "카테고리 이름",
  },
  price: 10000,
  stock: 100,
  createdAt: "2024-01-01T00:00:00",
  updatedAt: "2024-01-01T00:00:00",
  deletedAt: null,
}));
