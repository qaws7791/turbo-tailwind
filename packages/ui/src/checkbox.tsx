"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { motion } from "framer-motion";
import * as React from "react";
import { tv } from "tailwind-variants";
import { cn, focusRing } from "./utils";

const checkboxStyles = tv({
  extend: focusRing,
  base: "u-peer u-h-4.5 u-w-4.5 u-shrink-0 u-rounded-md u-border-2 u-border-gray-300 disabled:u-cursor-not-allowed disabled:u-opacity-50 data-[state=checked]:u-bg-blue-600 data-[state=checked]:u-text-white data-[state=checked]:u-border-none data-[state=indeterminate]:u-bg-blue-600 data-[state=indeterminate]:u-text-white data-[state=indeterminate]:u-border-none u-transition-colors u-flex u-items-center u-justify-center ",
});

export type CheckboxState = CheckboxPrimitive.CheckedState;

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, checked, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={checkboxStyles({ className })}
    checked={checked}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current group")}
    >
      {checked === true && (
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="u-w-3.5 u-h-3.5"
        >
          <motion.path
            d="M4 10.4968L10.3049 17L20 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            stroke="white"
            strokeWidth={3}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              type: "spring",
              bounce: 0.25,
            }}
            custom={0}
          />
        </motion.svg>
      )}
      {checked === "indeterminate" && (
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="u-w-3.5 u-h-3.5"
        >
          <motion.path
            d="M5 12H19"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            stroke="white"
            strokeWidth={3}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              type: "spring",
              bounce: 0.25,
            }}
            custom={0}
          />
        </motion.svg>
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
