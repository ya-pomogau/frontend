import { cbLink } from 'shared/libs/utils';
import {
  TPointGeoJSON,
  TUser,
  TUserProfile,
  TVKUser,
} from '../entities/user/types';
import { UserRole } from 'shared/types/common.types';

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

export type TCreateUserDto = {
  profile: Partial<TUserProfile>;
  role: UserRole;
  vkId: string;
  location?: TPointGeoJSON;
};

export type TAdminLoginDto = {
  login: string;
  password: string;
};

export type TVKLoginResponseDto = {
  token: string | null;
  user: TUser | null;
  vk_user: TVKUser | null;
};

export type TNewUserResponseDto = {
  token: string;
  user: TUser;
};

export type TNewUserRequestDto = {
  profile: Partial<TUserProfile>;
  role: UserRole;
  vkId: string;
  location?: TPointGeoJSON;
};
