import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';
import { UpdateUserInfo } from 'entities/user/types';
import { getTokenAccess } from 'shared/libs/utils';

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
    getAdminUserById: build.query({
      query: (userId) => `admin/users/${userId}`,
    }),
    getAdminUserTasksById: build.query({
      query: (userId) => `admin/users/${userId}/tasks`,
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
  useGetAdminUserByIdQuery,
  useGetAdminUserTasksByIdQuery,
  useUpdateUserProfileMutation,
} = usersApi;
