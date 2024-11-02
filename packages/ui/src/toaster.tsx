"use client";

import { Toaster as Sonner, toast } from "sonner";

export type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps): JSX.Element {
  return <Sonner className="toaster group" theme="light" {...props} />;
}

export { toast, Toaster };
