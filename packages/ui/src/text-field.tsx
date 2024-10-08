import type {
  TextFieldProps as AriaTextFieldProps,
  ValidationResult,
} from "react-aria-components";
import { TextField as AriaTextField } from "react-aria-components";
import { tv } from "tailwind-variants";
import {
  Description,
  FieldError,
  Input,
  Label,
  fieldBorderStyles,
} from "./field";
import { composeTailwindRenderProps, focusRing } from "./utils";

const inputStyles = tv({
  extend: focusRing,
  base: "border-2 rounded-md",
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  },
});

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function TextField({
  label,
  description,
  errorMessage,
  ...props
}: TextFieldProps): JSX.Element {
  return (
    <AriaTextField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-1"
      )}
    >
      {label ? <Label>{label}</Label> : null}
      <Input className={inputStyles} />
      {description ? <Description>{description}</Description> : null}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
