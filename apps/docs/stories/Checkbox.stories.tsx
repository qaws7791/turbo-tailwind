import { Button } from "@repo/ui/button";
import { Checkbox, CheckboxState } from "@repo/ui/checkbox";
import { Label } from "@repo/ui/label";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

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

function IndeterminateCheckbox() {
  const [checked, setChecked] = useState<CheckboxState>(false);

  console.log("checked", checked);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id="checkbox3"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="checkbox3">Checkbox</Label>
      </div>
      <Button
        onClick={() => {
          console.log(checked);
          setChecked((prevIsChecked) =>
            prevIsChecked === false
              ? "indeterminate"
              : prevIsChecked === "indeterminate"
                ? true
                : false
          );
        }}
      >
        Change state
      </Button>
    </div>
  );
}

export const Indeterminate: Story = {
  render: () => <IndeterminateCheckbox />,
};
