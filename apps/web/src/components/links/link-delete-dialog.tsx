"use client";
import { Tables } from "@/lib/supabase/supabase";
import { Button } from "@repo/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/dialog";
import { toast } from "@repo/ui/toaster";
import { useQueryClient } from "@tanstack/react-query";

export default function LinkDeleteDialog({
  id,
  listId,
  onClose,
}: {
  id: string;
  listId: string;
  onClose?: () => void;
}): JSX.Element {
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    try {
      await fetch(`/api/links/${id}`, {
        method: "DELETE",
      });
      queryClient.setQueryData(
        ["lists", listId, "links"],
        (oldData: Tables<"links">[] | undefined) => {
          return oldData?.filter((link) => link.id !== id);
        }
      );
      onClose?.();
      toast.success("Link deleted");
    } catch (error) {
      toast.error("Error deleting link");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>링크 삭제</DialogTitle>
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
  );
}
