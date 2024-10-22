import { Checkbox } from "@repo/ui/checkbox";
import { Label } from "@repo/ui/label";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox" {...args} />
        <Label htmlFor="checkbox">Checkbox</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox2" {...args} />
        <Label htmlFor="checkbox2">Checkbox2</Label>
      </div>
    </div>
  ),
};
