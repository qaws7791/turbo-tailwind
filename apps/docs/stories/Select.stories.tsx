import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Select",
  component: Select,
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
    children: "Select",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Veggies</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="cucumber">Cucumber</SelectItem>
          <SelectItem value="potato">Potato</SelectItem>
          <SelectItem value="tomato">Tomato</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Drinks</SelectLabel>
          <SelectItem value="coffee">Coffee</SelectItem>
          <SelectItem value="tea">Tea</SelectItem>
          <SelectItem value="water">Water</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Snacks</SelectLabel>
          <SelectItem value="chips">Chips</SelectItem>
          <SelectItem value="cookies">Cookies</SelectItem>
          <SelectItem value="popcorn">Popcorn</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
