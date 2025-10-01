import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiSlice";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error(response.message || "Login failed");
        }
      },
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error(response.message || "Register failed");
        }
      },
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error(response.message || "Refresh token failed");
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error(response.message || "Forgot password failed");
        }
      },
    }),
    resetPassword: builder.mutation({
      query: ({ token, password, passwordConfirmation }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { token, password, passwordConfirmation },
      }),
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error(response.message || "Reset password failed");
        }
      },
    }),
    verifyEmail: builder.query({
      query: (token) => `/auth/verify-email?token=${token}`,
      transformResponse: (response) => {
        if (response.status === "success") {
          return response.data;
        } else {
          throw new Error(response.message || "Verify email failed");
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailQuery,
} = authApiSlice;
