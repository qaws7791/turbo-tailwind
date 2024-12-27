import { Button } from "@repo/ui/button";
import { Suspense } from "react";
import { Link } from "react-router";
import ProductsTable from "./products-table";

export default function ProductsPage() {
  return (
    <div>
      <div>
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">상품 관리</h1>
          <p className="sr-only">
            상품 목록을 조회하고 상품을 추가, 수정, 삭제할 수 있습니다.
          </p>
          <Button asChild>
            <Link to="/dashboard/products/new" className="btn btn-primary">
              상품 추가
            </Link>
          </Button>
        </header>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsTable />
      </Suspense>
    </div>
  );
}
