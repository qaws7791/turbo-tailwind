"use client";

import { Toaster as Sonner, toast } from "sonner";

export type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps): JSX.Element {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: (
          <svg
            className="u-text-green-500"
            fill="currentColor"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m424-408-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-408Zm56 328q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
          </svg>
        ),
        error: (
          <svg
            className="u-text-red-500"
            fill="currentColor"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480v-160q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v160q0 17 11.5 28.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
          </svg>
        ),
        warning: (
          <svg
            className="u-text-yellow-500"
            fill="currentColor"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M109-120q-11 0-20-5.5T75-140q-5-9-5.5-19.5T75-180l370-640q6-10 15.5-15t19.5-5q10 0 19.5 5t15.5 15l370 640q6 10 5.5 20.5T885-140q-5 9-14 14.5t-20 5.5H109Zm371-120q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm0-120q17 0 28.5-11.5T520-400v-120q0-17-11.5-28.5T480-560q-17 0-28.5 11.5T440-520v120q0 17 11.5 28.5T480-360Z" />
          </svg>
        ),
        info: (
          <svg
            className="u-text-blue-500"
            fill="currentColor"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M480-280q17 0 28.5-11.5T520-320v-160q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480v160q0 17 11.5 28.5T480-280Zm0-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
          </svg>
        ),
      }}
      theme="light"
      toastOptions={{
        unstyled: false,
        classNames: {
          title: "u-font-semibold ",
          description: "u-text-gray-600",
          actionButton: "group-[.toast]:u-bg-blue-500",
          success: "u-text-green-500",
          error: "u-text-red-500",
          info: "u-text-blue-500",
          warning: "u-text-yellow-500",
          loading: "u-text-blue-500",
          default: "u-text-gray-500",
          content: "",
          icon: "u-mr-4",
        },
      }}
      {...props}
    />
  );
}

export { toast, Toaster };
