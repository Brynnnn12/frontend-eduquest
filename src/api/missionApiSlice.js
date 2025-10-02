import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiSlice";

export const missionApi = createApi({
  reducerPath: "missionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Mission"],
  endpoints: (builder) => ({
    getMissions: builder.query({
      query: (params) => ({
        url: "/missions",
        params,
      }),
      providesTags: ["Mission"],
      transformResponse: (response) => {
        if (response.status === "success") {
          return {
            data: response.data.data, // 👈 Access the data array
            meta: response.data.meta, // 👈 Include meta information
          };
        } else {
          throw new Error(response.message || "Failed to fetch missions");
        }
      },
    }),
    getMissionById: builder.query({
      query: (id) => ({
        url: `/missions/${id}`,
      }),
      providesTags: ["Mission"],
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error(response.message || "Failed to fetch mission");
        }
      },
    }),
    createMission: builder.mutation({
      query: (data) => ({
        url: "/missions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Mission"],
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error(response.message || "Failed to create mission");
        }
      },
    }),
    updateMission: builder.mutation({
      query: ({ id, data }) => ({
        url: `/missions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Mission"],
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error(response.message || "Failed to update mission");
        }
      },
    }),
    deleteMission: builder.mutation({
      query: (id) => ({
        url: `/missions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Mission"],
    }),
  }),
});

export const {
  useGetMissionsQuery,
  useGetMissionByIdQuery,
  useCreateMissionMutation,
  useUpdateMissionMutation,
  useDeleteMissionMutation,
} = missionApi;
