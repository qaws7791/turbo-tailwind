"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerGroup,
  DrawerGroupTitle,
  DrawerItem,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/drawer";
import { IconButton } from "@repo/ui/icon-button";
import { isEqual } from "es-toolkit";
import { Menu } from "lucide-react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";

export default function AppDrawer() {
  const [open, setOpen] = useState(false);
  const segments = useSelectedLayoutSegments();
  const router = useRouter();

  return (
    <Drawer direction="left" onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <IconButton variant="ghost">
          <Menu />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent className="max-w-64" direction="left">
        <DrawerTitle className="sr-only">App Navigation</DrawerTitle>
        <DrawerDescription className="sr-only">
          Use the links below to navigate the application.
        </DrawerDescription>
        <DrawerClose asChild>
          <IconButton variant="ghost">
            <Menu />
          </IconButton>
        </DrawerClose>
        <DrawerGroupTitle>Menu</DrawerGroupTitle>
        <DrawerGroup>
          <DrawerItem
            onClick={() => {
              router.push("/app");
              setOpen(false);
            }}
            selected={isEqual(segments, ["app"])}
          >
            Home
          </DrawerItem>
        </DrawerGroup>
      </DrawerContent>
    </Drawer>
  );
}
