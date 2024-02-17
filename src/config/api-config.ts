import { TAuthRoutes } from '../services/auth.types';

const {
  NODE_ENV,
  REACT_APP_HOST_PROD,
  REACT_APP_HOST_DEV,
  REACT_APP_HOST_LOCAL,
  REACT_APP_FRONT_PROD,
  REACT_APP_FRONT_DEV,
  REACT_APP_FRONT_LOCAL,
} = process.env;

export const API_URL =
  NODE_ENV === 'production'
    ? REACT_APP_HOST_PROD
    : REACT_APP_HOST_DEV ?? REACT_APP_HOST_LOCAL;

export const FRONT_URL =
  NODE_ENV === 'production'
    ? REACT_APP_FRONT_PROD
    : REACT_APP_FRONT_DEV ?? REACT_APP_FRONT_LOCAL;

export const AUTH_ROUTES: TAuthRoutes = {
  userLogin: '/auth/vk',
  userRegister: '/auth/new',
  adminLogin: '/auth/administrative',
  checkToken: '/auth/token',
};

export const DEFAULT_HEADERS = {
  //eslint-disable-next-line @typescript-eslint/naming-convention
  'Content-Type': 'application/json',
};
