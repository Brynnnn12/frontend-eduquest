import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiSlice";

export const characterApi = createApi({
  reducerPath: "characterApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCharacter: builder.query({
      query: () => "/characters",
      transformResponse: (response) => response.data,
    }),
    updateCharacter: builder.mutation({
      query: (data) => ({
        url: "/characters",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetCharacterQuery, useUpdateCharacterMutation } =
  characterApi;
