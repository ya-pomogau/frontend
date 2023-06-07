export interface IUser {
  userAvatar: string;
  userId: number;
  userName: string;
  userPhoneNumber: string;
  info: {
    keys: number;
    completedTasks: number;
    score: number;
  };
}

export interface IRequestCard {
  requestCardId: string;
  user: IUser;
}
