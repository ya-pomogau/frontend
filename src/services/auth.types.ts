import { cbLink } from 'shared/libs/utils';
import { TPointGeoJSON, TUser } from '../entities/user/types';
import {
  AdminPermission,
  UserRole,
  UserStatus,
} from 'shared/types/common.types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';

export type TAuthRoutes = {
  userLogin: string;
  userRegister: string;
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

export type TVKUserResponseObj = {
  first_name: string;
  last_name: string;
  id: string;
  //  [key: string]: string;
};

export type TVKUserResponse = { response: Array<TVKUserResponseObj> };
export type TVKLoginResponseDto = {
  token: string | null;
  user?: TUser;
  vkUser: TVKUserResponse;
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
