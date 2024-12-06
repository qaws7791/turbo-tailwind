"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";

import { tv } from "tailwind-variants";
import { cn, focusVisibleRing } from "./utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("u-grid u-gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const radioGroupItemStyles = tv({
  extend: focusVisibleRing,
  base: "u-aspect-square u-h-5 u-w-5 u-rounded-full u-border u-border-gray-300 u-bg-transparent disabled:u-cursor-not-allowed disabled:u-opacity-50 data-[state='checked']:u-border-blue-500 u-group u-border-2 border-gray-200 u-m-2.5 u-box-border u-relative u-flex u-items-center u-justify-center",
});

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={radioGroupItemStyles({ className })}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="u-flex u-items-center u-justify-center">
        <div className="u-h-2.5 u-w-2.5 u-rounded-full u-bg-blue-500 u-animate-in u-duration-200 u-zoom-in-50 u-fade-in" />
      </RadioGroupPrimitive.Indicator>
      <div className="u-absolute u-w-10 u-h-10 u-rounded-full" />
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
