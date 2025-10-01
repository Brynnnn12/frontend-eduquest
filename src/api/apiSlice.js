import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../features/auth/slices/authSlice";
import { setToken } from "./tokenHelpers";

// Base query asli
export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token || localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Wrapper di sekitar baseQuery untuk menangani re-autentikasi
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    // Try to refresh token
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh-token",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const newToken = refreshResult.data.data.accessToken;
          const newRefreshToken = refreshResult.data.data.refreshToken;
          const user = refreshResult.data.data.user;

          // Store new tokens
          setToken(newToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          localStorage.setItem(
            "user",
            typeof user === "string" ? user : user?.name || ""
          );

          // Update state
          api.dispatch(
            setCredentials({
              user: typeof user === "string" ? user : user?.name || "",
              token: newToken,
            })
          );

          // Retry the original request
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refresh failed, logout
          api.dispatch(logout());
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
        // Refresh failed, logout
        api.dispatch(logout());
      }
    } else {
      // No refresh token, logout
      api.dispatch(logout());
    }
  }

  return result;
};
