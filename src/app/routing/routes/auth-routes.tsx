import { RouteObject } from 'react-router-dom';

import { Routes } from 'shared/config';
import { OnlyUnAuth } from '../protected-route';
import { RegisterPage } from 'pages/register';
import { LoginPage } from 'pages/login';
import { VKAuthPage } from 'pages/vk-auth';

export const authRoutes: RouteObject[] = [
  {
    path: Routes.REGISTER,
    element: <OnlyUnAuth component={<RegisterPage />} />,
  },
  {
    path: Routes.LOGIN,
    element: <OnlyUnAuth component={<LoginPage />} />,
  },
  {
    path: Routes.VK_AUTH,
    element: <OnlyUnAuth component={<VKAuthPage />} />,
  },
];
