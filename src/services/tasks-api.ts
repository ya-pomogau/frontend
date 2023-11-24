import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';
import { Task } from 'entities/task/types';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['Tasks', 'CompletedTasks'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getTasks: build.query<Array<Task>, any>({
      query: (limit = '') => 'tasks/available',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: 'Tasks' as const, id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    updateTask: build.mutation({
      query: (body) => ({
        url: `tasks/avaliable/${body.id}`,
        method: 'PATCH',
        body,
        // headers: 'Здесь будет JWT',
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    getTasksByStatus: build.query({
      query: (status) => ({
        url: `tasks/${status}`,
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useUpdateTaskMutation,
  useGetTasksByStatusQuery,
} = tasksApi;
