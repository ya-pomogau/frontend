export type TRole = "admin" | "recipient" | "volunteer";

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
}
