import { API_URL } from "config/api-config";

import type { UserInfo } from "entities/user/types";
import type { Task } from "entities/task/types";

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : Promise.reject(res);

export const getAllUsers = async (): Promise<UserInfo[]> => {
  try {
    const res = await fetch(`${API_URL}/users`);
    return await checkResponse(res);
  } catch (err) {
    // TODO Exception handling
    throw new Error('API exception');
  }
};

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const res = await fetch(`${API_URL}/tasks`);
    return await checkResponse(res);
  } catch (err) {
    // TODO Exception handling
    throw new Error('API exception');
  }
};
