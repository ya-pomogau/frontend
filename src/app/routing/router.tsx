import { createBrowserRouter } from 'react-router-dom';

import { Routes } from 'shared/config';
import {
  profileAdmin,
  profileRecipient,
  profileVolonteer,
  publicProfile,
  publicRoutes,
} from './routes';
import { authRoutes } from './routes/auth-routes';

export const router = createBrowserRouter([
  {
    path: Routes.ROOT,
    lazy: async () => ({
      Component: (await import('app/layouts')).RootLayout,
    }),
    children: [
      publicProfile,
      profileRecipient,
      profileVolonteer,
      profileAdmin,
      ...publicRoutes,
      ...authRoutes,
    ],
  },
]);
