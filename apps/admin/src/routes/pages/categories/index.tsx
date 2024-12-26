import { Suspense } from "react";
import CategoriesForm from "./categories-form";

export default function CategoriesPage() {
  return (
    <div>
      <div>
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">카테고리 관리</h1>
          <p className="sr-only">
            카테고리 목록을 조회하고 카테고리를 추가, 수정, 삭제할 수 있습니다.
          </p>
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <CategoriesForm />
        </Suspense>
      </div>
    </div>
  );
}
