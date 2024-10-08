/* eslint-disable jsx-a11y/no-autofocus  -- alert dialog should autofocus on action button */

import { AlertCircleIcon, InfoIcon } from "lucide-react";
import { type ReactNode } from "react";
import { chain } from "react-aria";
import { type DialogProps, Heading } from "react-aria-components";
import { Button } from "./button";
import { Dialog } from "./dialog";

interface AlertDialogProps extends Omit<DialogProps, "children"> {
  title: string;
  children: ReactNode;
  variant?: "info" | "destructive";
  actionLabel: string;
  cancelLabel?: string;
  onAction?: () => void;
}

export function AlertDialog({
  title,
  variant,
  cancelLabel,
  actionLabel,
  onAction,
  children,
  ...props
}: AlertDialogProps): JSX.Element {
  return (
    <Dialog role="alertdialog" {...props}>
      {({ close }) => (
        <>
          <Heading
            className="text-xl font-semibold leading-6 my-0"
            slot="title"
          >
            {title}
          </Heading>
          <div
            className={`w-6 h-6 absolute right-6 top-6 stroke-2 ${variant === "destructive" ? "text-red-500" : "text-blue-500"}`}
          >
            {variant === "destructive" ? (
              <AlertCircleIcon aria-hidden />
            ) : (
              <InfoIcon aria-hidden />
            )}
          </div>
          <p className="mt-3 text-slate-500 dark:text-zinc-400">{children}</p>
          <div className="mt-6 flex justify-end gap-2">
            <Button onPress={close} variant="secondary">
              {cancelLabel || "Cancel"}
            </Button>
            <Button
              autoFocus
              onPress={chain(onAction, close)}
              variant={variant === "destructive" ? "destructive" : "primary"}
            >
              {actionLabel}
            </Button>
          </div>
        </>
      )}
    </Dialog>
  );
}
