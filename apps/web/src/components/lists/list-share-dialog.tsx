"use client";
import { fetchList, updateListShareState } from "@/api/apis/list.api";
import { clientEnv } from "@/lib/env";
import { Button } from "@repo/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/dialog";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { Switch } from "@repo/ui/switch";
import { toast } from "@repo/ui/toaster";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

interface ListShareDialogProps {
  listId: string;
}

export default function ListShareDialog({ listId }: ListShareDialogProps) {
  const queryClient = useQueryClient();
  const updateListState = useMutation({
    mutationFn: updateListShareState,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lists", listId],
      });
      toast.success("리스트가 수정되었습니다.");
    },
  });
  const { data: list } = useSuspenseQuery({
    queryKey: ["lists", listId],
    queryFn: () => fetchList({ id: listId }),
  });

  const checked = list.public_slug === null ? false : true;

  const shareUrl = list.public_slug
    ? clientEnv.NEXT_PUBLIC_URL + "/share/" + list.public_slug
    : "";

  const handleShareUrlCopy = () => {
    if (!navigator.clipboard) {
      toast.error("클립보드가 지원되지 않는 브라우저입니다.");
      return;
    }
    navigator.clipboard.writeText(shareUrl);
    toast.success("공유 URL이 복사되었습니다.");
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>공유하기</DialogTitle>
        <DialogDescription className="sr-only">
          리스트를 공개하거나 비공개로 설정합니다.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-end gap-4">
        <div className="flex justify-between items-center w-full gap-4">
          <Label htmlFor="public">공개 여부</Label>
          <Switch
            checked={checked}
            id="public"
            onCheckedChange={(checked) => {
              updateListState.mutate({
                id: listId,
                type: checked ? "public" : "private",
              });
            }}
            disabled={updateListState.isPending}
          />
        </div>

        {shareUrl && (
          <div className="flex w-full items-center gap-4 relative">
            <Label className="sr-only">공유 URL</Label>

            <Input value={shareUrl} readOnly className="w-full" />
            <Button
              className="absolute right-0 top-0"
              onClick={handleShareUrlCopy}
              aria-label="공유 URL 복사"
            >
              복사
            </Button>
          </div>
        )}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button>확인</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
