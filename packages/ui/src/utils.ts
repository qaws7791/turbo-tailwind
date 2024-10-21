import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export const focusRing = tv({
  base: "focus-visible:u-outline-none focus-visible:u-ring-2 focus-visible:u-ring-offset-2  focus-visible:u-ring-blue-500  u-ring-offset-white",
});

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
