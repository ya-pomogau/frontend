import type { Meta, StoryObj } from '@storybook/react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { withRouter } from 'storybook-addon-react-router-v6';

import { PageSubMenu } from 'widgets/page-sub-menu/components/page-sub-menu/page-sub-menu';
import { PageSubMenuLink } from 'widgets/page-sub-menu/components/page-sub-menu-link/page-sub-menu-link';

const mockedUnauthorizedState = {
  role: null,
  data: null,
  isLoading: false,
  isFailed: false,
};

const Mockstore = ({ initialState, children }: Record<any, any>) => (
  <Provider
    store={configureStore({
      reducer: {
        user: createSlice({
          name: 'tasks',
          initialState,
          reducers: {},
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta: Meta<typeof PageSubMenu> = {
  title: 'widgets/Submenu',
  component: PageSubMenu,
  tags: ['autodocs'],
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SubmenuDefault: Story = {
  argTypes: {
    links: {
      description:
        'Слот для элементов PageSubMenuLink. Оборачиваем в <></> и вставляем PageSubMenuLink.',
    },
  },
  render: ({ ...args }) => (
    <Mockstore initialState={mockedUnauthorizedState}>
      <PageSubMenu
        {...args}
        links={
          <>
            <PageSubMenuLink to="/" text="Волонтеры" />
            <PageSubMenuLink to="/recipients" text="Реципиенты" />
            <PageSubMenuLink to="/admins" text="Админы" notifications={10} />
          </>
        }
      />
    </Mockstore>
  ),
};
