"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";

import { cn } from "./utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "u-flex u-cursor-default u-select-none u-items-center u-rounded-md u-px-2 u-py-2 u-text-sm u-font-medium u-outline-none focus:u-bg-gray-200 data-[state=open]:u-bg-gray-200 [&_svg]:u-pointer-events-none [&_svg]:u-size-4 [&_svg]:u-shrink-0 u-gap-2",
      inset && "u-pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="u-ml-auto u-h-4 u-w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "u-z-50 u-min-w-[8rem] u-overflow-hidden u-rounded-md u-border u-bg-white u-p-1 u-shadow-lg data-[state=open]:u-animate-in data-[state=closed]:u-animate-out data-[state=closed]:u-fade-out-0 data-[state=open]:u-fade-in-0 data-[state=closed]:u-zoom-out-95 data-[state=open]:u-zoom-in-95 data-[side=bottom]:u-slide-in-from-top-2 data-[side=left]:u-slide-in-from-right-2 data-[side=right]:u-slide-in-from-left-2 data-[side=top]:u-slide-in-from-bottom-2 u-mx-2",
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "u-z-50 u-min-w-[8rem] u-overflow-hidden u-rounded-xl u-border u-bg-white u-p-1 u-shadow-md data-[state=open]:u-animate-in data-[state=closed]:u-animate-out data-[state=closed]:u-fade-out-0 data-[state=open]:u-fade-in-0 data-[state=closed]:u-zoom-out-95 data-[state=open]:u-zoom-in-95 data-[side=bottom]:u-slide-in-from-top-2 data-[side=left]:u-slide-in-from-right-2 data-[side=right]:u-slide-in-from-left-2 data-[side=top]:u-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "u-relative u-flex u-cursor-default u-select-none u-items-center u-gap-2 u-rounded-lg u-px-2 u-py-2 u-text-sm u-font-medium u-outline-none u-transition-colors focus:u-bg-gray-200/70 data-[disabled]:u-pointer-events-none data-[disabled]:u-opacity-50 [&_svg]:u-pointer-events-none [&_svg]:u-size-4 [&_svg]:u-shrink-0",
      inset && "u-pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "u-relative u-flex u-cursor-default u-select-none u-items-center u-rounded-md u-py-2 u-pl-8 u-pr-2 u-text-sm u-outline-none u-transition-colors focus:u-bg-gray-200 data-[disabled]:u-pointer-events-none data-[disabled]:u-opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="u-absolute u-left-2 u-flex u-h-3.5 u-w-3.5 u-items-center u-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="u-h-4 u-w-4 u-text-blue-600" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "u-relative u-flex u-cursor-default u-select-none u-items-center u-rounded-md u-py-2 u-pl-8 u-pr-2 u-text-sm u-outline-none u-transition-colors focus:u-bg-gray-200 data-[disabled]:u-pointer-events-none data-[disabled]:u-opacity-50",
      className
    )}
    {...props}
  >
    <span className="u-absolute u-left-2 u-flex u-h-3.5 u-w-3.5 u-items-center u-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="u-h-2 u-w-2 u-text-blue-600 u-fill-blue-600" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "u-px-2 u-py-1.5 u-text-sm u-font-semibold",
      inset && "u-pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-u-mx-1 u-my-1 u-h-px u-bg-gray-200", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "u-ml-auto u-text-xs u-tracking-widest u-opacity-60",
        className
      )}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
