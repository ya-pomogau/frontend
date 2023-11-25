import { TAuthRoutes } from '../services/auth.types';

const {
  NODE_ENV,
  REACT_APP_HOST_PROD,
  REACT_APP_HOST_DEV,
  REACT_APP_HOST_LOCAL,
} = process.env;

export const API_URL =
  NODE_ENV === 'production'
    ? REACT_APP_HOST_PROD
    : REACT_APP_HOST_DEV ?? REACT_APP_HOST_LOCAL;

export const AUTH_ROUTES: TAuthRoutes = {
  userLogin: '/auth/vk',
  userRegister: '/auth/new',
  adminLogin: '/auth/admin',
};

const contentType = 'Content-Type';

export const DEFAULT_HEADERS = {
  [contentType]: 'application/json',
};
