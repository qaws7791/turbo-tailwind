"use client";
import { updateList } from "@/lib/supabase/client/mutations/lists";
import { getList } from "@/lib/supabase/client/queries/lists";
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
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const listEditSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
});
type ListEditData = z.infer<typeof listEditSchema>;

interface ListEditDialogProps {
  listId: string;
  onClose?: () => void;
}

export default function ListEditDialog({
  listId,
  onClose,
}: ListEditDialogProps) {
  const router = useRouter();
  const { reset, register, formState, handleSubmit } = useForm<ListEditData>({
    resolver: zodResolver(listEditSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = handleSubmit(async (data: ListEditData) => {
    try {
      await updateList(listId, data);
      toast.success("리스트를 수정했습니다.");
      onClose?.();
      router.refresh();
    } catch (error) {
      toast.error("리스트를 수정하는 중에 오류가 발생했습니다.");
    }
  });

  useEffect(() => {
    void getList(listId).then((list) => {
      reset({
        title: list.title,
        description: list.description,
      });
    });
  }, [listId, reset]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <DialogContent asChild className="sm:max-w-[500px]">
      <form onSubmit={onSubmit}>
        <DialogHeader>
          <DialogTitle>리스트 수정</DialogTitle>
          <DialogDescription className="sr-only">
            리스트의 이름과 설명을 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 py-4 flex-col">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label className="text-right" htmlFor="title">
              이름
            </Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              className="col-span-4"
            />
            <ErrorMessage>{formState.errors.title?.message}</ErrorMessage>
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              설명
            </Label>
            <Input
              id="description"
              {...register("description", { required: true })}
              className="col-span-4"
            />
            <ErrorMessage>{formState.errors.description?.message}</ErrorMessage>
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
