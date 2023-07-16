import type { Meta, StoryObj } from '@storybook/react';
import YandexMap from '.';

const meta = {
  title: 'uikit/YandexMap',
  component: YandexMap,
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      description: 'Обработчик кнопки Откликнуться',
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
        id: 12,
        title: 'Выгулять собаку (новая задача)',
        category: {
          id: 2,
          name: 'Название категории 2',
          scope: 20,
        },
        date: '2023-07-10T19:30Z',
        description:
          'Заболел и совсем нет сил даже ходить по квартире. Почти неделю собаку выгуливали соседи, но в пятницу они не смогут. Помогите, пожалуйста!',
        completed: false,
        confirmed: false,
        recipient: {
          id: 5,
          fullname: 'Реципиентов Игорь Витальевич',
          role: 'recipient',
          vk: 'https://vk.com/id123456789',
          avatar:
            'https://w0.peakpx.com/wallpaper/216/581/,HD-wallpaper-jean-claude-van-damme-hand-face-man-actor.jpg',
          phone: '+7 (916) 123-45-67',
          address: 'ул. Наличная, 28/16В',
          coordinates: [59.941335, 30.227995],
          approved: true,
        },
        volunteer: null,
        address: 'ул. Наличная, 28/16В',
        coordinates: [59.941335, 30.227995],
        chatId: null,
      },
      {
        id: 24,
        title: 'Задача 24',
        category: {
          id: 5,
          name: 'Название категории 5',
          scope: 50,
        },
        date: '2023-07-07T07:00Z',
        description: 'Описание задачи 24',
        completed: false,
        confirmed: false,
        recipient: {
          id: 6,
          fullname: 'Реципиентов Иван Николаевич',
          role: 'recipient',
          vk: 'https://vk.com/id123456789',
          avatar: 'https://i.ytimg.com/vi/IeelNKvu65A/hqdefault.jpg',
          phone: '+7 (916) 123-45-67',
          address: 'переулок Каховского, 3',
          coordinates: [59.95252, 30.243239],
          approved: true,
        },
        volunteer: null,
        address: 'переулок Каховского, 3',
        coordinates: [59.95252, 30.243239],
        chatId: null,
      },
    ],
  },
};
