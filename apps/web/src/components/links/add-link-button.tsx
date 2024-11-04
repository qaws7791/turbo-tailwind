"use client";
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
import { PlusIcon } from "lucide-react";
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
  const { reset, register, formState, handleSubmit } = useForm<AddLinkForm>({
    resolver: zodResolver(addLinkSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = handleSubmit(async (data: AddLinkForm) => {
    try {
      const res = await fetch(`/api/lists/${listId}/links`, {
        method: "POST",
        body: JSON.stringify({
          url: data.url,
          listId,
        }),
        credentials: "same-origin",
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }
      reset();
    } catch (error) {
      toast.error("Error adding link");
    }
  });

  return (
    <Dialog>
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
            <Button type="submit">링크 추가</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
