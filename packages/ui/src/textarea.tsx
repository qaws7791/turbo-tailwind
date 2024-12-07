import * as React from "react";

import { tv, VariantProps } from "tailwind-variants";
import { focusVisibleRing } from "./utils";

export type TextareaProps = React.ComponentPropsWithRef<"textarea"> &
  VariantProps<typeof textareaStyles>;

const textareaStyles = tv({
  extend: focusVisibleRing,
  base: "u-flex u-min-h-[80px] u-w-full u-rounded-lg placeholder:u-text-gray-400 u-text-sm u-border u-border-gray-400 u-p-2 u-transition u-duration-300 u-ease u-shadow-sm focus:u-shadow aria-invalid:u-border-red-500 aria-invalid:u-text-red-600 aria-invalid:u-ring-red-500 disabled:u-bg-gray-100 disabled:u-text-gray-400 disabled:u-cursor-not-allowed",
  variants: {
    resize: {
      true: "",
      false: "u-resize-none",
    },
  },
  defaultVariants: {
    resize: true,
  },
});

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, resize, ...props }, ref) => {
    return (
      <textarea
        className={textareaStyles({ className, resize })}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
