import { http, HttpResponse } from "msw";
import { Category } from "../api/models/category";
import { CATEGORIES } from "./data/categories";
import { PRODUCTS } from "./data/products";

const API_URL = "http://localhost:4000/api";

export const handlers = [
  http.get(`${API_URL}/products`, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 10;

    const products = PRODUCTS.slice((page - 1) * limit, page * limit);

    return HttpResponse.json({
      data: {
        items: products,
        itemsPerPage: limit,
        currentItemCount: products.length,
        totalItems: PRODUCTS.length,
        currentPage: page,
        totalPages: Math.ceil(PRODUCTS.length / limit),
        nextPage: page < Math.ceil(PRODUCTS.length / limit) ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      },
    });
  }),

  http.get(`${API_URL}/categories`, () => {
    const categories: Category[] = CATEGORIES;

    return HttpResponse.json({
      data: {
        items: categories,
      },
    });
  }),
];
