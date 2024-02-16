import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';
import { Task } from 'entities/task/types';

const token = localStorage.getItem('token');

export const userTasksApi = createApi({
  reducerPath: 'userTask',
  tagTypes: ['Task'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getTaskActive: build.query<Array<Task>, string>({
      query: (role) => {
        const headers = {
          //eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        };
        return {
          url: `${role}/tasks/${role === 'recipient' ? 'active' : 'accepted'}`,
          method: 'GET',
          headers,
        };
      },
      providesTags: (result, error, id) => {
        if (error) {
          console.error('Error occurred:', error);
        }
        return result ? [{ type: 'Task', id }] : [];
      },
    }),
    getTaskCompleted: build.query<Array<Task>, string>({
      query: (role) => {
        const headers = {
          //eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        };
        return {
          url: `${role}/tasks/completed`,
          method: 'GET',
          headers,
        };
      },
      providesTags: (result, error, id) => {
        if (error) {
          console.error('Error occurred:', error);
        }
        return result ? [{ type: 'Task', id }] : [];
      },
    }),
    getTaskVirgin: build.query<Array<Task>, [string, string, string]>({
      query: (args) => {
        const [role, latitude, longitude] = args;
        const headers = {
          //eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        };
        return {
          url: `${role}/tasks/virgin?distance=10000&latitude=${latitude}&longitude=${longitude}`,
          method: 'GET',
          headers,
        };
      },
      providesTags: (result, error, [role, latitude, longitude]) => {
        if (error) {
          console.error('Error occurred:', error);
        }
        return result
          ? [{ type: 'Task', id: `${role}-${latitude}-${longitude}` }]
          : [];
      },
    }),
    // createTask: build.mutation({
    // инвалидация тэгов
    // })
  }),
});
export const {
  useGetTaskActiveQuery,
  useGetTaskCompletedQuery,
  useGetTaskVirginQuery,
} = userTasksApi;
