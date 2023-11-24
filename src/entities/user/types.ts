/* import {
  BLOG,
  CREATE_TASKS,
  INCREASE_SCORE,
  PROFILES_APPROVAL,
  READ,
  RESOLVE_CONFLICTS,
  SET_KEYS,
} from 'shared/libs/permissions-names'; */
import {
  ACTIVATED,
  CONFIRMED,
  UNCONFIRMED,
  VERIFIED,
} from 'shared/libs/statuses';
import { AdminPermission } from '../../shared/types/common.types';
import { PointGeoJSONInterface } from 'shared/types/point-geojson.types';

export type UserRole = 'recipient' | 'volunteer' | 'master' | 'admin';
/*type PermissionType = {
  id: number;
  name:
    | typeof READ
    | typeof PROFILES_APPROVAL
    | typeof CREATE_TASKS
    | typeof SET_KEYS
    | typeof RESOLVE_CONFLICTS
    | typeof BLOG
    | typeof INCREASE_SCORE;
};
*/
// пример для всех перечисленных в брифе прав
// [
//   { id: 0, name: 'read' },
//   { id: 1, name: 'profiles approval' },
//   { id: 2, name: 'create tasks' },
//   { id: 3, name: 'set keys' },
//   { id: 4, name: 'resolve conflicts' },
//   { id: 5, name: 'blog' },
//   { id: 7, name: 'increase score' },
// ]

type StatusType =
  | typeof UNCONFIRMED
  | typeof CONFIRMED
  | typeof ACTIVATED
  | typeof VERIFIED;

export type UserInfo = {
  id: string;
  fullname: string;
  role: UserRole | null;
  status: StatusType | null;
  vk: string;
  avatar: string;
  phone: string;
  address: string;
  coordinates: number[];
  createdAt: string;
  keys?: number | null;
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
  keys?: boolean;
  scores?: number;
  permissions?: Array<AdminPermission> | null;
  isActive: boolean;
  vkId: string;
  isRoot: boolean;
  login: string;
};

// TODO: Изменить в соответствии с реальным ответом
export type TVKUser = {
  fullName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  avatar: string;
  address: string;
  vkId: string;
};

export type UpdateUserInfo = {
  fullname: string;
  phone: string;
  address: string;
  avatar: null | FormData;
  id: number;
};
