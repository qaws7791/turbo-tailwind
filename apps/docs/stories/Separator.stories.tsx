import { Separator } from "@repo/ui/separator";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: {
        type: "inline-radio",
        options: ["horizontal", "vertical"],
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <p>Some content</p>
      <Separator />
      <p>Some more content</p>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div>
      <p>Some content</p>
      <Separator orientation="horizontal" />
      <p>Some more content</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex flex-row gap-4 h-4 items-center">
      <div>Some content</div>
      <Separator orientation="vertical" />
      <div>Some content</div>
    </div>
  ),
};
