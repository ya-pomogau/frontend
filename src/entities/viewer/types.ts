export type TUserRole = "consumer" | "volunteer" | "master" | "admin";

export type TUserInfo = {
  name: string;
  role: TUserRole;
  id: number;
  phoneNumber: string;
  address: string;
  avatarLink: string;
  score?: number;
  virtualKey?: boolean;
  completedTasksCount?: number;
  tasksCount?: number;
  description: string;
};
