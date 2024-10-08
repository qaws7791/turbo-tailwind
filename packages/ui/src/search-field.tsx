import { SearchIcon, XIcon } from "lucide-react";
import type {
  SearchFieldProps as AriaSearchFieldProps,
  ValidationResult,
} from "react-aria-components";
import { SearchField as AriaSearchField } from "react-aria-components";
import { Button } from "./button";
import { Description, FieldError, FieldGroup, Input, Label } from "./field";
import { composeTailwindRenderProps } from "./utils";

export interface SearchFieldProps extends AriaSearchFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function SearchField({
  label,
  description,
  errorMessage,
  ...props
}: SearchFieldProps): JSX.Element {
  return (
    <AriaSearchField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-1 min-w-[40px]"
      )}
    >
      {label ? <Label>{label}</Label> : null}
      <FieldGroup>
        <SearchIcon
          aria-hidden
          className="w-4 h-4 ml-2 text-gray-500 dark:text-zinc-400 forced-colors:text-[ButtonText] group-disabled:text-gray-200 dark:group-disabled:text-zinc-600 forced-colors:group-disabled:text-[GrayText]"
        />
        <Input className="[&::-webkit-search-cancel-button]:hidden" />
        <Button className="mr-1 w-6 group-empty:invisible" variant="icon">
          <XIcon aria-hidden className="w-4 h-4" />
        </Button>
      </FieldGroup>
      {description ? <Description>{description}</Description> : null}
      <FieldError>{errorMessage}</FieldError>
    </AriaSearchField>
  );
}
