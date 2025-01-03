"use client";
import type { Link } from "@/api/models";
import { useUpdateLinkMutation } from "@/feature/links/hooks/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/dialog";
import { ErrorMessage } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { toast } from "@repo/ui/toaster";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const linkEditSchema = z.object({
  title: z.string().min(1).max(255),
  memo: z.string().max(500),
});

type LinkEditData = z.infer<typeof linkEditSchema>;

interface LinkEditDialogProps {
  link: Pick<Link, "id" | "title" | "memo" | "list">;
  onClose?: () => void;
}

export default function LinkEditDialog({ link, onClose }: LinkEditDialogProps) {
  const updateLink = useUpdateLinkMutation();
  const { reset, register, formState, handleSubmit } = useForm<LinkEditData>({
    resolver: zodResolver(linkEditSchema),
    defaultValues: {
      title: link.title,
      memo: link.memo,
    },
  });

  const onSubmit = handleSubmit((data: LinkEditData) => {
    updateLink.mutate(
      { id: link.id, title: data.title, memo: data.memo },
      {
        onSuccess: () => {
          toast.success("링크를 수정했습니다.");
          onClose?.();
        },
        onError: () => {
          toast.error("링크를 수정하는 중에 오류가 발생했습니다.");
        },
      }
    );
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <DialogContent asChild className="sm:max-w-[500px]">
      <form onSubmit={onSubmit}>
        <DialogHeader>
          <DialogTitle>링크 수정</DialogTitle>
          <DialogDescription className="sr-only">
            링크의 이름과 설명을 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 py-4 flex-col">
          <div className="flex flex-col gap-4">
            <Label htmlFor="title">이름</Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              className="col-span-4"
            />
            <ErrorMessage>{formState.errors.title?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="memo">메모</Label>
            <Input
              id="memo"
              {...register("memo", { required: true })}
              className="col-span-4"
            />
            <ErrorMessage>{formState.errors.memo?.message}</ErrorMessage>
          </div>
        </div>
        <ErrorMessage>{formState.errors.root?.message}</ErrorMessage>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">취소</Button>
          </DialogClose>
          <Button type="submit">저장하기</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
