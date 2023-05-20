import { Meta, StoryObj } from "@storybook/react";
import { BottomBar } from ".";

const meta = {
  title: "Bottom-bar",
  component: BottomBar,
} as Meta<typeof BottomBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
