import { TAuthRoutes } from '../services/auth.types';

const {
  VITE_MODE: NODE_ENV,
  VITE_APP_HOST_PROD: REACT_APP_HOST_PROD,
  VITE_APP_HOST_DEV: REACT_APP_HOST_DEV,
  VITE_APP_HOST_LOCAL: REACT_APP_HOST_LOCAL,
  VITE_APP_FRONT_PROD: REACT_APP_FRONT_PROD,
  VITE_APP_FRONT_DEV: REACT_APP_FRONT_DEV,
  VITE_APP_FRONT_LOCAL: REACT_APP_FRONT_LOCAL,
} = import.meta.env;

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
  adminRegister: 'admin/create',
  userRegister: '/auth/new',
  adminLogin: '/auth/administrative',
  checkToken: '/auth/token',
  mockLogin: '/auth/mock',
};

export const DEFAULT_HEADERS = {
  //eslint-disable-next-line @typescript-eslint/naming-convention
  'Content-Type': 'application/json',
};

export const LOCAL_STORAGE_TOKEN_ACCESS = 'token_access';
