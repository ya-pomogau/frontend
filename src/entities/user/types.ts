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
  role: string;
};

// export type UserInfo = {
//   id: string;
//   fullname: string;
//   role: UserRole | null;
//   status?: UserStatus;
//   vk: string;
//   avatar: string;
//   phone: string;
//   address: string;
//   coordinates: GeoCoordinates;
//   createdAt: string;
//   isHasKeys?: boolean;
//   scores?: number;
//   permissions?: Array<AdminPermission> | null;
//   isActive: boolean;
// };

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
// TODO: надо изменить
export type TUserProfile = {
  fullName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  avatar: string;
  address: string;
};
// TODO: надо изменить
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
  firstName: string;
  lastName: string;
  vkId: string;
};
// TODO: надо изменить
export type UpdateUserInfo = {
  name: string;
  phone: string;
  address: string;
  avatar: null | FormData;
  _id: string;
};
