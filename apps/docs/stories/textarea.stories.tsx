import { ErrorMessage } from "@repo/ui/form";
import { Textarea } from "@repo/ui/textarea";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Type something...",
    className: "w-80",
  },
  argTypes: {
    resize: {
      control: {
        type: "boolean",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Textarea {...args} />,
};

export const Disabled: Story = {
  render: (args) => <Textarea {...args} disabled />,
};

export const Invalid: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1">
      <Textarea {...args} aria-invalid />
      <ErrorMessage>에러 메시지</ErrorMessage>
    </div>
  ),
};

export const NoResize: Story = {
  render: (args) => <Textarea {...args} resize={false} />,
};
