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
        id: 15,
          title: 'Задача 15',
          category: {
            id: 2,
            name: 'Название категории 2',
            scope: 20,
          },
          date: '2023-05-31T17:30Z',
          description: 'Описание задачи 15 (срок задачи прошел, задача завершена и подтверждена)',
          completed: true,
          confirmed: true,
          recipient: {
            id: 4,
            fullname: 'Реципиентов Алексей Борисович',
            role: 'recipient',
            vk: 'https://vk.com/id123456789',
            avatar: 'https://tengu.ucoz.net/novosti/morio-higaonna.jpg',
            phone: '+7 (916) 123-45-67',
            address: 'ул. Нахимова, д. 9',
            coordinates: [59.941871, 30.223494],
            approved: true,
          },
          volunteer: {
            id: 7,
            fullname: 'Волонтеров Петр Петрович',
            role: 'volunteer',
            vk: 'https://vk.com/id123456789',
            avatar: 'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
            phone: '+7 (926) 123-45-67',
            address: 'ул. Кораблестроителей, 19к1',
            coordinates: [59.942575, 30.216757],
            approved: true,
            checked: true,
            keys: true,
            scores: 2500,
          },
          address: 'ул. Нахимова, д. 9',
          coordinates: [59.941871, 30.223494],
          chatId: 5678,
      },
      {
        id: 16,
          title: 'Достаточно длинное название для задачи 16',
          category: {
            id: 3,
            name: 'Название категории 3',
            scope: 30,
          },
          date: '2023-05-31T17:30Z',
          description: 'Описание',
          completed: false,
          confirmed: false,
          recipient: {
            id: 4,
            fullname: 'Реципиентов Алексей Борисович',
            role: 'recipient',
            vk: 'https://vk.com/id123456789',
            avatar: 'https://tengu.ucoz.net/novosti/morio-higaonna.jpg',
            phone: '+7 (916) 123-45-67',
            address: 'ул. Нахимова, д. 9',
            coordinates: [59.941871, 30.223494],
            approved: true,
          },
          volunteer: {
            id: 7,
            fullname: 'Волонтеров Петр Петрович',
            role: 'volunteer',
            vk: 'https://vk.com/id123456789',
            avatar: 'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
            phone: '+7 (926) 123-45-67',
            address: 'ул. Кораблестроителей, 19к1',
            coordinates: [59.942575, 30.216757],
            approved: true,
            checked: true,
            keys: true,
            scores: 2500,
          },
          address: 'ул. Нахимова, д. 9',
          coordinates: [59.941871, 30.223494],
          chatId: null,
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
        id: 15,
          title: 'Задача 15',
          category: {
            id: 2,
            name: 'Название категории 2',
            scope: 20,
          },
          date: '2023-05-31T17:30Z',
          description: 'Описание задачи 15 (срок задачи прошел, задача завершена и подтверждена)',
          completed: true,
          confirmed: true,
          recipient: {
            id: 4,
            fullname: 'Реципиентов Алексей Борисович',
            role: 'recipient',
            vk: 'https://vk.com/id123456789',
            avatar: 'https://tengu.ucoz.net/novosti/morio-higaonna.jpg',
            phone: '+7 (916) 123-45-67',
            address: 'ул. Нахимова, д. 9',
            coordinates: [59.941871, 30.223494],
            approved: true,
          },
          volunteer: {
            id: 7,
            fullname: 'Волонтеров Петр Петрович',
            role: 'volunteer',
            vk: 'https://vk.com/id123456789',
            avatar: 'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
            phone: '+7 (926) 123-45-67',
            address: 'ул. Кораблестроителей, 19к1',
            coordinates: [59.942575, 30.216757],
            approved: true,
            checked: true,
            keys: true,
            scores: 2500,
          },
          address: 'ул. Нахимова, д. 9',
          coordinates: [59.941871, 30.223494],
          chatId: 5678,
      },
      {
        id: 16,
          title: 'Достаточно длинное название для задачи 16',
          category: {
            id: 3,
            name: 'Название категории 3',
            scope: 30,
          },
          date: '2023-05-31T17:30Z',
          description: 'Описание',
          completed: false,
          confirmed: false,
          recipient: {
            id: 4,
            fullname: 'Реципиентов Алексей Борисович',
            role: 'recipient',
            vk: 'https://vk.com/id123456789',
            avatar: 'https://tengu.ucoz.net/novosti/morio-higaonna.jpg',
            phone: '+7 (916) 123-45-67',
            address: 'ул. Нахимова, д. 9',
            coordinates: [59.941871, 30.223494],
            approved: true,
          },
          volunteer: {
            id: 7,
            fullname: 'Волонтеров Петр Петрович',
            role: 'volunteer',
            vk: 'https://vk.com/id123456789',
            avatar: 'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
            phone: '+7 (926) 123-45-67',
            address: 'ул. Кораблестроителей, 19к1',
            coordinates: [59.942575, 30.216757],
            approved: true,
            checked: true,
            keys: true,
            scores: 2500,
          },
          address: 'ул. Нахимова, д. 9',
          coordinates: [59.941871, 30.223494],
          chatId: null,
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
