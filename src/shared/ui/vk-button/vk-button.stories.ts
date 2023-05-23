import type { Meta, StoryObj } from "@storybook/react";

import { VkButton } from ".";

const meta: Meta<typeof VkButton> = {
  title: "Buttons/VkButton",
  component: VkButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SignIn: Story = {
  args: {
    label: "Войти через ВКонтакте",
  },
};

export const Register: Story = {
  args: {
    label: "Зарегестрироваться через ВКонтакте",
  },
};

export const Disabled: Story = {
  args: {
    label: "Войти через ВКонтакте",
    disabled: true,
  },
};
