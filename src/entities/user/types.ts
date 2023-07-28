export type UserRole = 'recipient' | 'volunteer' | 'master' | 'admin';
type PermissionType = {
  id: number;
  name:
    | 'read'
    | 'profiles approval'
    | 'create tasks'
    | 'set keys'
    | 'resolve conflicts'
    | 'blog'
    | 'increase score';
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
  | 'uncomfirmed'
  | 'confirmed'
  | 'activated'
  | 'verified'
  | 'deactivated';

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
  completed?: number | null;
  permissions?: Array<PermissionType> | null;
};
