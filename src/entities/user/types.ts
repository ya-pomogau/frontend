import {
  AdminPermission,
  UserRole,
  UserStatus,
} from '../../shared/types/common.types';
import {
  GeoCoordinates,
  PointGeoJSONInterface,
} from 'shared/types/point-geojson.types';

export type UserProfile = {
  name: string;
  phone: string;
  avatar: string;
  address: string;
  vkId: string;
  role: UserRole;
  _id: string;
};

export type User = {
  _id: string;
  name: string;
  phone: string;
  avatar: string;
  address: string;
  vkId: string;
  role: UserRole;
  score?: number;
  status?: UserStatus;
  location?: GeoCoordinates;
  keys?: boolean;
  permissions?: AdminPermission[];
  login?: string;
  password?: string;
  isRoot?: boolean;
  isActive?: boolean;
};

export type TPointGeoJSON = PointGeoJSONInterface;

export type TUser = {
  _id: string;
  name: string;
  phone: string;
  avatar: string;
  address: string;
  vkId: string;
  role: UserRole;
  score?: number;
  status?: UserStatus;
  location?: TPointGeoJSON;
  keys?: boolean;
  permissions?: AdminPermission[];
  login?: string;
  password?: string;
  isRoot?: boolean;
  isActive?: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type TVKUser = {
  email: string;
  first_name: string;
  last_name: string;
  id: string;
  photo_max_orig: string;
};
// TODO: надо изменить
export type UpdateUserInfo = {
  name: string;
  phone: string;
  address: string;
  avatar: null | FormData;
  _id: string;
};
