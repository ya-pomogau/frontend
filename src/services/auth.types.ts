import { Interface } from 'readline';
import { TPointGeoJSON, TUser } from '../entities/user/types';
import { UserRole } from 'shared/types/common.types';

export type TAuthRoutes = {
  userLogin: string;
  userRegister: string;
  adminRegister: string;
  adminLogin: string;
  checkToken: string;
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
  name: string;
  phone: string;
  address: string;
  avatar?: string;
  role: UserRole;
  vkId: string;
  location: TPointGeoJSON;
};

export type TAdminLoginDto = {
  login: string;
  password: string;
};

export type TCreateAdminDto = Omit<TCreateUserDto, 'location' | 'role'> & {
  login: string;
  password: string;
};

export type TVKUserResponseObj = {
  first_name: string;
  last_name: string;
  id: string;
  email: string;
  photo_max_orig: string;
};

export type TVKLoginResponseDto = {
  token: string | null;
  user?: TUser;
  vkUser: TVKUserResponseObj;
};

export type TNewUserResponseDto = {
  token: string;
  user: TUser;
};

export type TNewUserRequestDto = {
  name: string;
  phone: string;
  address: string;
  avatar?: string;
  role: UserRole;
  vkId: string;
  location: TPointGeoJSON;
};
