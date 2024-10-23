import React from "react";
import { cn } from "./utils";

export const Description = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithRef<"p">
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("u-text-sm u-text-gray-600", className)}
      {...props}
    />
  );
});
Description.displayName = "Description";

export const ErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithRef<"p">
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("u-text-sm u-font-medium u-text-red-500", className)}
      {...props}
    />
  );
});
ErrorMessage.displayName = "ErrorMessage";
