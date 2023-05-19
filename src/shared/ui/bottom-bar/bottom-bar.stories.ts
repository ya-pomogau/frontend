import { Meta, StoryObj } from "@storybook/react";
import { BotBar } from ".";

const meta = {
  title: "Bottom-bar",
  component: BotBar,
} as Meta<typeof BotBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
