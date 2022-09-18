import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface CommentState {
  [key: string]: number | string | undefined;
  id?: number;
  profile_url: string;
  author: string;
  content: string;
  createdAt?: string;
}

export interface QueryType {
  [key: string]: string | undefined;
  _page?: string;
  _limit?: string;
  _order?: 'desc' | 'asc';
  _sort?: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getComments: builder.query<CommentState[], QueryType>({
      query: (params) => {
        return {
          url: '/comments',
          params,
        };
      },
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'Comments' as const, id })), 'Comments'] : ['Comments'],
    }),
    getCommentById: builder.query<CommentState, void>({
      query: (commentId) => `/comments/${commentId}`,
    }),
    addNewComment: builder.mutation<CommentState, Omit<CommentState, 'id'>>({
      query: (newComment) => ({
        url: '/comments',
        method: 'POST',
        body: newComment,
      }),
      invalidatesTags: ['Comments'],
    }),
    updateCommentById: builder.mutation<CommentState, Partial<CommentState> & Pick<CommentState, 'id'>>({
      query: ({ id: commentId, ...newComment }) => ({
        url: `/comments/${commentId}`,
        method: 'PUT',
        body: newComment,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Comments', id }],
    }),
    deleteCommentById: builder.mutation<CommentState, Pick<CommentState, 'id'>>({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Comments', id }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentByIdQuery,
  useAddNewCommentMutation,
  useUpdateCommentByIdMutation,
  useDeleteCommentByIdMutation,
} = apiSlice;
