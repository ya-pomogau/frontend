export interface IMessage {
  messageId: number;
  userId: number;
  userAvatarLink: string;
  text: string;
  date: Date;
}

export interface IChatMateInfo {
  name: string;
  id: number;
  avatar: string;
  notifications?: number;
  phone?: string;
}

export interface IChatList {
  name: string;
  id: number;
  avatar: string;
  message: string;
  notifications: number;
  phone?: string;
}
