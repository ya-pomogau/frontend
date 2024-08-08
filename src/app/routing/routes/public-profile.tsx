import { RouteObject } from 'react-router-dom';
import { Routes } from 'shared/config';

export const publicProfile: RouteObject = {
  path: Routes.PROFILE,
  lazy: async () => ({
    Component: (await import('app/layouts')).ProfileLayoutPublic,
  }),
  children: [
    {
      index: true,
      lazy: async () => ({
        Component: (await import('pages/unauth')).UnauthPage,
      }),
    },
  ],
};
