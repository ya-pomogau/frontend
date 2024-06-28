import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';
import { Category } from 'entities/task/types';
import { getTokenAccess } from 'shared/libs/utils';
import { TPoints } from 'shared/types/common.types';

type CategoryRequest = {
  accessLevel: number;
  points: number;
  title: string;
};

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
    getCategoryById: build.query<Category, string>({
      query: (id) => `system/categories/${id}`,
    }),
    addCategory: build.mutation<Category, CategoryRequest>({
      query: (newCategory) => ({
        url: 'admin/category',
        method: 'POST',
        body: newCategory,
      }),
    }),
    //Добавить прав хватает, а внести изменения нет
    updateCategory: build.mutation<
      Category,
      { id: string; category: CategoryRequest }
    >({
      query: ({ id, category }) => ({
        url: `admin/categories/${id}`,
        method: 'PATCH',
        body: category,
      }),
    }),
    //TODO На бэке есть метод сервиса updatePoints, но в отсутствует соответствующая ручка (url написан предполагаемый)
    updatePoints: build.mutation<Category, TPoints<string>>({
      query: (points) => ({
        //url и метод написаны предполагаемые, изменить после добавления ручки
        url: `admin/categories/points`,
        method: 'PATCH',
        body: points,
      }),
    }),
    //Сервер выдает 500 ошибку, не может найти по id
    deleteCategory: build.mutation<void, string>({
      query: (id) => ({
        url: `admin/categories/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useUpdatePointsMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
