import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from ".";

const meta: Meta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ApproveDialog: Story = {
  args: {
    title: "Благодарю за отзывчивость",
  },
};
