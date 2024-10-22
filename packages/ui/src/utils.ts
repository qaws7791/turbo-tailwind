import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export const focusVisibleRing = tv({
  base: "focus-visible:u-outline-none focus-visible:u-ring-2 focus-visible:u-ring-offset-2  focus-visible:u-ring-blue-500  u-ring-offset-white",
});

export const focusRing = tv({
  base: "focus:u-ring-2 focus:u-ring-offset-2 focus:u-ring-blue-500  u-ring-offset-white focus:u-outline-none",
});

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
