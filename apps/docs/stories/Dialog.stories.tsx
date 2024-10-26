import { Button } from "@repo/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/dialog";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">프로필 수정</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>프로필 수정하기</DialogTitle>
          <DialogDescription>
            여러분의 프로필을 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 py-4 flex-col">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              이름
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              닉네임
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-4"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">취소</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button">저장하기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
