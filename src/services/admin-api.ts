import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';
import { TaskConflict } from 'entities/task/types';
import { User } from 'entities/user/types';
import { getTokenAccess } from 'shared/libs/utils';
import { AdminPermission, TContacts } from 'shared/types/common.types';
import { TCreateAdminDto, TNewUserResponseDto } from './auth.types';

export const adminsApi = createApi({
  reducerPath: 'adminsApi',
  tagTypes: [
    'UsersByRole',
    'Unconfirmed',
    'Admins',
    'ConflictedTasks',
    'WorkTasks',
    'UserDetails',
  ],
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
    getUnconfirmedUsers: build.query<User[], string>({
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
    getAllAdmins: build.query<User[], string>({
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
    promoteUser: build.mutation<User, string>({
      query: (id) => {
        return {
          url: `admin/users/${id}/promote`,
          method: 'PUT',
        };
      },
      invalidatesTags: [{ type: 'Unconfirmed' }, { type: 'UsersByRole' }],
    }),
    getTasksConfilct: build.query<TaskConflict[], string | undefined>({
      query: () => {
        return {
          url: `/admin/tasks/conflicted`,
          method: 'GET',
        };
      },
      providesTags: (result, error) => {
        if (error) {
          console.log('🚀 ~ error:', error);
        }
        return result ? [{ type: 'ConflictedTasks' }] : [];
      },
    }),
    getTasksWorkConflict: build.query<TaskConflict[], string | undefined>({
      query: () => {
        return {
          url: `/admin/tasks/moderated`,
          method: 'GET',
        };
      },
      providesTags: (result, error) => {
        if (error) {
          console.log('🚀 ~ error:', error);
        }
        return result ? [{ type: 'WorkTasks' }] : [];
      },
    }),
    takeConflictTask: build.mutation<TaskConflict, string | undefined>({
      query: (id) => {
        return {
          url: `/admin/tasks/${id}/resolve`,
          method: 'PUT',
        };
      },
      invalidatesTags: [{ type: 'ConflictedTasks' }, { type: 'WorkTasks' }],
    }),
    resolСonflict: build.mutation<TaskConflict, string | undefined>({
      query: (id) => {
        return {
          url: `/admin/tasks/${id}/resolve/fulfill`,
          method: 'PUT',
        };
      },
      invalidatesTags: [
        { type: 'WorkTasks', id: 'LIST' },
        { type: 'WorkTasks' },
      ],
    }),
    updateContacts: build.mutation<TContacts, TContacts>({
      query: (contactsData) => ({
        url: `admin/contacts`,
        method: 'PATCH',
        body: contactsData,
      }),
    }),
    createNewAdmin: build.mutation<TNewUserResponseDto, TCreateAdminDto>({
      query: (dto) => ({
        url: 'admin/create',
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: [{ type: 'Admins' }],
    }),
    AddAdminPrivilegies: build.mutation<
      { _id: string; body: AdminPermission[] | undefined },
      any
    >({
      query: ({ _id, body }) => ({
        url: `admin/${_id}/privileges`,
        method: 'PATCH',
        body: { privileges: body },
      }),
    }),
    blockAdmin: build.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `admin/${id}/activate`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error) => {
        if (error) {
          console.log('🚀 ~ error:', error);
        }
        return result ? [{ type: 'Admins' }] : [];
      },
    }),
    blockUser: build.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `admin/users/${id}/confirm`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error) => {
        if (error) {
          console.log('🚀 ~ error:', error);
        }
        return result ? [{ type: 'Unconfirmed' }, { type: 'UsersByRole' }] : [];
      },
    }),
  }),
});

export const {
  useGetUserByRolesQuery,
  useGetUnconfirmedUsersQuery,
  useGetAllAdminsQuery,
  useConfirmUserMutation,
  usePromoteUserMutation,
  useGetTasksConfilctQuery,
  useGetTasksWorkConflictQuery,
  useTakeConflictTaskMutation,
  useResolСonflictMutation,
  useUpdateContactsMutation,
  useCreateNewAdminMutation,
  useAddAdminPrivilegiesMutation,
  useBlockAdminMutation,
  useBlockUserMutation,
} = adminsApi;
