export type TRole = "consumer" | "volunteer" | "master" | "admin";

export interface IUserInfo {
  name: string;
  role: TRole;
  id: number;
  phoneNumber: string;
  address: string;
  avatarLink: string;
  score?: number;
  virtualKey?: boolean;
  completedTasksCount?: number;
  tasksCount?: number;
  description: string;
}
