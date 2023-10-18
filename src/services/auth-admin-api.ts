import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// сейчас одновременно в проекте описаны запросы на моковый и живой сервер.
// Когда бек будет полностью готов,
// можно будет использовать в baseUrl единую переменную API_URL
export const authAdminApi = createApi({
  reducerPath: 'authAdminApi',
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
    getMe: builder.query({
      query: () => 'users/own',
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authAdminApi;
