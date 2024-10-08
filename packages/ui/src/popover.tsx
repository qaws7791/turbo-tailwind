import React from "react";
import type { PopoverProps as AriaPopoverProps } from "react-aria-components";
import {
  Popover as AriaPopover,
  composeRenderProps,
  OverlayArrow,
  PopoverContext,
  useSlottedContext,
} from "react-aria-components";
import { tv } from "tailwind-variants";

export interface PopoverProps extends Omit<AriaPopoverProps, "children"> {
  showArrow?: boolean;
  children: React.ReactNode;
}

const styles = tv({
  base: "bg-white dark:bg-zinc-900/70 dark:backdrop-blur-2xl dark:backdrop-saturate-200 forced-colors:bg-[Canvas] shadow-2xl rounded-xl bg-clip-padding border border-black/10 dark:border-white/[15%] text-slate-700 dark:text-zinc-300",
  variants: {
    isEntering: {
      true: "animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 ease-out duration-200",
    },
    isExiting: {
      true: "animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 ease-in duration-150",
    },
  },
});

const usePopoverContext = () => {
  const context = useSlottedContext(PopoverContext);
  if (!context) {
    throw new Error("Popover must be used within a PopoverTrigger");
  }
  return context;
};

export function Popover({
  children,
  showArrow,
  className,
  ...props
}: PopoverProps): JSX.Element {
  const popoverContext = usePopoverContext();
  const isSubmenu = popoverContext.trigger === "SubmenuTrigger";
  let offset = showArrow ? 12 : 8;
  offset = isSubmenu ? offset - 6 : offset;
  return (
    <AriaPopover
      offset={offset}
      {...props}
      className={composeRenderProps(className, (propClassName, renderProps) =>
        styles({ ...renderProps, className: propClassName })
      )}
    >
      {showArrow ? (
        <OverlayArrow className="group">
          <svg
            className="block fill-white dark:fill-[#1f1f21] forced-colors:fill-[Canvas] stroke-1 stroke-black/10 dark:stroke-zinc-600 forced-colors:stroke-[ButtonBorder] group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90"
            height={12}
            viewBox="0 0 12 12"
            width={12}
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      ) : null}
      {children}
    </AriaPopover>
  );
}
