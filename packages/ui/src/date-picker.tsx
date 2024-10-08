import { CalendarIcon } from "lucide-react";
import type {
  DatePickerProps as AriaDatePickerProps,
  DateValue,
  ValidationResult,
} from "react-aria-components";
import { DatePicker as AriaDatePicker } from "react-aria-components";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { DateInput } from "./date-field";
import { Dialog } from "./dialog";
import { Description, FieldError, FieldGroup, Label } from "./field";
import { Popover } from "./popover";
import { composeTailwindRenderProps } from "./utils";

export interface DatePickerProps<T extends DateValue>
  extends AriaDatePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: DatePickerProps<T>): JSX.Element {
  return (
    <AriaDatePicker
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-1"
      )}
    >
      {label ? <Label>{label}</Label> : null}
      <FieldGroup className="min-w-[208px] w-auto">
        <DateInput className="flex-1 min-w-[150px] px-2 py-1.5 text-sm" />
        <Button className="w-6 mr-1 rounded outline-offset-0" variant="icon">
          <CalendarIcon aria-hidden className="w-4 h-4" />
        </Button>
      </FieldGroup>
      {description ? <Description>{description}</Description> : null}
      <FieldError>{errorMessage}</FieldError>
      <Popover>
        <Dialog>
          <Calendar />
        </Dialog>
      </Popover>
    </AriaDatePicker>
  );
}
