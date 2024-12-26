import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "@repo/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/dialog";
import { IconButton } from "@repo/ui/icon-button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { ScrollArea } from "@repo/ui/scroll-area";
import { cn } from "@repo/ui/utils";
import { useState } from "react";
import { useFetchCategories } from "../../../features/categories/hooks/queries";

export default function CategoriesForm() {
  const { data } = useFetchCategories();
  const [selectedCategoryID, setSelectedCategoryID] = useState<number | null>(
    null
  );

  const selectedCategory = data.items.find(
    (category) => category.id === selectedCategoryID
  );
  return (
    <div>
      <div className="flex mt-4">
        {/* 1차 카테고리 리스트 */}
        <div>
          <h2 className="text-lg font-semibold">1차 카테고리</h2>
          <ScrollArea className="h-[540px] w-64 rounded-l-md border border-gray-300">
            <ul className="flex flex-col">
              {data.items.map((category) => (
                <li
                  key={category.id}
                  onClick={() => {
                    setSelectedCategoryID(category.id);
                  }}
                  className={cn(
                    `cursor-pointer px-3 py-2 flex items-center justify-between hover:bg-gray-100 text-lg`,
                    selectedCategoryID === category.id && "bg-gray-200"
                  )}
                >
                  <div>
                    <span>{category.name}</span>
                  </div>
                  <div>
                    <IconButton
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <EllipsisVerticalIcon className="size-5" />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
            <Dialog>
              <DialogTrigger className="px-3 py-2 text-lg flex items-center gap-2 hover:bg-gray-100 w-full">
                <PlusIcon className="size-5" />
                카테고리 추가
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>카테고리 생성</DialogTitle>
                  <DialogDescription className="sr-only">
                    카테고리를 생성합니다.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4 py-4 flex-col">
                  <div className="grid grid-cols-5 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      카테고리 이름
                    </Label>
                    <Input id="name" className="col-span-4" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">취소</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button">카테고리 추가</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ScrollArea>
        </div>
        <div>
          {/* 2차 카테고리 리스트 */}
          <h2 className="text-lg font-semibold">2차 카테고리</h2>
          <ScrollArea className="h-[540px] w-64 rounded-r-md border-y border-r border-gray-300">
            <ul className="flex flex-col gap-2">
              {selectedCategory?.childrenCategories.map((category) => (
                <li
                  key={category.id}
                  className={cn(
                    `cursor-pointer px-3 py-2 rounded-md flex items-center justify-between text-lg`
                  )}
                >
                  <div>
                    <span>{category.name}</span>
                  </div>
                  <div>
                    <IconButton variant="ghost" size="sm">
                      <EllipsisVerticalIcon className="size-5" />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
            {selectedCategory && (
              <Dialog>
                <DialogTrigger className="px-3 py-2 text-lg flex items-center gap-2 hover:bg-gray-100 w-full">
                  <PlusIcon className="size-5" />
                  2차 카테고리 추가
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>
                      "{selectedCategory.name}" 카테고리에 2차 카테고리 추가
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      2차 카테고리를 추가합니다.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-4 py-4 flex-col">
                    <div className="grid grid-cols-5 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        2차 카테고리 이름
                      </Label>
                      <Input id="name" className="col-span-4" />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost">취소</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="button">카테고리 추가</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
