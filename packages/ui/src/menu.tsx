import { Check, ChevronRight } from "lucide-react";
import type {
  MenuProps as AriaMenuProps,
  MenuItemProps,
  SeparatorProps,
} from "react-aria-components";
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  Separator,
  composeRenderProps,
} from "react-aria-components";
import type { DropdownSectionProps } from "./list-box";
import { DropdownSection, dropdownItemStyles } from "./list-box";
import type { PopoverProps } from "./popover";
import { Popover } from "./popover";

interface MenuProps<T> extends AriaMenuProps<T> {
  placement?: PopoverProps["placement"];
}

export function Menu<T extends object>(props: MenuProps<T>): JSX.Element {
  return (
    <Popover className="min-w-[150px]" placement={props.placement}>
      <AriaMenu
        {...props}
        className="p-1 outline outline-0 max-h-[inherit] overflow-auto [clip-path:inset(0_0_0_0_round_.75rem)]"
      />
    </Popover>
  );
}

export function MenuItem(props: MenuItemProps): JSX.Element {
  return (
    <AriaMenuItem {...props} className={dropdownItemStyles}>
      {composeRenderProps(
        props.children,
        (children, { selectionMode, isSelected, hasSubmenu }) => (
          <>
            {selectionMode !== "none" && (
              <span className="flex items-center w-4">
                {isSelected ? <Check aria-hidden className="w-4 h-4" /> : null}
              </span>
            )}
            <span className="flex items-center flex-1 gap-2 font-normal truncate group-selected:font-semibold">
              {children}
            </span>
            {hasSubmenu ? (
              <ChevronRight aria-hidden className="absolute w-4 h-4 right-2" />
            ) : null}
          </>
        )
      )}
    </AriaMenuItem>
  );
}

export function MenuSeparator(props: SeparatorProps): JSX.Element {
  return (
    <Separator
      {...props}
      className="mx-3 my-1 border-b border-gray-300 dark:border-zinc-700"
    />
  );
}

export function MenuSection<T extends object>(
  props: DropdownSectionProps<T>
): JSX.Element {
  return <DropdownSection {...props} />;
}
