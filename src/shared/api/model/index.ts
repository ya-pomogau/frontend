import { API_URL } from 'config/api-config';

import type { UpdateUserInfo, UserInfo } from 'entities/user/types';
import type { Task } from 'entities/task/types';

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

export const getAvailableTasks = async (): Promise<Task[]> => {
  try {
    const res = await fetch(`${API_URL}/tasks/available`);
    return await checkResponse(res);
  } catch (err) {
    // TODO Exception handling
    throw new Error('API exception');
  }
};

export const getActiveTasks = async (): Promise<Task[]> => {
  try {
    const res = await fetch(`${API_URL}/tasks/active`);
    return await checkResponse(res);
  } catch (err) {
    // TODO Exception handling
    throw new Error('API exception');
  }
};

export const getCompletedTasks = async (): Promise<Task[]> => {
  try {
    const res = await fetch(`${API_URL}/tasks/completed`);
    return await checkResponse(res);
  } catch (err) {
    // TODO Exception handling
    throw new Error('API exception');
  }
};

export const getAllCategories = async (): Promise<
  { id: number; name: string }[]
> => {
  try {
    const res = await fetch(`${API_URL}/category`);
    return await checkResponse(res);
  } catch (err) {
    // TODO Exception handling
    throw new Error('API exception');
  }
};

export const updateUser = async (body: UpdateUserInfo): Promise<UserInfo> => {
  try {
    const res = await fetch(`${API_URL}/users/${body.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        fullname: body.fullname,
        phone: body.phone,
        address: body.address,
      }),
    });
    return await checkResponse(res);
  } catch (err) {
    // TODO Exception handling
    throw new Error('API exception');
  }
};

export const uploadAvatar = async (body: FormData): Promise<UserInfo | []> => {
  try {
    const res = await fetch(`${API_URL}/users/avatar`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body,
    });
    return await checkResponse(res);
  } catch (err) {
    throw new Error('API exception');
  }
};
