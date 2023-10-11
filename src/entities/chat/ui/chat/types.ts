export interface IMessage {
  id: number;
  userId: string;
  userAvatarLink: string;
  message: string;
  date: Date;
}

export interface IChatmateInfo {
  userId: string;
  userAvatarLink: string;
  name: string;
  phone?: string;
}
