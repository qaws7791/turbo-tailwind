"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

import { tv } from "tailwind-variants";
import { cn, focusVisibleRing } from "./utils";

export const switchStyles = tv({
  extend: focusVisibleRing,
  base: "u-peer u-inline-flex u-h-6 u-w-11 u-shrink-0 u-cursor-pointer u-items-center u-rounded-full u-transition-colors disabled:u-cursor-not-allowed disabled:u-opacity-50 data-[state=checked]:u-bg-blue-500 data-[state=unchecked]:u-bg-gray-200 u-relative",
});

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={switchStyles({ className })}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "u-pointer-events-none u-block u-h-5 u-w-5 u-rounded-full u-bg-white u-shadow-lg u-ring-0 u-transition-transform data-[state=checked]:u-translate-x-5.5 data-[state=unchecked]:u-translate-x-0.5"
      )}
    />
    <div className="u-absolute u-h-10 u-w-full" />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
