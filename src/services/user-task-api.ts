import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';
import { Task } from 'entities/task/types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { getTokenAccess } from '../shared/libs/utils';

export interface CreateTaskDto {
  categoryId: string;
  location: GeoCoordinates;
  date: Date | null;
  address: string;
  description: string;
}

export const userTasksApi = createApi({
  reducerPath: 'userTask',
  tagTypes: ['Task', 'TaskActive', 'TaskCompleted', 'TaskVirgin'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = getTokenAccess();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getTaskActive: build.query<Array<Task>, string>({
      query: (role) => {
        return {
          url: `${role}/tasks/${role === 'recipient' ? 'active' : 'accepted'}`,
          method: 'GET',
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
        return {
          url: `${role}/tasks/completed`,
          method: 'GET',
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
        return {
          url: `${role}/tasks/virgin?distance=100000&latitude=${latitude}&longitude=${longitude}`,
          method: 'GET',
        };
      },
      providesTags: (result, error) => {
        if (error) {
          console.error('Error occurred:', error);
        }
        return result
          ? 
            [{ type: 'TaskVirgin' }]
          : [];
      },
    }),
    getTask: build.query<Array<Task>, { latitude: number; longitude: number }>({
      query: (args) => {
        const { latitude, longitude } = args;
        return {
          url: `system/tasks/virgin?distance=100000&latitude=${latitude}&longitude=${longitude}`,
          method: 'GET',
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
      query: (dto) => {
        return {
          url: '/recipient/tasks',
          method: 'POST',
          body: dto,
        };
      },
      invalidatesTags: [{ type: 'TaskActive', id: 'recipient' }],
    }),
    responseTask: build.mutation<Task, string>({
      query: (id) => {
        return {
          url: `/volunteer/tasks/${id}/accept`,
          method: 'PUT',
        };
      },
      invalidatesTags: [{ type: 'TaskVirgin' }, { type: 'TaskActive' }],
    }),
    fulfillTask: build.mutation<Task, { role: string; id: string }>({
      query: (args) => {
        const { role, id } = args;
        return {
          url: `${role}/tasks/${id}/fulfill`,
          method: 'PUT',
        };
      },
      invalidatesTags: [{ type: 'TaskActive' }],
    }),
    rejectTask: build.mutation<Task, { role: string; id: string }>({
      query: (args) => {
        const { role, id } = args;
        return {
          url: `${role}/tasks/${id}/reject`,
          method: 'PUT',
        };
      },
      invalidatesTags: [{ type: 'TaskActive' }],
    }),
    cancelTask: build.mutation<Task, { id: string }>({
      query: ({ id }) => ({
        url: `recipient/tasks/${id}`,
        method: 'DELETE',
      }),
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
  useCancelTaskMutation,
} = userTasksApi;
