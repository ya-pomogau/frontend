import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withRouter } from 'storybook-addon-react-router-v6';

import { Filter } from '.';

/**
 * Настоящий элемент является фильтром для различных сущностей (например, заявок или пользователей).
 * Выбранные позиции при нажатии на кнопку "Принять" сохраняются в строку параметров URL страницы.
 * При новом открытии фильтра на основе строки параметров URL определяется состояние фильтра и
 * выбираются позиции, которые ранее установил пользователь.
 *
 * Фильтр зависит от роли пользователя, передаваемого через специальный пропс. В случае, если для
 * одной роли пользователя имеется несколько фильтров, то далее вид фильтра определяется строкой пути
 * в URL.
 */

const meta: Meta<typeof Filter> = {
  title: 'features/Filter',
  argTypes: {
    userRole: {
      description: 'Роль пользователя, который использует приложение.',
    },
    visible: {
      description:
        'Пропс, значение которого определяет видимость компонента Filter.',
    },
    changeVisible: {
      description: 'Функция, которая используется для закрытия фильтра.',
      action: 'close Filter and set state of Filter and Params',
    },
    position: {
      description:
        'Данные, используемые для позиционирования компонента, типа {top: number, right: number}. top - расстояние от верхней границы экрана просмотра до верхней границы компонента, right - от левой границы экрана просмотра до правой границы фильтра.',
    },
  },
  component: Filter,
  decorators: [withRouter],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AdminUsersSorting: Story = {
  args: {
    userRole: 'admin',
    visible: true,
    position: {
      top: 20,
      right: 1000,
    },
  },
  parameters: {
    reactRouter: {
      routePath: '/profile/admin/requests',
    },
  },
};

export const AdminApplicationSorting: Story = {
  args: {
    userRole: 'admin',
    visible: true,
    position: {
      top: 20,
      right: 1000,
    },
  },
  parameters: {
    reactRouter: {
      routePath: '/profile/admin/tasks/:recipientId',
      routeParams: { recipientId: '42' },
    },
  },
};

export const Recipient: Story = {
  args: {
    userRole: 'recipient',
    visible: true,
    position: {
      top: 20,
      right: 1000,
    },
  },
};

export const VolunteerMap: Story = {
  args: {
    userRole: 'volunteer',
    visible: true,
    position: {
      top: 20,
      right: 1000,
    },
  },
  parameters: {
    reactRouter: {
      routePath: '/profile/volunteer/map',
    },
  },
};

export const VolunteerActiveApplications: Story = {
  args: {
    userRole: 'volunteer',
    visible: true,
    position: {
      top: 20,
      right: 1000,
    },
  },
  parameters: {
    reactRouter: {
      routePath: '/profile/volunteer/active',
    },
  },
};

export const VolunteerCompletedApplications: Story = {
  args: {
    userRole: 'volunteer',
    visible: true,
    position: {
      top: 20,
      right: 1000,
    },
  },
  parameters: {
    reactRouter: {
      routePath: '/profile/volunteer/completed',
    },
  },
};
