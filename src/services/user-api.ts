import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/api-config';

//нам не нужны отдельные функции fetch для использования RTK Query.
//Данный код генерирует нам 2 хука: хук useGetUsersQuery, который принимает userRole,
//и возвращает массив юзеров с выбранной ролью, а также хук useUpdateUsersMutation,
//который принимает body и обновляет массив юзеров

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
      query: () => 'users?isFailed=false', //пока для теста сделала такое значение
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
        url: 'users',
        method: 'POST',
        body,
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
