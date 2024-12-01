"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import type { RadixUISlot } from "./types";
import { cn } from "./utils";

type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root> & {
  children: React.ReactNode;
};

function Drawer({
  shouldScaleBackground = true,
  direction = "left",
  ...props
}: DrawerProps): JSX.Element {
  return (
    <DrawerPrimitive.Root
      direction={direction}
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  );
}
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    className={cn("u-fixed u-inset-0 u-z-50 u-bg-black/80", className)}
    ref={ref}
    {...props}
  >
    <>{children}</>
  </DrawerPrimitive.Overlay>
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

type DrawerContentProps = React.ComponentPropsWithoutRef<"div"> & {
  direction?: "left" | "right";
};

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, direction = "left", ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      className={cn(
        "u-top-2 u-bottom-2 u-fixed u-outline-none u-w-[310px] u-flex u-z-50",
        direction === "left" ? "u-left-2" : "u-right-2",
        className
      )}
      ref={ref}
      style={
        { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
      }
      {...props}
    >
      <div className="u-bg-zinc-50 u-h-full u-w-full u-grow u-p-3 u-flex u-flex-col u-rounded-[16px] u-gap-2">
        {children}
      </div>
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

function DrawerHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">): JSX.Element {
  return (
    <div
      className={cn(
        "u-grid u-gap-1.5 u-p-2 u-text-center sm:u-text-left",
        className
      )}
      {...props}
    />
  );
}
DrawerHeader.displayName = "DrawerHeader";

function DrawerFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">): JSX.Element {
  return (
    <div
      className={cn("u-mt-auto u-flex u-flex-col u-gap-2 u-p-2", className)}
      {...props}
    />
  );
}
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<"h2">
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    className={cn(
      "u-text-lg u-font-semibold u-leading-none u-tracking-tight",
      className
    )}
    ref={ref}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    className={cn("u-text-sm u-text-muted-foreground", className)}
    ref={ref}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

function DrawerGroup({
  className,
  asChild,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & RadixUISlot): JSX.Element {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      className={cn("u-flex u-flex-col u-gap-1", className)}
      {...props}
    />
  );
}

function DrawerGroupTitle({
  className,
  children,
  asChild,
  ...props
}: React.ComponentPropsWithoutRef<"h3"> & RadixUISlot): JSX.Element {
  const Component = asChild ? Slot : "h3";
  return (
    <Component
      className={cn("u-text-base u-font-semibold u-mx-2", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

function DrawerItem({
  className,
  children,
  asChild,
  selected,
  ...props
}: React.ComponentPropsWithoutRef<"button"> &
  RadixUISlot & {
    selected?: boolean;
  }): JSX.Element {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(
        "u-px-2.5 u-py-1.5 u-rounded-md u-text-left u-w-full u-text-sm u-text-gray-900 hover:u-bg-gray-200",
        selected && "u-bg-gray-200 u-font-semibold",
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </Component>
  );
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGroup,
  DrawerGroupTitle,
  DrawerHeader,
  DrawerItem,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
