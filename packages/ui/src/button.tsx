import {
  Button as RACButton,
  composeRenderProps,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "./utils";

export interface ButtonProps extends RACButtonProps {
  variant?: "primary" | "secondary" | "destructive" | "icon";
}

export const button = tv({
  extend: focusRing,
  base: "ui-px-5 ui-py-2 ui-h-10 ui-text-sm ui-text-center ui-transition ui-rounded-lg ui-border ui-border-black/10 ui-shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] ui-cursor-pointer ui-inline-flex disabled:ui-cursor-not-allowed",
  variants: {
    variant: {
      primary:
        "ui-bg-blue-600 hover:ui-bg-blue-700 pressed:ui-bg-blue-800 ui-text-white disabled:ui-bg-blue-400",
      secondary:
        "ui-bg-transparent hover:ui-bg-gray-100 pressed:ui-bg-gray-200 ui-text-gray-800 disabled:ui-bg-gray-200 disabled:ui-text-gray-400",
      destructive:
        "ui-bg-red-700 hover:ui-bg-red-800 pressed:ui-bg-red-900 ui-text-white disabled:ui-bg-red-400",
      ghost:
        "ui-bg-transparent ui-text-gray-600 hover:ui-text-gray-800 pressed:ui-text-gray-900 disabled:ui-text-gray-400 ui-border-transparent hover:ui-bg-black/[5%] pressed:ui-bg-black/10 disabled:ui-bg-transparent",
      icon: "ui-border-0 ui-w-10 ui-px-2 ui-py-2 ui-flex ui-items-center ui-justify-center ui-text-gray-600 hover:ui-bg-gray-100 pressed:ui-bg-gray-200 disabled:ui-bg-transparent",
    },
    isDisabled: {
      true: "",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export function Button(props: ButtonProps): JSX.Element {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, variant: props.variant, className })
      )}
    />
  );
}
