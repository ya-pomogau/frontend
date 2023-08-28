export interface IMessage {
  messageId: number;
  userId: number;
  userAvatarLink: string;
  text: string;
  date: Date;
}

export interface IChatMateInfo {
  name: string;
  userId: number;
  avatar: string;
  notifications?: number;
  phone?: string;
}

export interface IChat {
  chatId: string;
  name: string;
  userId: number;
  userAvatarLink: string;
  incomingMessage: string;
  notifications: number;
  phone: string;
}
