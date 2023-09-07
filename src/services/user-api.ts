import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/api-config';

//нам не нужны отдельные функции fetch для использования RTK Query.
//Данный код генерирует нам хуки для получения данных. Напрмиер, хук useGetUsersQuery принимает userRole
//и возвращает массив юзеров с выбранной ролью, а хук useUpdateUsersMutation,
//который принимает body, обновляет массив юзеров.

export const usersApi: any = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users', 'User'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => 'users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    getUserById: build.query({
      query: (userId) => `users/${userId}`,
      providesTags: ['User'],
    }),
    getUsers: build.query({
      query: (userRole = '') => `users?role=${userRole}`,
    }),
    getUncomfirmed: build.query({
      query: (adminRole) =>
        `users?${
          adminRole === 'admin'
            ? 'role_ne=admin&role_ne=master'
            : 'role_ne=master'
        }`, //пока для теста просто отдаю список без проверки статуса, далее надо будет добавить условие статуса необработанных
    }),
    updateUsers: build.mutation({
      query: (body) => ({
        url: body.file ? `users/avatar/${body.id}` : `users/${body.id}`,
        method: 'PATCH',
        body: body.file ? body.file : body,
        // headers: 'Здесь будет JWT',
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('getUserById', id, (draft: any) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useGetUsersQuery,
  useUpdateUsersMutation,
  useGetUncomfirmedQuery,
} = usersApi;
