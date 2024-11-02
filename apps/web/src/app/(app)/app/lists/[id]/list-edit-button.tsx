"use client";
import ListEditDialog from "@/components/list-edit-dialog";
import { Button } from "@repo/ui/button";
import { Dialog, DialogTrigger } from "@repo/ui/dialog";
import { Edit2 } from "lucide-react";
import { useState } from "react";

export default function ListEditButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit2 className="size-4" />
          리스트 수정
        </Button>
      </DialogTrigger>
      <ListEditDialog
        listId={id}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Dialog>
  );
}
