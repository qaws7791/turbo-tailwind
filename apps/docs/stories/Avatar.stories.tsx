import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src="data:image/jpeg;base64,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"
        alt="User"
      />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  ),
};
