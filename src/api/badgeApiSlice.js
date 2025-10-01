import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiSlice";

export const badgeApiSlice = createApi({
  reducerPath: "badgeApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Badge"],
  endpoints: (builder) => ({
    getBadges: builder.query({
      query: (params) => ({
        url: "/badges",
        params,
      }),
      providesTags: ["Badge"],
    }),
    createBadge: builder.mutation({
      query: (formData) => ({
        url: "/badges",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Badge"],
    }),
    updateBadge: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/badges/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Badge"],
    }),
    deleteBadge: builder.mutation({
      query: (id) => ({
        url: `/badges/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Badge"],
    }),
  }),
});

export const {
  useGetBadgesQuery,
  useCreateBadgeMutation,
  useUpdateBadgeMutation,
  useDeleteBadgeMutation,
} = badgeApiSlice;
