import { TAuthRoutes } from '../services/auth.types';

const {
  NODE_ENV,
  REACT_APP_HOST_PROD,
  REACT_APP_HOST_DEV,
  REACT_APP_HOST_LOCAL,
} = process.env;

export const API_URL =
  (NODE_ENV === 'production'
    ? REACT_APP_HOST_PROD
    : REACT_APP_HOST_DEV ?? REACT_APP_HOST_LOCAL) ?? 'http://localhost:3001';

export const AUTH_ROUTES: TAuthRoutes = {
  userLogin: '/auth/vk',
  userRegister: '/auth/new',
  adminLogin: '/auth/admin',
};

export const DEFAULT_HEADERS = {
  /* eslint-disable @typescript-eslint/naming-convention */
  // Использование такого формата предписано RFC
  'Content-Type': 'application/json',
};
