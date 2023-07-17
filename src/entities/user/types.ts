export type UserRole = 'recipient' | 'volunteer' | 'master' | 'admin';

export type UserInfo = {
  id: number;
  fullname: string;
  role: UserRole | null;
  vk: string;
  avatar: string;
  phone: string;
  address: string;
  coordinates: number[];
  approved: boolean;
  checked?: boolean;
  keys?: boolean;
  adminStatus?: number;
  scores?: number | null;
};
