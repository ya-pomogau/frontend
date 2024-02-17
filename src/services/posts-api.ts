import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';
import { PostProps } from 'shared/ui/post/Post';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getPosts: build.query<PostProps[], number>({
      query: (limit) => `posts?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    addPost: build.mutation<void, FormData>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
        formData: true,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    editPost: build.mutation<void, Partial<PostProps>>({
      query: (body) => ({
        url: `posts/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    deletePost: build.mutation<PostProps, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
} = postsApi;
