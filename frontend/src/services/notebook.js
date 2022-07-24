import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const notebookApi = createApi({
  reducerPath: 'notebookApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Category', 'Notes'],
  endpoints: builder => ({
    login: builder.mutation({
      query: data => {
        return {
          url: `/auth`,
          method: 'POST',
          body: data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      },
    }),

    register: builder.mutation({
      query: data => {
        return {
          url: `/register`,
          method: 'POST',
          body: data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      },
    }),

    addCategory: builder.mutation({
      query: data => {
        return {
          url: `/category`,
          method: 'POST',
          body: data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      },
      invalidatesTags: ['Category'],
    }),

    categories: builder.query({
      query: () => '/category',
      providesTags: ['Category'],
    }),

    notes: builder.query({
      query: category => `/notes?category=${category}`,
      providesTags: ['Notes'],
    }),

    note: builder.query({
      query: id => `/notes?note=${id}`,
      providesTags: ['Notes'],
    }),

    updateNote: builder.mutation({
      query: data => {
        return {
          url: `/notes`,
          method: 'PUT',
          body: data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      },
      invalidatesTags: ['Notes'],
    }),

    addNote: builder.mutation({
      query: data => {
        return {
          url: `/notes`,
          method: 'POST',
          body: data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      },
      invalidatesTags: ['Notes'],
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useCategoriesQuery,
  useAddCategoryMutation,
  useNotesQuery,
  useNoteQuery,
  useUpdateNoteMutation,
  useAddNoteMutation,
} = notebookApi
