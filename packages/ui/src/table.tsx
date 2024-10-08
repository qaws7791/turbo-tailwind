import { ArrowUp } from "lucide-react";
import type {
  CellProps,
  ColumnProps,
  RowProps,
  TableHeaderProps,
  TableProps,
} from "react-aria-components";
import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableHeader as AriaTableHeader,
  Button,
  Collection,
  ColumnResizer,
  Group,
  ResizableTableContainer,
  composeRenderProps,
  useTableOptions,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Checkbox } from "./checkbox";
import { composeTailwindRenderProps, focusRing } from "./utils";

export function Table(props: TableProps): JSX.Element {
  return (
    <ResizableTableContainer className="max-h-[280px] w-[550px] overflow-auto scroll-pt-[2.281rem] relative border dark:border-zinc-600 rounded-lg">
      <AriaTable {...props} className="border-separate border-spacing-0" />
    </ResizableTableContainer>
  );
}

const columnStyles = tv({
  extend: focusRing,
  base: "px-2 h-5 flex-1 flex gap-1 items-center overflow-hidden",
});

const resizerStyles = tv({
  extend: focusRing,
  base: "w-px px-[8px] translate-x-[8px] box-content py-1 h-5 bg-clip-content bg-gray-400 dark:bg-zinc-500 forced-colors:bg-[ButtonBorder] cursor-col-resize rounded resizing:bg-blue-600 forced-colors:resizing:bg-[Highlight] resizing:w-[2px] resizing:pl-[7px] -outline-offset-2",
});

export function Column(props: ColumnProps): JSX.Element {
  return (
    <AriaColumn
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "[&:hover]:z-20 [&:focus-within]:z-20 text-start text-sm font-semibold text-gray-700 dark:text-zinc-300 cursor-default"
      )}
    >
      {composeRenderProps(
        props.children,
        (children, { allowsSorting, sortDirection }) => (
          <div className="flex items-center">
            <Group className={columnStyles} role="presentation" tabIndex={-1}>
              <span className="truncate">{children}</span>
              {allowsSorting ? (
                <span
                  className={`w-4 h-4 flex items-center justify-center transition ${
                    sortDirection === "descending" ? "rotate-180" : ""
                  }`}
                >
                  {sortDirection ? (
                    <ArrowUp
                      aria-hidden
                      className="w-4 h-4 text-gray-500 dark:text-zinc-400 forced-colors:text-[ButtonText]"
                    />
                  ) : null}
                </span>
              ) : null}
            </Group>
            {!props.width && <ColumnResizer className={resizerStyles} />}
          </div>
        )
      )}
    </AriaColumn>
  );
}

export function TableHeader<T extends object>(
  props: TableHeaderProps<T>
): JSX.Element {
  const { selectionBehavior, selectionMode, allowsDragging } =
    useTableOptions();

  return (
    <AriaTableHeader
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "sticky top-0 z-10 bg-gray-100/60 dark:bg-zinc-700/60 backdrop-blur-md supports-[-moz-appearance:none]:bg-gray-100 dark:supports-[-moz-appearance:none]:bg-zinc-700 forced-colors:bg-[Canvas] rounded-t-lg border-b dark:border-b-zinc-700"
      )}
    >
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging ? <Column /> : null}
      {selectionBehavior === "toggle" && (
        <AriaColumn
          className="text-start text-sm font-semibold cursor-default p-2"
          minWidth={36}
          width={36}
        >
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </AriaColumn>
      )}
      <Collection items={props.columns}>{props.children}</Collection>
    </AriaTableHeader>
  );
}

const rowStyles = tv({
  extend: focusRing,
  base: "group/row relative cursor-default select-none -outline-offset-2 text-gray-900 disabled:text-gray-300 dark:text-zinc-200 dark:disabled:text-zinc-600 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700/60 selected:bg-blue-100 selected:hover:bg-blue-200 dark:selected:bg-blue-700/30 dark:selected:hover:bg-blue-700/40",
});

export function Row<T extends object>({
  id,
  columns,
  children,
  ...otherProps
}: RowProps<T>): JSX.Element {
  const { selectionBehavior, allowsDragging } = useTableOptions();

  return (
    <AriaRow id={id} {...otherProps} className={rowStyles}>
      {allowsDragging ? (
        <Cell>
          <Button slot="drag">≡</Button>
        </Cell>
      ) : null}
      {selectionBehavior === "toggle" && (
        <Cell>
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </AriaRow>
  );
}

const cellStyles = tv({
  extend: focusRing,
  base: "border-b dark:border-b-zinc-700 group-last/row:border-b-0 [--selected-border:theme(colors.blue.200)] dark:[--selected-border:theme(colors.blue.900)] group-selected/row:border-[--selected-border] [:has(+[data-selected])_&]:border-[--selected-border] p-2 truncate -outline-offset-2",
});

export function Cell(props: CellProps): JSX.Element {
  return <AriaCell {...props} className={cellStyles} />;
}
