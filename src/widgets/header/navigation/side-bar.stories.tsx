import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { WriteMessageIcon } from 'shared/ui/icons/write-message-icon';
import { PersonIcon } from 'shared/ui/icons/person-icon';
import { LockIcon } from 'shared/ui/icons/lock-icon';
import { LocationIcon } from 'shared/ui/icons/location-icon';

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
        icon: <PersonIcon color="blue" />,
      },
      {
        title: 'Блог',
        to: '/blog',
        icon: <WriteMessageIcon color="blue" />,
      },
      {
        title: 'Политика конфеденциальности',
        to: '/policy',
        icon: <LockIcon color="blue" />,
      },
      {
        title: 'Контакты',
        to: '/contacts',
        icon: <LocationIcon color="blue" />,
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
