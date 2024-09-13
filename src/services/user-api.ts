import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';
import { User, UpdateUserInfo } from 'entities/user/types';
import { getTokenAccess } from 'shared/libs/utils';
import { userRole as userRoles } from 'shared/types/common.types';

//нам не нужны отдельные функции fetch для использования RTK Query.
//Данный код генерирует нам хуки для получения данных. Напрмиер, хук useGetUsersQuery принимает userRole
//и возвращает массив юзеров с выбранной ролью, а хук useUpdateUsersMutation,
//который принимает body, обновляет массив юзеров.

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users', 'User'],
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
    getAllUsers: build.query({
      query: () => 'users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }: any) => ({
                type: 'Users' as const,
                _id,
              })),
              { type: 'Users', _id: 'LIST' },
            ]
          : [{ type: 'Users', _id: 'LIST' }],
    }),
    getUserById: build.query<User, string>({
      query: (userId) => `users/${userId}`,
      providesTags: ['User'],
    }),
    getUsers: build.query({
      query: (userRole = '') => `users?role=${userRole}`,
    }),
    getUncomfirmed: build.query({
      query: (adminRole) =>
        `users?${
          adminRole === userRoles.ADMIN
            ? 'role_ne=admin&role_ne=master'
            : 'role_ne=master'
        }`, //пока для теста просто отдаю список без проверки статуса, далее надо будет добавить условие статуса необработанных
    }),
    updateUsers: build.mutation({
      query: (body) => ({
        url: body.file ? `users/avatar/${body._id}` : `users/${body._id}`,
        method: 'PATCH',
        body: body.file ? body.file : body,
        // headers: 'Здесь будет JWT',
      }),
      async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('getUserById', _id, (draft: any) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: () => [{ type: 'User', _id: 'LIST' }],
    }),
    // Данные о пользователе полученные от БД
    getProfile: build.query({
      query: () => ({
        url: `/me`,
        method: 'GET',
      }),
    }),
    updateUserProfile: build.mutation({
      query: (body: Omit<UpdateUserInfo, '_id'>) => ({
        url: `/system/profile`,
        method: 'PATCH',
        body: body,
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useGetUsersQuery,
  useUpdateUsersMutation,
  useGetUncomfirmedQuery,
  useGetProfileQuery,
  useUpdateUserProfileMutation,
} = usersApi;
