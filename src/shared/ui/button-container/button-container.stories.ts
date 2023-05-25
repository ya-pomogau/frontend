import type { Meta, StoryObj } from "@storybook/react";

import { ButtonContainer } from ".";

const meta: Meta<typeof ButtonContainer> = {
  title: "ButtonContainer",
  component: ButtonContainer,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    border: "main",
    size: "web",
  },
};

export const Sea: Story = {
  args: {
    border: "sea",
    size: "web",
  },
};

export const Mobile: Story = {
  args: {
    border: "mobile",
    size: "mob",
  },
};
