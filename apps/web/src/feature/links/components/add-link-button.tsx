"use client";
import { useCreateLinkMutation } from "@/feature/links/hooks/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/dialog";
import { ErrorMessage } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { toast } from "@repo/ui/toaster";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddLinkButtonProps {
  listId: string;
}

const addLinkSchema = z.object({
  url: z.string().url(),
});

type AddLinkForm = z.infer<typeof addLinkSchema>;

export default function AddLinkButton({ listId }: AddLinkButtonProps) {
  const createLink = useCreateLinkMutation();
  const [open, setOpen] = useState(false);
  const { reset, register, formState, handleSubmit } = useForm<AddLinkForm>({
    resolver: zodResolver(addLinkSchema),
    defaultValues: {
      url: "",
    },
  });
  const onSubmit = handleSubmit(async (data: AddLinkForm) => {
    createLink.mutate(
      { listId, url: data.url },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("성공적으로 링크를 추가했습니다.");
          reset();
        },
        onError: () => {
          toast.error(
            "링크를 추가하는 중에 문제가 발생했습니다. 다시 시도해주세요."
          );
        },
      }
    );
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="size-4" />
          링크 추가
        </Button>
      </DialogTrigger>
      <DialogContent asChild>
        <form onSubmit={onSubmit}>
          <DialogTitle>링크 추가하기</DialogTitle>
          <DialogDescription className="sr-only">
            이 리스트에 추가할 링크 URL을 입력해주세요.
          </DialogDescription>
          <Label htmlFor="url">링크 URL</Label>
          <Input
            id="url"
            placeholder="https://example.com"
            type="text"
            {...register("url")}
          />
          <ErrorMessage>{formState.errors.url?.message}</ErrorMessage>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">닫기</Button>
            </DialogClose>
            <Button
              disabled={formState.isSubmitting || !formState.isValid}
              type="submit"
            >
              {createLink.isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : null}
              {createLink.isPending ? "추가 중..." : "링크 추가"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
