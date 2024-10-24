import { Label } from "@repo/ui/label";
import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="everything" {...args}>
      {[
        {
          id: "r1",
          value: "everything",
        },
        {
          id: "r2",
          value: "same as email",
        },
        {
          id: "r3",
          value: "no push notifications",
        },
      ].map(({ id, value }) => (
        <div key={id} className="flex items-center">
          <RadioGroupItem value={value} id={id} />
          <Label htmlFor={id}>{value}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};
