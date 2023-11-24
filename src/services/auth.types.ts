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

// TODO: Удалить лишнее по типу авторизации
export type TVKLoginRequestDto = {
  vk_id?: string;
  code?: string;
  silentToken: string;
  redirect_uri: string; // TODO: заменить на константу с роутом переадресации
};

export type TVKLoginResponseDto = {
  token: string | null;
  user: TUser | null;
  vk_user: TVKUser | null;
};
