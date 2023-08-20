import { RouterProvider } from 'react-router-dom';

import { router } from './router';

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
