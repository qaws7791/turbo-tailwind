"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";
import { tv, VariantProps } from "tailwind-variants";

export const labelVariants = tv({
  base: "u-text-sm u-font-medium u-leading-none peer-disabled:u-cursor-not-allowed peer-disabled:u-opacity-70",
  variants: {
    required: {
      true: 'after:u-content-["*"] after:u-ml-1 after:u-text-red-500',
      false: "",
    },
  },
  defaultVariants: {
    required: false,
  },
});

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={labelVariants({ className, required })}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;
