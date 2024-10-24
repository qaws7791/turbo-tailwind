"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { cn, focusRing } from "./utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "u-flex u-h-10 u-w-full u-items-center u-justify-between u-rounded-lg u-border u-border-gray-300  u-bg-white u-px-3 u-py-2 u-text-sm disabled:u-cursor-not-allowed disabled:u-opacity-50 [&>span]:line-clamp-1",
      focusRing(),
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="u-h-4 u-w-4 u-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "u-flex u-cursor-default u-items-center u-justify-center u-py-1 u-from-transparent u-to-gray-100 u-bg-gradient-to-b u-border-b u-border-gray-200 hover:u-bg-gray-100 focus:u-bg-gray-100 u-transition-colors",
      className
    )}
    {...props}
  >
    <ChevronUp className="u-h-4 u-w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "u-flex u-cursor-default u-items-center u-justify-center u-py-1 u-from-transparent u-to-gray-100 u-bg-gradient-to-b u-border-t u-border-gray-200 hover:u-bg-gray-100 focus:u-bg-gray-100 u-transition-colors",
      className
    )}
    {...props}
  >
    <ChevronDown className="u-h-4 u-w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "u-relative u-z-50 u-max-h-64 md:u-max-h-96 u-min-w-32 u-overflow-hidden u-rounded-lg u-border u-bg-white u-shadow data-[state=open]:u-animate-in data-[state=closed]:u-animate-out data-[state=closed]:u-fade-out-0 data-[state=open]:u-fade-in-0 data-[state=closed]:u-zoom-out-95 data-[state=open]:u-zoom-in-95 data-[side=bottom]:u-slide-in-from-top-2 data-[side=left]:u-slide-in-from-right-2 data-[side=right]:u-slide-in-from-left-2 data-[side=top]:u-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:u-translate-y-1 data-[side=left]:-u-translate-x-1 data-[side=right]:u-translate-x-1 data-[side=top]:-u-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "u-p-1",
          position === "popper" &&
            "u-h-[var(--radix-select-trigger-height)] u-w-full u-min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "u-py-1.5 u-pl-8 u-pr-2 u-text-sm u-font-semibold",
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "u-relative u-flex u-w-full u-cursor-default u-select-none u-items-center u-rounded-md u-py-2 u-pl-8 u-pr-2 u-text-sm u-outline-none focus:u-bg-gray-200 data-[disabled]:u-pointer-events-none data-[disabled]:u-opacity-50 data-[highlighted]:u-bg-blue-500 data-[highlighted]:u-text-white",
      className
    )}
    {...props}
  >
    <span className="u-absolute u-left-2 u-flex u-h-3.5 u-w-3.5 u-items-center u-justify-center">
      <SelectPrimitive.ItemIndicator>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="u-w-4 u-h-4"
        >
          <path
            d="M4 10.4968L10.3049 17L20 7"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-u-mx-1 u-my-1 u-h-px u-bg-gray-200", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
