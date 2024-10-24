"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { motion } from "framer-motion";
import * as React from "react";
import { tv } from "tailwind-variants";
import { cn, focusVisibleRing } from "./utils";

const checkboxStyles = tv({
  extend: focusVisibleRing,
  base: "u-peer u-h-5 u-w-5 u-shrink-0 u-rounded-md u-border-2 u-border-gray-300 disabled:u-cursor-not-allowed disabled:u-opacity-50 data-[state=checked]:u-bg-blue-600 data-[state=checked]:u-text-white data-[state=checked]:u-border-none data-[state=indeterminate]:u-bg-blue-600 data-[state=indeterminate]:u-text-white data-[state=indeterminate]:u-border-none u-transition-colors u-flex u-items-center u-justify-center u-m-2.5 u-group",
});

export type CheckboxState = CheckboxPrimitive.CheckedState;

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={checkboxStyles({ className })}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "u-flex u-items-center u-justify-center u-text-current u-group"
      )}
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="u-w-3.5 u-h-3.5 u-hidden group-data-[state=checked]:u-block"
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
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="u-w-3.5 u-h-3.5 u-hidden group-data-[state=indeterminate]:u-block"
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
    </CheckboxPrimitive.Indicator>
    <div className="u-absolute u-w-10 u-h-10 u-rounded-full group-focus:u-bg-gray-400/10 group-hover:u-bg-gray-400/10"></div>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
