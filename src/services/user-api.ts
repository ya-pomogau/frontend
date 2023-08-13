import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/api-config';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getUser: build.query({
      query: (userId = '') => `users/${userId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: build.mutation({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
