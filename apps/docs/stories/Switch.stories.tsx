import { Label } from "@repo/ui/label";
import { Switch } from "@repo/ui/switch";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} id="mode" />
      <Label htmlFor="mode">Change Mode</Label>
    </div>
  ),
};
