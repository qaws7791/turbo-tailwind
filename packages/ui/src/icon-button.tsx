import { Slot } from "@radix-ui/react-slot";
import React, { forwardRef } from "react";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";
import type { RadixUISlot } from "./types";
import { cn, focusVisibleRing } from "./utils";

export const iconButtonStyles = tv({
  extend: focusVisibleRing,
  base: "u-font-medium u-rounded-xl u-cursor-pointer u-flex u-items-center u-justify-center u-transition-all disabled:u-opacity-50 disabled:u-cursor-not-allowed u-whitespace-nowrap",
  variants: {
    variant: {
      primary:
        "u-bg-blue-500 u-text-white hover:u-bg-blue-600 active:u-bg-blue-700",
      secondary:
        "u-bg-purple-500 u-text-white hover:u-bg-purple-600 active:u-bg-purple-700",
      success:
        "u-bg-green-500 u-text-white hover:u-bg-green-600 active:u-bg-green-700",
      danger:
        "u-bg-red-500 u-text-white hover:u-bg-red-600 active:u-bg-red-700",
      outline:
        "u-bg-transparent u-text-blue-600 u-border-blue-600 u-border-2 u-box-border hover:u-bg-blue-100 active:u-bg-blue-200",
      ghost: "u-bg-transparent hover:u-bg-gray-100 active:u-bg-gray-200",
    },
    size: {
      sm: "u-h-9 u-w-9 [&_svg]:u-size-5",
      md: "u-h-10 u-w-10",
      lg: "u-h-11 u-w-11",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

export type IconButtonProps = React.ComponentPropsWithRef<"button"> &
  VariantProps<typeof iconButtonStyles> &
  RadixUISlot;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        className={cn(iconButtonStyles({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
IconButton.displayName = "IconButton";
