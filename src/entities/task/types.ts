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
  conflict?: boolean;
  recipient: UserInfo;
  volunteer: UserInfo | null;
  address: string;
  coordinates: [number, number];
  chat?: {
    id: number;
    unread?: number;
  };
};
