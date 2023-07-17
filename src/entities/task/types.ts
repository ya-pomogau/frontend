import { UserInfo } from 'entities/user/types';

export type Task = {
  id: number;
  title: string;
  category: {
    id: number;
    name: string;
    scope: number;
  };
  date: string;
  description: string;
  completed: boolean;
  confirmed: boolean;
  recipient: UserInfo;
  volunteer: UserInfo | null;
  address: string;
  coordinates: [number, number];
  chatId: number | null;
};
