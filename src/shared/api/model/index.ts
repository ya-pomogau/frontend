import { API_URL } from "config/api-config";
import { TUserInfo } from "entities/user/types";

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : Promise.reject(res);

export const getAllUsers = async (): Promise<TUserInfo[]> => {
  try {
    const res = await fetch(`${API_URL}/users`);
    return await checkResponse(res);
  } catch (err) {
    // TODO Exception handling
    throw new Error('API exception');
  }
};

// TODO Add type for Task entity
export const getAllTasks = async (): Promise<any[]> => {
  try {
    const res = await fetch(`${API_URL}/tasks`);
    return await checkResponse(res);
  } catch (err) {
    // TODO Exception handling
    throw new Error('API exception');
  }
};
