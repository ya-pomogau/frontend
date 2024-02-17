import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';
import { User } from 'entities/user/types';

// TODO удалить _TOKEN
console.log('🚀 ~ API_URL:', API_URL);

export const adminsApi = createApi({
  reducerPath: 'adminsApi',
  tagTypes: ['Unconfirmed'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      // TODO заменить _TOKEN на token
      if (token) {
        console.log('🚀 ~ token:', token);
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUserByRoles: build.query({
      query: (role) => {
        return {
          url: `admin/users/${role}`,
          method: 'GET',
        };
      },
    }),
    getUnconfirmedUsers: build.query({
      query: () => {
        return {
          url: 'admin/users/unconfirmed',
          method: 'GET',
        };
      },
      providesTags: (result, error) => {
        if (error) {
          console.log('🚀 ~ error:', error);
        }
        return result ? [{ type: 'Unconfirmed' }] : [];
      },
    }),
    getAllAdmins: build.query({
      query: () => {
        return {
          url: 'admin/all',
          method: 'GET',
        };
      },
    }),
    confirmUser: build.mutation<User, string>({
      query: (id) => {
        return {
          url: `admin/users/${id}/confirm`,
          method: 'PUT',
        };
      },
      invalidatesTags: [{ type: 'Unconfirmed' }],
    }),
  }),
});

export const {
  useGetUserByRolesQuery,
  useGetAllAdminsQuery,
  useConfirmUserMutation,
} = adminsApi;
