export interface IMessage {
  userId: string;
  userAvatarLink: string;
  message: string;
  date: Date;
}

export interface IInterlocutorInfo {
  userId: string;
  userAvatarLink: string;
  name: string;
  phone?: string;
}
