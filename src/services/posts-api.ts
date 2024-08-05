import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'config/api-config';
import { PostProps } from 'shared/ui/post/Post';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getPosts: build.query<PostProps[], number>({
      query: () => `system/posts`, // ?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Posts' as const, _id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    addPost: build.mutation<void, Partial<PostProps>>({
      query: (body) => ({
        headers: {
          //eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token_access'),
        },
        url: 'admin/blog',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    editPost: build.mutation<
      { title: string; text: string; _id: string },
      Partial<PostProps>
    >({
      query: (body) => ({
        headers: {
          //eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token_access'),
        },
        url: `admin/blog/${body._id}`,
        method: 'PATCH',
        body: { title: body.title, text: body.text },
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    deletePost: build.mutation<PostProps, string>({
      query: (id) => ({
        headers: {
          //eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token_access'),
        },
        url: `admin/blog/${id}`,
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
