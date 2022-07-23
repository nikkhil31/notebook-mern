import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const notebookApi = createApi({
  reducerPath: 'notebookApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),

  endpoints: builder => ({
    login: builder.mutation({
      query: data => {
        return {
          url: `auth`,
          method: 'POST',
          body: data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      },
    }),
  }),
})

export const { useLoginMutation } = notebookApi
