import { forwardRef } from "react";
import { tv } from "tailwind-variants";
import { cn, focusVisibleRing } from "./utils";

export const inputStyles = tv({
  extend: focusVisibleRing,
  base: "u-w-full u-h-10 u-bg-transparent placeholder:u-text-gray-400 u-text-sm u-border u-border-gray-400 u-rounded-lg u-pl-3 u-pr-3 u-py-2 u-transition u-duration-300 u-ease shadow-sm focus:shadow file:u-border-0 file:u-bg-transparent aria-invalid:u-border-red-500 aria-invalid:u-text-red-600 aria-invalid:u-ring-red-500 disabled:u-bg-gray-100 disabled:u-text-gray-400 disabled:u-cursor-not-allowed u-shadow-sm",
});

export type InputProps = React.ComponentPropsWithRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input className={cn(inputStyles({ className }))} ref={ref} {...props} />
    );
  }
);
