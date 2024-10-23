import { Description, ErrorMessage } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { Meta, StoryObj } from "@storybook/react";
import { Mail } from "lucide-react";

const meta = {
  title: "Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Type something...",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Input {...args} />,
};

export const Disabled: Story = {
  render: (args) => <Input {...args} disabled />,
};

export const File: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1">
      <Input {...args} type="file" />
      <Description>Upload a file</Description>
    </div>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1">
      <Input {...args} type="email" aria-invalid />
      <ErrorMessage>에러 메시지</ErrorMessage>
    </div>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Input {...args} className="pr-10" />
        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
      </div>
      <div className="relative">
        <Input {...args} className="pl-10" />
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
      </div>
    </div>
  ),
};

export const WithUnit: Story = {
  render: (args) => (
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
        ₩
      </span>
      <Input {...args} className="pr-12 pl-7" placeholder="Type amount..." />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
        KRW
      </span>
    </div>
  ),
};
