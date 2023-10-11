import {
  BLOG,
  CREATE_TASKS,
  INCREASE_SCORE,
  PROFILES_APPROVAL,
  READ,
  RESOLVE_CONFLICTS,
  SET_KEYS,
} from 'shared/libs/permissions-names';
import {
  ACTIVATED,
  CONFIRMED,
  UNCONFIRMED,
  VERIFIED,
} from 'shared/libs/statuses';

export type UserRole = 'recipient' | 'volunteer' | 'master' | 'admin';
type PermissionType = {
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
  id: number;
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
  permissions?: Array<PermissionType> | null;
  isActive: boolean;
};

export type UpdateUserInfo = {
  fullname: string;
  phone: string;
  address: string;
  avatar: null | FormData;
  id: number;
};
