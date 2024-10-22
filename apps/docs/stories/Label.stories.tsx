import { Label } from "@repo/ui/label";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    required: {
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    required: false,
    children: "Label",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Label {...args} />,
};

export const Required: Story = {
  args: {
    required: true,
  },
  render: (args) => <Label {...args} />,
};
