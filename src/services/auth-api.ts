import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.kraev.nomoredomains.xyz',
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('auth_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'signin-admin',
        method: 'POST',
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
});

export const { useLoginMutation, useProtectedMutation } = authApi;
