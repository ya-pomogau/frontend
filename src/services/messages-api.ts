import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  tagTypes: ['Messages', 'Conflicts'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    // prepareHeaders: (headers) => {
    //   const token = sessionStorage.getItem('token');
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (build) => ({
    getMessage: build.query({
      query: () => `messages`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: 'Messages' as const,
                id,
              })),
              { type: 'Messages', id: 'LIST' },
            ]
          : [{ type: 'Messages', id: 'LIST' }],
    }),
    getSaveMessage: build.query({
      query: () => 'saveMessage',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: 'Messages' as const,
                id,
              })),
              { type: 'Messages', id: 'LIST' },
            ]
          : [{ type: 'Messages', id: 'LIST' }],
    }),
    addMessage: build.mutation({
      query: (body) => ({
        url: 'saveMessage',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
    getConflicts: build.query({
      query: () => 'conflicts',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: 'Conflicts' as const,
                id,
              })),
              { type: 'Conflicts', id: 'LIST' },
            ]
          : [{ type: 'Conflicts', id: 'LIST' }],
    }),
    deleteMessage: build.mutation({
      query: (id) => ({
        url: `messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
    deleteConflict: build.mutation({
      query: (id) => ({
        url: `conflicts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Conflicts', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetMessageQuery,
  useGetSaveMessageQuery,
  useAddMessageMutation,
  useGetConflictsQuery,
  useDeleteMessageMutation,
  useDeleteConflictMutation,
} = messagesApi;
