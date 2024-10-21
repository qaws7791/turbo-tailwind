import { IconButton } from "@repo/ui/icon-button";
import { Bell } from "lucide-react";

export default {
  title: "IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "danger",
        "outline",
        "ghost",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    isDisabled: false,
    children: <Bell />,
  },
};

export const Primary = {
  args: {
    variant: "primary",
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
  },
};

export const Success = {
  args: {
    variant: "success",
  },
};

export const Danger = {
  args: {
    variant: "danger",
  },
};

export const Outline = {
  args: {
    variant: "outline",
  },
};

export const Ghost = {
  args: {
    variant: "ghost",
  },
};
