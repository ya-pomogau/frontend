import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';
import { User } from 'entities/user/types';
import { getTokenAccess } from 'shared/libs/utils';

export const adminsApi = createApi({
  reducerPath: 'adminsApi',
  tagTypes: ['UsersByRole', 'Unconfirmed', 'Admins'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = getTokenAccess();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUserByRoles: build.query<User[], string>({
      query: (role) => {
        return {
          url: `admin/users/${role}`,
          method: 'GET',
        };
      },
      providesTags: (result, error) => {
        if (error) {
          console.log('🚀 ~ error:', error);
        }
        return result ? [{ type: 'UsersByRole' }] : [];
      },
    }),
    getUnconfirmedUsers: build.query<User[], any>({
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
    getAllAdmins: build.query<User[], any>({
      query: () => {
        return {
          url: 'admin/all',
          method: 'GET',
        };
      },
      providesTags: (result, error) => {
        if (error) {
          console.log('🚀 ~ error:', error);
        }
        return result ? [{ type: 'Admins' }] : [];
      },
    }),
    confirmUser: build.mutation<User, string>({
      query: (id) => {
        return {
          url: `admin/users/${id}/confirm`,
          method: 'PUT',
        };
      },
      invalidatesTags: [{ type: 'Unconfirmed' }, { type: 'UsersByRole' }],
    }),
  }),
});

export const {
  useGetUserByRolesQuery,
  useGetUnconfirmedUsersQuery,
  useGetAllAdminsQuery,
  useConfirmUserMutation,
} = adminsApi;
