import type { Meta, StoryObj } from "@storybook/react";
import { TaskList } from ".";

const meta: Meta<typeof TaskList> = {
  title: "Entities/TaskList",
  component: TaskList,
  tags: ["autodocs"],

  argTypes: {
    tasks: {
      description:
        "массив отфильтрованных заявок, фильтрация по значению в объекте 'activeStatus' ",
    },
    extClassName: {
      description: "Дополнительный класс для контейнера компонента",
    },
    isStatusActive: {
      description: "пропс для рендера закрытых или активных заявок",
    },
    isMobile: {
      description: "признак мобильной версии",
    },
    handleClickPnoneButton: {
      description: "функция при клике на кнопку телефона",
    },
    handleClickMessageButton: {
      description: "функция при клике на кнопку сообщения",
    },
    handleClickConfirmButton: {
      description: "функция при клике на кнопку принятой заявки",
    },
    handleClickCloseButton: {
      description: "функция при клике на кнопку закрытия заявки",
    },
    handleClickEditButton: {
      description: "функция при клике на кнопку редактирования заявки",
    },
    handleClickAddTaskButton: {
      description: "функция при клике на кнопку создания заявки",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleActive: Story = {
  args: {
    tasks: [
      {
        category: {
          id: 1,
          name: "категория",
          scope: 10,
        },
        date: "24.10.2022",
        address: "ул. Потолочного д. 9",
        title: "Заголовок",
        description:
          "Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.",
        avatar: "https://i.pravatar.cc/300",
        avatarName: "example",
        recipientName: "Иванов Иван Иванович",
        recipientPhoneNumber: "+7(000) 000-00-00",
        activeStatus: true,
        confirmStatus: true,
      },
      {
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
        activeStatus: true,
        confirmStatus: false,
      },
    ],
    handleClickPnoneButton: () => console.log("кликнули на телефон"),
    handleClickMessageButton: () => console.log("кликнули на сообщение"),
    handleClickConfirmButton: () => console.log("кликнули на галочку"),
    handleClickCloseButton: () => console.log("кликнули на крестик"),
    handleClickEditButton: () => console.log("кликнули на карандаш"),
    handleClickAddTaskButton: () => console.log("кликнули на плюсик"),
    isMobile: false,
    isStatusActive: true,
  },
};

export const ExampleNotActive: Story = {
  args: {
    tasks: [
      {
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
        activeStatus: false,
        confirmStatus: true,
      },
      {
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
        activeStatus: false,
        confirmStatus: false,
      },
    ],
    handleClickPnoneButton: () => console.log("кликнули на телефон"),
    handleClickMessageButton: () => console.log("кликнули на сообщение"),
    isMobile: false,
    isStatusActive: false,
  },
};

export const ExampleEmptyActive: Story = {
  args: {
    tasks: [],
    handleClickAddTaskButton: () => console.log("кликнули на плюсик"),
    isMobile: false,
    isStatusActive: true,
  },
};
export const ExampleEmptyNotActive: Story = {
  args: {
    tasks: [],
    isMobile: false,
    isStatusActive: false,
  },
};
