"use client";
import { deleteList } from "@/client/api/apis/list.api";
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
import { toast } from "@repo/ui/toaster";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ListDeleteButton({ id }: { id: string }): JSX.Element {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deleteList({ id });
      toast.success("List deleted");
      router.push("/app");
    } catch (error) {
      toast.error("Error deleting list");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="리스트 삭제" size="sm" variant="outline">
          <Trash2 className="size-4" />
          삭제
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>리스트 삭제</DialogTitle>
          <DialogDescription>
            이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">취소</Button>
          </DialogClose>

          <Button onClick={handleDelete} type="button">
            삭제하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
