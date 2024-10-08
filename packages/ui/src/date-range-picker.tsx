import { CalendarIcon } from "lucide-react";
import type {
  DateRangePickerProps as AriaDateRangePickerProps,
  DateValue,
  ValidationResult,
} from "react-aria-components";
import { DateRangePicker as AriaDateRangePicker } from "react-aria-components";
import { Button } from "./button";
import { DateInput } from "./date-field";
import { Dialog } from "./dialog";
import { Description, FieldError, FieldGroup, Label } from "./field";
import { Popover } from "./popover";
import { RangeCalendar } from "./range-calendar";
import { composeTailwindRenderProps } from "./utils";

export interface DateRangePickerProps<T extends DateValue>
  extends AriaDateRangePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DateRangePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: DateRangePickerProps<T>): JSX.Element {
  return (
    <AriaDateRangePicker
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-1"
      )}
    >
      {label ? <Label>{label}</Label> : null}
      <FieldGroup className="min-w-[208px] w-auto">
        <DateInput className="px-2 py-1.5 text-sm" slot="start" />
        <span
          aria-hidden="true"
          className="text-gray-800 dark:text-zinc-200 forced-colors:text-[ButtonText] group-disabled:text-gray-200 group-disabled:dark:text-zinc-600 group-disabled:forced-colors:text-[GrayText]"
        >
          –
        </span>
        <DateInput className="flex-1 px-2 py-1.5 text-sm" slot="end" />
        <Button className="w-6 mr-1 rounded outline-offset-0" variant="icon">
          <CalendarIcon aria-hidden className="w-4 h-4" />
        </Button>
      </FieldGroup>
      {description ? <Description>{description}</Description> : null}
      <FieldError>{errorMessage}</FieldError>
      <Popover>
        <Dialog>
          <RangeCalendar />
        </Dialog>
      </Popover>
    </AriaDateRangePicker>
  );
}
