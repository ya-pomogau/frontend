import type { Meta, StoryObj } from "@storybook/react";

import { Button } from ".";

const meta: Meta<typeof Button> = {
  title: "Buttons/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    buttonType: "primary",
    label: "Применить",
  },
};

export const Secondary: Story = {
  args: {
    buttonType: "secondary",
    label: "Заблокировать",
    size: "medium",
  },
};

export const PartialFill: Story = {
  args: {
    buttonType: "partial",
    label: "Подтвердить",
  },
};

export const Disabled: Story = {
  args: {
    buttonType: "primary",
    label: "Применить",
    disabled: true,
  },
};
