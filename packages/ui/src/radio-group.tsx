"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";

import { tv } from "tailwind-variants";
import { cn, focusRing } from "./utils";

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
  extend: focusRing,
  base: "u-aspect-square u-h-4 u-w-4 u-rounded-full u-border u-border-gray-300 u-bg-white disabled:u-cursor-not-allowed disabled:u-opacity-50 focus:u-ring-2 focus:u-ring-offset-2 focus:u-ring-blue-500 focus:u-ring-offset-white data-[state='checked']:u-bg-blue-600 data-[state='checked']:u-border-transparent",
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
        <div className="u-h-1.5 u-w-1.5 u-rounded-full u-bg-white " />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
