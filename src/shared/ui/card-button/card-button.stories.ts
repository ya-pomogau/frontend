import type { Meta, StoryObj } from "@storybook/react";

import { CardButton } from ".";

const meta: Meta<typeof CardButton> = {
  title: "Buttons/CardButton",
  component: CardButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Обозначение карточки",
  },
};

export const Pressed: Story = {
  args: {
    label: "Обозначение карточки",
    isPressed: true,
  },
};
