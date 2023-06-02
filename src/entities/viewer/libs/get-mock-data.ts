import { IUserInfo } from "../types";

export const getMockData = (): IUserInfo => ({
  name: "Иванов Иван Иванович",
  role: "volunteer",
  id: 112233,
  phoneNumber: "+7(000)000-00-00",
  address: "Ул. Потолочного д. 3",
  avatarLink: "https://i.pravatar.cc/300",
  score: 2500,
  virtualKey: true,
  completedTasksCount: 150,
  tasksCount: 5,
});
