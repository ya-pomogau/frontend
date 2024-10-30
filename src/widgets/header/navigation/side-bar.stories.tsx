import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { Icon } from 'shared/ui';

import { SideBar } from './index';

const meta: Meta<typeof SideBar> = {
  title: 'widgets/SideBar',
  component: SideBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    links: [
      {
        title: 'Личный кабинет',
        to: '/profile',
        icon: <Icon icon="PersonIcon" color="blue" />,
      },
      {
        title: 'Блог',
        to: '/blog',
        icon: <Icon icon="WriteMessageIcon" color="blue" />,
      },
      {
        title: 'Политика конфиденциальности',
        to: '/policy',
        icon: <Icon icon="LockIcon" color="blue" />,
      },
      {
        title: 'Контакты',
        to: '/contacts',
        icon: <Icon icon="LocationIcon" color="blue" />,
      },
    ],
    position: {
      ulflexDirection: 'column',
      ulgap: 30,
      element: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        gap: 5,
        textAlign: 'right',
      },
    },
  },
};
