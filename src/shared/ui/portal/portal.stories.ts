import type { Meta, StoryObj } from "@storybook/react";
import { Portal } from ".";

const meta: Meta<typeof Portal> = {
  title: "Portal",
  component: Portal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
