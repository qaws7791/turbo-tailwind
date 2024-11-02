"use client";
import { DrawerGroup, DrawerGroupTitle, DrawerItem } from "@repo/ui/drawer";
import { isEqual } from "es-toolkit";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";

export default function AppSideContent() {
  const segments = useSelectedLayoutSegments();
  const router = useRouter();
  return (
    <>
      <DrawerGroupTitle>Menu</DrawerGroupTitle>
      <DrawerGroup>
        <DrawerItem
          onClick={() => {
            router.push("/app");
          }}
          selected={isEqual(segments, ["app"])}
        >
          Home
        </DrawerItem>
      </DrawerGroup>
    </>
  );
}
