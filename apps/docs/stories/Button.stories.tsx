import { Button } from "@repo/ui/button";

export default {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive", "icon", "ghost"],
    },
  },
  args: {
    isDisabled: false,
    children: "Button",
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

export const Destructive = {
  args: {
    variant: "destructive",
  },
};

export const Icon = {
  args: {
    variant: "icon",
    children: "🚀",
  },
};

export const Ghost = {
  args: {
    variant: "ghost",
  },
};
