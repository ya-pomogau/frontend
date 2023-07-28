export type UserRole = 'recipient' | 'volunteer' | 'master' | 'admin';
type PermissionType = { id: number; name: string };
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
