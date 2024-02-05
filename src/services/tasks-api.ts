import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';
import { Taskschema } from 'entities/task/types';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['Taskschema', 'CompletedTasks'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getTasks: build.query<Array<Taskschema>, any>({
      query: (limit = '') => 'tasks/available',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: 'Taskschema' as const,
                id,
              })),
              { type: 'Taskschema', id: 'LIST' },
            ]
          : [{ type: 'Taskschema', id: 'LIST' }],
    }),
    updateTask: build.mutation({
      query: (body) => ({
        url: `tasks/avaliable/${body.id}`,
        method: 'PATCH',
        body,
        // headers: 'Здесь будет JWT',
      }),
      invalidatesTags: [{ type: 'Taskschema', id: 'LIST' }],
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
