"use client";
import { useDeleteLinkMutation } from "@/feature/links/hooks/mutations";
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

export default function LinkDeleteDialog({
  id,
  listId,
  onClose,
}: {
  id: string;
  listId: string;
  onClose?: () => void;
}): JSX.Element {
  const deleteLink = useDeleteLinkMutation();
  const handleDelete = () => {
    deleteLink.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success("링크가 삭제되었습니다.");
          onClose?.();
        },
        onError: () => {
          toast.error("링크 삭제 중 오류가 발생했습니다.");
        },
      }
    );
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
