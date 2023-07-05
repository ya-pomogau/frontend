import { TUserInfo } from "entities/user/types";

export type TUserRole = "recipient" | "volunteer" | "master" | "admin";

export type TTask = {
  id: number;
  title: string;
  category: {
    id: number;
    name: string;
    scope: number;
  }
  date: string;
  description: string;
  completed: boolean;
  confirmed: boolean;
  recipient: TUserInfo;
  volunteer: TUserInfo | null;
  address: string;
  coordinates: number;
  chatId: number | null;
};
