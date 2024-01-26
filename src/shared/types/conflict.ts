import { IMessage } from 'entities/chat/ui/chat/types';

export interface IChatmateInfo {
  name: string;
  phone?: string;
  userAvatarLink: string;
  userId: string;
}

export interface IConflictUser {
  specialization: 'valanter' | 'recipient';
  option: 'conflict' | 'confirm';
  name: string;
  image: string;
  id: string;
}

export interface IInfoConflict {
  date: string;
  time: string;
  address: string;
  message: string;
}

export interface IConflict {
  id: number;
  chatmateInfo: IChatmateInfo;
  messages: {
    date: Date;
    id: number;
    message: string;
    userAvatarLink: string;
    userId: string;
  }[];
  conflict?: IConflictUser[];
  infoConflict?: IInfoConflict;
}

export interface IUsers {
  id: number;
  chatmateInfo: IChatmateInfo;
  messages: IMessage[];
}

export interface IInfoConflicts {
  id: number;
  users: IUsers[];
  infoConflict: IInfoConflict;
  conflict: IConflictUser[];
}
