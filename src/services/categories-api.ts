import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';
import { Category } from 'entities/task/types';
import { getTokenAccess } from 'shared/libs/utils';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
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
  tagTypes: ['Category'],
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      query: () => 'system/categories',
    }),
    updatePoints: build.mutation<
      Category,
      { data: ({ id: string; points: number } | null)[] }
    >({
      query: (points) => ({
        url: `admin/categories`,
        method: 'PATCH',
        body: points,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useUpdatePointsMutation } = categoriesApi;
