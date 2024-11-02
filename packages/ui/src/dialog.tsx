"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { cn } from "./utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      "u-fixed u-inset-0 u-z-50 u-bg-black/50  data-[state=open]:u-animate-in data-[state=closed]:u-animate-out data-[state=closed]:u-fade-out-0 data-[state=open]:u-fade-in-0 u-transition-all",
      className
    )}
    ref={ref}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        "u-fixed u-mx-4 u-left-0 u-right-0 u-top-1/2 sm:u-left-1/2 u-z-50 u-grid sm:u-w-full sm:u-max-w-lg sm:u-translate-x-[-50%] -u-translate-y-1/2 u-gap-4 u-border u-bg-white u-p-6 u-shadow-lg u-duration-200 data-[state=open]:u-animate-in data-[state=closed]:u-animate-out data-[state=closed]:u-fade-out-0 data-[state=open]:u-fade-in-0 data-[state=closed]:u-zoom-out-95 data-[state=open]:u-zoom-in-95 data-[state=closed]:u-slide-out-to-left-1/2 data-[state=closed]:u-slide-out-to-top-[48%] data-[state=open]:u-slide-in-from-left-1/2 data-[state=open]:u-slide-in-from-top-[48%] u-rounded-xl",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "u-flex u-flex-col u-space-y-1.5 u-text-center sm:u-text-left",
        className
      )}
      {...props}
    />
  );
}
DialogHeader.displayName = "DialogHeader";

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "u-flex u-flex-col-reverse sm:u-flex-row sm:u-justify-end u-gap-2",
        className
      )}
      {...props}
    />
  );
}
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={cn(
      "u-text-xl u-font-semibold u-leading-none u-tracking-tight",
      className
    )}
    ref={ref}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={cn("u-text-gray-600", className)}
    ref={ref}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
