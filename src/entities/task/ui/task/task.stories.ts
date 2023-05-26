import { Meta, StoryObj } from "@storybook/react";
import { Task } from ".";

const meta = {
  title: "Entities/Task",
  component: Task,
  tags: ["autodocs"],
} as Meta<typeof Task>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    isNonMobile: true,
    category: "категория",
    date: "24.10.2022",
    time: "16:00",
    address: "ул. Потолочного д. 9",
    title: "Заголовок",
    description:
      "Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.",
    count: "3",
    avatarLink: "https://i.pravatar.cc/300",
    avatarName: "example",
    recipientName: "Петров Петр Петрович",
    recipientPhoneNumber: "+7(000) 000-00-00",
    handleClickPnoneButton: () => 1,
    handleClickMessageButton: () => 2,
    handleClickConfirmButton: () => 3,
    handleClickCloseButton: () => 4,
    handleClickEditButton: () => 5,
  },
};

export const Mobile: Story = {
  args: {
    isNonMobile: false,
    category: "категория",
    date: "24.10.2022",
    time: "16:00",
    address: "ул. Потолочного д. 9",
    title: "Заголовок",
    description:
      "Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.",
    count: "3",
    avatarLink: "https://i.pravatar.cc/300",
    avatarName: "example",
    recipientName: "Иванов Иван Иванович",
    recipientPhoneNumber: "+7(000) 000-00-00",
    handleClickPnoneButton: () => 1,
    handleClickMessageButton: () => 2,
    handleClickConfirmButton: () => 3,
    handleClickCloseButton: () => 4,
    handleClickEditButton: () => 5,
  },
};
