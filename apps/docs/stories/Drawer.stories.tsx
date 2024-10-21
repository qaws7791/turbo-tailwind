import { Button } from "@repo/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGroup,
  DrawerGroupTitle,
  DrawerHeader,
  DrawerItem,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/drawer";
import { Separator } from "@repo/ui/separator";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    direction: {
      control: { type: "select", options: ["right", "left"] },
    },
  },
  args: {
    direction: "right",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Drawer direction={args.direction}>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent direction={args.direction}>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

const MobileNavWithHooks = () => {
  const [selected, setSelected] = useState("Inbox");

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent direction="left">
        <DrawerGroupTitle>Mail</DrawerGroupTitle>
        <DrawerGroup>
          {["Inbox", "Starred", "Sent Mail", "Drafts"].map((item) => (
            <DrawerItem
              key={item}
              selected={item === selected}
              onClick={() => setSelected(item)}
            >
              {item}
            </DrawerItem>
          ))}
        </DrawerGroup>
        <Separator />
        <DrawerGroupTitle>Settings</DrawerGroupTitle>
        <DrawerGroup>
          {["Themes", "Layout", "Account"].map((item) => (
            <DrawerItem
              key={item}
              selected={item === selected}
              onClick={() => setSelected(item)}
            >
              {item}
            </DrawerItem>
          ))}
        </DrawerGroup>
      </DrawerContent>
    </Drawer>
  );
};

export const MobileNav: Story = {
  render: () => <MobileNavWithHooks />,
};
