import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/api-config';

//нам не нужны отдельные функции fetch для использования RTK Query.
//Данный код генерирует нам 2 хука для получения данных: хук useGetUsersQuery, который принимает userRole,
//и возвращает массив юзеров с выбранной ролью, а также хук useUpdateUsersMutation,
//который принимает body и обновляет массив юзеров.
//Также есть хук useUpdateUsersMutation, который принимает объект
//с полями для обновления юзера

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getUsers: build.query({
      query: (userRole = '') => `users?role=${userRole}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    getUncomfirmed: build.query({
      query: (adminRole) =>
        `users?${
          adminRole === 'admin'
            ? 'role_ne=admin&role_ne=master'
            : 'role_ne=master'
        }`, //пока для теста просто отдаю список, далее надо будет добавить условие статуса необработанных
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    updateUsers: build.mutation({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'PATCH',
        body,
        // headers: 'Здесь будет JWT',
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUsersMutation,
  useGetUncomfirmedQuery,
} = usersApi;
