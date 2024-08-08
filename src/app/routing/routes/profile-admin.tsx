import { RequestsPage } from 'pages/requests';
import { TasksProfilePage } from 'pages/tasks-profile';
import { RouteObject } from 'react-router-dom';
import { Routes } from 'shared/config';
import { Tabs } from 'shared/types/common.types';

export const profileAdmin: RouteObject = {
  path: `${Routes.PROFILE_ADMIN.ROOT}`,
  lazy: async () => ({
    Component: (await import('app/layouts')).ProfileLayoutPrivate,
  }),
  children: [
    {
      index: true,
      element: <RequestsPage incomeTab={Tabs.VOLUNTEERS} />,
    },
    {
      path: `${Routes.PROFILE_ADMIN.STATISTICS}/applications`,
      lazy: async () => ({
        Component: (await import('pages/application-statistics'))
          .ApplicationsStatisticsPage,
      }),
    },
    {
      path: `${Routes.PROFILE_ADMIN.STATISTICS}/users`,
      lazy: async () => ({
        Component: (await import('pages/users-statistics')).UsersStatisticsPage,
      }),
    },
    {
      path: `${Routes.PROFILE_ADMIN.TASKS}/recipients`,
      element: <TasksProfilePage incomeTab={Tabs.RECIPIENTS} />,
    },
  ],
};
