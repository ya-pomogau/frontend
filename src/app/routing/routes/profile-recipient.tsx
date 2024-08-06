import { RouteObject } from 'react-router-dom';
import { Routes } from 'shared/config';

export const profileRecipient: RouteObject = {
  path: `${Routes.PROFILE_RECIPIENT.ROOT}`,
  lazy: async () => ({
    Component: (await import('app/layouts')).ProfileLayoutPrivate,
  }),
  children: [
    {
      index: true,
      lazy: async () => ({
        Component: (await import('pages/profile-active')).ProfileActivePage,
      }),
    },
    {
      path: `${Routes.PROFILE_RECIPIENT.COMPLETED}`,
      lazy: async () => ({
        Component: (await import('pages/profile-completed'))
          .ProfileCompletedPage,
      }),
    },
  ],
};
