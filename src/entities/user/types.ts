export type TUserRole = "recipient" | "volunteer" | "master" | "admin";

export type TUserInfo = {
  id: number;
  fullname: string;
  role: TUserRole | null;
  vk: string;
  avatar: string;
  phone: string;
  address: string;
  coordinates: number[];
  approved: boolean;
  checked: boolean;
  keys?: boolean;
  adminStatus: number;
  scores: number | null;
  completed: number | null;
};
