import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  // TODO conflict
  tagTypes: ['Messages', 'Conflicts', 'hubConfict', 'workConflict'],
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
                type: 'hubConfict' as const,
                id,
              })),
              { type: 'hubConfict', id: 'LIST' },
            ]
          : [{ type: 'hubConfict', id: 'LIST' }],
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
      invalidatesTags: [{ type: 'hubConfict', id: 'LIST' }],
    }),
    // TODO на время показа, потом удалим
    getConflictAdmin: build.query({
      query: () => `hubConfict`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: 'hubConfict' as const,
                id,
              })),
              { type: 'hubConfict', id: 'LIST' },
            ]
          : [{ type: 'hubConfict', id: 'LIST' }],
    }),
    addConflictHub: build.mutation({
      query: (body) => ({
        url: 'addConflict',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'workConflict', id: 'LIST' }],
    }),
    deleteConflictHub: build.mutation({
      query: (id) => ({
        url: `hubConfict/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'hubConfict', id: 'LIST' }],
    }),
    getWorkConflict: build.query({
      query: () => `addConflict`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: 'workConflict' as const,
                id,
              })),
              { type: 'workConflict', id: 'LIST' },
            ]
          : [{ type: 'workConflict', id: 'LIST' }],
    }),
    deleteConflictWork: build.mutation({
      query: (id) => ({
        url: `addConflict/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'workConflict', id: 'LIST' }],
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
  useGetConflictAdminQuery,
  useAddConflictHubMutation,
  useGetWorkConflictQuery,
  useDeleteConflictHubMutation,
  useDeleteConflictWorkMutation,
} = messagesApi;
