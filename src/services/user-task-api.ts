import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';
import { Task } from 'entities/task/types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';

interface CreateTaskDto {
  categoryId: string;
  location: GeoCoordinates;
  date: Date | null;
  address: string;
  description: string;
}
const token = localStorage.getItem('token');

export const userTasksApi = createApi({
  reducerPath: 'userTask',
  tagTypes: ['Task', 'TaskActive', 'TaskCompleted', 'TaskVirgin'],
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
        return result ? [{ type: 'TaskActive', id }] : [];
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
        return result ? [{ type: 'TaskCompleted', id }] : [];
      },
    }),
    getTaskVirgin: build.query<Array<Task>, [string, number, number]>({
      query: (args) => {
        const [role, latitude, longitude] = args;
        const headers = {
          //eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        };
        return {
          url: `${role}/tasks/virgin?distance=100000&latitude=${latitude}&longitude=${longitude}`,
          method: 'GET',
          headers,
        };
      },
      providesTags: (result, error, [role, latitude, longitude]) => {
        if (error) {
          console.error('Error occurred:', error);
        }
        return result
          ? // ? [{ type: 'Task', id: `${role}-${latitude}-${longitude}` }]
            [{ type: 'TaskVirgin' }]
          : [];
      },
    }),
    getTask: build.query<Array<Task>, { latitude: number; longitude: number }>({
      query: (args) => {
        const { latitude, longitude } = args;
        const headers = {
          //eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        };
        return {
          url: `system/tasks/virgin?distance=100000&latitude=${latitude}&longitude=${longitude}`,
          method: 'GET',
          headers,
        };
      },
      providesTags: (result, error) => {
        if (error) {
          console.error('Error occurred:', error);
        }
        return result ? [{ type: 'Task' }] : [];
      },
    }),
    createTask: build.mutation<Task, CreateTaskDto>({
      query: (dto) => ({
        url: '/recipient/tasks',
        method: 'POST',
        headers: {
          //eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: dto,
      }),
      // указываем какие данные надо перезапросить при выполнении запроса
      invalidatesTags: [{ type: 'TaskActive', id: 'recipient' }],
    }),
    responseTask: build.mutation<Task, string>({
      query: (id) => ({
        url: `/volunteer/tasks/${id}/accept`,
        method: 'PUT',
        headers: {
          //eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }),
      // указываем какие данные надо перезапросить при выполнении запроса
      invalidatesTags: [{ type: 'TaskVirgin' }],
    }),
    fulfillTask: build.mutation<Task, { role: string; id: string }>({
      query: (args) => {
        const { role, id } = args;
        const headers = {
          //eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        };
        return {
          url: `${role}/tasks/${id}/fulfill`,
          method: 'PUT',
          headers,
        };
      },
      // указываем какие данные надо перезапросить при выполнении запроса
      invalidatesTags: [{ type: 'TaskActive' }],
    }),
    rejectTask: build.mutation<Task, { role: string; id: string }>({
      query: (args) => {
        const { role, id } = args;
        const headers = {
          //eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        };
        return {
          url: `${role}/tasks/${id}/reject`,
          method: 'PUT',
          headers,
        };
      },
      // указываем какие данные надо перезапросить при выполнении запроса
      invalidatesTags: [{ type: 'TaskActive' }],
    }),
    deleteTask: build.mutation<Task, { role: string; id: string }>({
      query: (args) => {
        const { role, id } = args;
        const headers = {
          //eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        };
        return {
          url: `${role}/tasks/${id}/`,
          method: 'DELETE',
          headers,
        };
      },
      // указываем какие данные надо перезапросить при выполнении запроса
      invalidatesTags: [{ type: 'TaskActive' }],
    }),
  }),
});
export const {
  useGetTaskActiveQuery,
  useGetTaskCompletedQuery,
  useGetTaskVirginQuery,
  useCreateTaskMutation,
  useResponseTaskMutation,
  useFulfillTaskMutation,
  useRejectTaskMutation,
  useGetTaskQuery,
  useDeleteTaskMutation,
} = userTasksApi;
