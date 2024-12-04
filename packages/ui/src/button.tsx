import { Slot } from "@radix-ui/react-slot";
import React, { forwardRef } from "react";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";
import type { RadixUISlot } from "./types";
import { cn, focusVisibleRing } from "./utils";

export const buttonStyles = tv({
  extend: focusVisibleRing,
  base: "u-font-medium u-rounded-lg u-cursor-pointer u-flex u-items-center u-justify-center u-transition-all disabled:u-opacity-50 disabled:u-cursor-not-allowed u-whitespace-nowrap u-gap-1",
  variants: {
    variant: {
      primary:
        "u-bg-blue-500 u-text-white hover:u-bg-blue-600 active:u-bg-blue-700",
      secondary:
        "u-bg-gray-200 u-text-gray-800 hover:u-bg-gray-300 active:u-bg-gray-400",
      success:
        "u-bg-green-500 u-text-white hover:u-bg-green-600 active:u-bg-green-700",
      danger:
        "u-bg-red-500 u-text-white hover:u-bg-red-600 active:u-bg-red-700",
      outline:
        "u-bg-transparent u-text-gray-800 u-border-gray-300 u-border u-box-border hover:u-bg-gray-100 active:u-bg-gray-200",
      ghost:
        "u-bg-transparent u-text-gray-800 hover:u-bg-gray-100 active:u-bg-gray-200",
    },
    size: {
      sm: "u-text-sm u-px-3 u-py-2 u-h-9",
      md: "u-text-base u-px-4 u-py-2 u-h-10",
      lg: "u-px-4 u-py-2 u-text-lg u-h-11",
    },
  },
  compoundVariants: [
    {
      size: ["sm", "md"],
      class: "u-px-3 u-py-1",
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

export type ButtonProps = React.ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonStyles> &
  RadixUISlot;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        className={cn(buttonStyles({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Button.displayName = "Button";
