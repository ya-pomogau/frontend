import {
  ACTIVATED,
  CONFIRMED,
  UNCONFIRMED,
  VERIFIED,
} from 'shared/libs/statuses';
import { AdminPermission, UserRole } from '../../shared/types/common.types';
import {
  GeoCoordinates,
  PointGeoJSONInterface,
} from 'shared/types/point-geojson.types';

type StatusType =
  | typeof UNCONFIRMED
  | typeof CONFIRMED
  | typeof ACTIVATED
  | typeof VERIFIED;

export type UserProfile = {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  address: string;
};

export type UserInfo = {
  id: string;
  fullname: string;
  role: UserRole | null;
  status: StatusType | null;
  vk: string;
  avatar: string;
  phone: string;
  address: string;
  coordinates: GeoCoordinates;
  createdAt: string;
  isHasKeys?: boolean;
  scores?: number;
  permissions?: Array<AdminPermission> | null;
  isActive: boolean;
};

export type TPointGeoJSON = PointGeoJSONInterface;

export type TUserProfile = {
  fullName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  avatar: string;
  address: string;
};

export type TUser = {
  _id: string;
  profile: TUserProfile;
  location: TPointGeoJSON;
  role: UserRole;
  status: StatusType;
  createdAt: Date | string;
  updatedAt: Date | string;
  isHasKeys?: boolean;
  scores?: number;
  permissions?: Array<AdminPermission> | null;
  isActive: boolean;
  vkId: string;
  isRoot: boolean;
  login: string;
};

export type TVKUser = {
  firstName: string;
  lastName: string;
  vkId: string;
};

export type UpdateUserInfo = {
  fullname: string;
  phone: string;
  address: string;
  avatar: null | FormData;
  id: string;
};
