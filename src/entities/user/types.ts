export type TUserRole = "consumer" | "volunteer" | "master" | "admin";

export type TUserInfo = {
  fullname: string;
  role: TUserRole;
  id: number;
  phoneNumber: string;
  address: string;
  avatar: string;
  score?: number;
  virtualKey?: boolean;
  completedTasksCount?: number;
  tasksCount?: number;
  description: string;
};
