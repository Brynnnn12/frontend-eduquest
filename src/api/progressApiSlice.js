import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiSlice";

export const progressApi = createApi({
  reducerPath: "progressApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Progress"],
  endpoints: (builder) => ({
    getProgresses: builder.query({
      query: (params) => ({
        url: "/progresses",
        params,
      }),
      providesTags: ["Progress"],
      transformResponse: (response) => response.data,
    }),
    deleteProgress: builder.mutation({
      query: (id) => ({
        url: `/progresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Progress"],
    }),
  }),
});

export const { useGetProgressesQuery, useDeleteProgressMutation } = progressApi;
