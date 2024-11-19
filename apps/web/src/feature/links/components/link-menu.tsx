"use client";
import LinkDeleteDialog from "@/feature/links/components/link-delete-dialog";
import LinkEditDialog from "@/feature/links/components/link-edit-dialog";
import type { Link } from "@/api/models";
import { Dialog, DialogTrigger } from "@repo/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@repo/ui/dropdown-menu";
import { IconButton } from "@repo/ui/icon-button";
import { EllipsisVertical, Edit2Icon, Trash2Icon } from "lucide-react";
import { useState } from "react";

interface LinkMenuProps {
  link: Link;
}

export default function LinkMenu({ link }: LinkMenuProps): JSX.Element {
  const [showDialog, setShowDialog] = useState<"edit" | "delete" | null>(null);
  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setShowDialog(null);
        }
      }}
      open={showDialog !== null}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton variant="ghost">
            <EllipsisVertical className="size-5" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="sr-only">링크 메뉴</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={() => {
                  setShowDialog("edit");
                }}
              >
                <Edit2Icon />
                <span>수정</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={() => {
                  setShowDialog("delete");
                }}
              >
                <Trash2Icon />
                <span>삭제</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {showDialog === "edit" && (
        <LinkEditDialog
          link={link}
          onClose={() => {
            setShowDialog(null);
          }}
        />
      )}
      {showDialog === "delete" && (
        <LinkDeleteDialog
          id={link.id}
          listId={link.list}
          onClose={() => {
            setShowDialog(null);
          }}
        />
      )}
    </Dialog>
  );
}
