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
      <div className="flex items-center">
        <Checkbox id="checkbox" {...args} />
        <Label htmlFor="checkbox">Checkbox</Label>
      </div>
      <div className="flex items-center">
        <Checkbox id="checkbox2" {...args} />
        <Label htmlFor="checkbox2">Checkbox2</Label>
      </div>
    </div>
  ),
};

function IndeterminateCheckbox() {
  const [checked, setApple] = useState<CheckboxState[]>([false, false, false]);

  const fruitsChecked: CheckboxState = checked.every(Boolean)
    ? true
    : checked.some(Boolean)
      ? "indeterminate"
      : false;

  const handleFruitsChange = (checked: CheckboxState) => {
    if (checked === "indeterminate") {
      setApple([true, true, true]);
      return;
    }
    if (checked) {
      setApple([true, true, true]);
      return;
    }
    setApple([false, false, false]);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex items-center">
          <Checkbox
            checked={fruitsChecked}
            onCheckedChange={handleFruitsChange}
          />
          <Label>Fruits</Label>
        </div>
        <div className="flex gap-2 flex-col ml-4">
          {["Apple", "Banana", "Cherry"].map((item, i) => (
            <div key={item} className="flex items-center">
              <Checkbox
                checked={checked[i]}
                onCheckedChange={(checked) => {
                  setApple((prev) => {
                    const next = [...prev];
                    next[i] = checked;
                    return next;
                  });
                }}
              />
              <Label>{item}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Indeterminate: Story = {
  render: () => <IndeterminateCheckbox />,
};
