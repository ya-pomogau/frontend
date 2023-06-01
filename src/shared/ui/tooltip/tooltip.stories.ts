import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from ".";

const meta: Meta<typeof Tooltip> = {
  title: "uikit/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    children: { type: "string" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visible: true,
    children: "Какой-то контент",
  },
};

export const CenterPointer: Story = {
  args: {
    visible: true,
    children: "Какой-то контент",
    pointerPosition: "center",
  },
};
