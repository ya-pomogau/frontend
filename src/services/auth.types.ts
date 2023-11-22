import { cbLink } from 'shared/libs/utils';
import { TUser, TVKUser } from '../entities/user/types';

export type TAuthRoutes = {
  userLogin: string;
  userRegister: string;
  adminLogin: string;
};

export interface TypedResponse<T = Record<string, unknown>> extends Response {
  json<P = T>(): Promise<P>;
}

export type ResponseDto = {
  [key: string]: unknown;
};
export type ErrorDto = {
  message: string;
  httpStatusCode: number;
  [key: string]: unknown;
};

export type TVKLoginRequestDto = {
  code: string;
  state?: string;
  redirectUrl: string;
};

export type TVKLoginResponseDto = {
  token: string | null;
  user: TUser | null;
  vk_user: TVKUser | null;
};
