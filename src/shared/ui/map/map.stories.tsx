import type { Meta, StoryObj } from "@storybook/react";
import { YandexMap } from ".";

const meta = {
  title: "uikit/YandexMap",
  component: YandexMap,
  tags: ["autodocs"],
  argTypes: {
    onClick: {
      description: "Обработчик кнопки Откликнуться",
    },
  },
} as Meta<typeof YandexMap>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 900,
    height: 500,
    onClick: () => console.log(1),
    mapSettings: {
      latitude: 59.93,
      longitude: 30.31,
      zoom: 15,
    },
    tasks: [
      {
        id: 0,
        recipientAdressCoordinates: [59.927, 30.308],
        isUrgentTask: true,
        avatarLink: "https://i.pravatar.cc/300",
        avatarName: "example",
        recipientName: "Иванов Иван Иванович",
        recipientPhoneNumber: "+7(000) ***-**-**",
        description:
          "Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.",
        count: "4",
      },
      {
        id: 1,
        recipientAdressCoordinates: [59.932, 30.312],
        isUrgentTask: false,
        avatarLink: "https://i.pravatar.cc/300",
        avatarName: "example",
        recipientName: "Иванов Иван Иванович",
        recipientPhoneNumber: "+7(000) ***-**-**",
        description:
          "Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.",
        count: "4",
      },
    ],
  },
};
