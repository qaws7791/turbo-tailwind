import { Button } from "@repo/ui/button";
import { toast, Toaster } from "@repo/ui/toaster";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Toaster",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <Button onClick={() => toast.success("작업을 성공적으로 완료했습니다.")}>
        Success
      </Button>
      <Button
        onClick={() =>
          toast.error("작업을 완료하지 못했습니다. 다시 시도해주세요.", {
            action: {
              label: "다시 시도",
              onClick: () => {
                toast.success("다시 시도했습니다.");
              },
            },
          })
        }
      >
        Error
      </Button>
      <Button onClick={() => toast.warning("작업이 실패했습니다.")}>
        Warning
      </Button>
      <Button onClick={() => toast.info("작업에 대한 정보입니다.")}>
        Info
      </Button>

      <Toaster duration={50000} />
    </div>
  ),
};
