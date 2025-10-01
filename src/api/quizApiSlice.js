import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiSlice";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Quiz"],
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: (params) => ({
        url: "/quizzes",
        params,
      }),
      providesTags: ["Quiz"],
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data.data; // 👈 Access the data array
        } else {
          throw new Error(response.message || "Failed to fetch quizzes");
        }
      },
    }),
    submitAnswers: builder.mutation({
      query: (data) => ({
        url: "/quizzes/submit-answers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quiz"],
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error(response.message || "Failed to submit answers");
        }
      },
    }),
    getHint: builder.mutation({
      query: ({ quizId, questionIndex }) => ({
        url: `/quizzes/${quizId}/hint`,
        method: "GET",
        params: questionIndex !== undefined ? { questionIndex } : undefined,
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error(response.message || "Failed to get hint");
        }
      },
    }),
    getSolution: builder.mutation({
      query: ({ quizId, questionIndex }) => ({
        url: `/quizzes/${quizId}/solution`,
        method: "GET",
        params: questionIndex !== undefined ? { questionIndex } : undefined,
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error(response.message || "Failed to get solution");
        }
      },
    }),
    updateQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Quiz"],
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error(response.message || "Failed to update quiz");
        }
      },
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error(response.message || "Failed to delete quiz");
        }
      },
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useSubmitAnswersMutation,
  useGetHintMutation,
  useGetSolutionMutation,
} = quizApi;
