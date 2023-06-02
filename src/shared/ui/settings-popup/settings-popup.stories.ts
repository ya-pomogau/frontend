import type { Meta, StoryObj } from "@storybook/react";
import { SettingsPopup } from ".";

const meta: Meta<typeof SettingsPopup> = {
  title: "uikit/SettingsPopup",
  component: SettingsPopup,
  tags: ["autodocs"],
  argTypes: {
    name: {
      description: "Имя пользователя",
    },
    phoneNumber: {
      description: "Номер телефона",
    },
    address: {
      description: "Адрес пользователя",
    },
    extClassName: {
      description: "Класс для дополнительной стилизации",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Иванов Иван Иванович",
    phoneNumber: "+7(000) 000-00-00",
    address: "ул. Потолочного, д.4",
  },
};
