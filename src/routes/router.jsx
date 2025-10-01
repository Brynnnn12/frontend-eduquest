import { createBrowserRouter } from "react-router-dom";
import { protectedLoader, publicLoader } from "../utils/authLoaders";

// Impor Layouts dan Pages
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import DashboardHome from "../pages/dashboard/DashboardHome";
// ...impor halaman lain
import BadgeManagement from "../features/badges/components/BadgeManagement";

const router = createBrowserRouter([
  // Rute Publik
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: publicLoader, // Jika sudah login, tendang ke dashboard
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: publicLoader, // Lindungi juga halaman register
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    loader: publicLoader,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
    loader: publicLoader,
  },
  {
    path: "/verify-email",
    element: <VerifyEmailPage />,
    loader: publicLoader,
  },
  // Rute Privat / Terlindungi
  {
    path: "/dashboard",
    element: <DashboardPage />, // Ini bertindak sebagai layout
    loader: protectedLoader, // Loader ini melindungi SEMUA rute anaknya
    children: [
      {
        path: "", // Halaman default untuk /dashboard
        element: <DashboardHome />,
      },
      {
        path: "badges",
        element: <BadgeManagement />,
      },
      // {
      //   path: "profile",
      //   element: <ProfilePage />,
      // },
      // {
      //   path: "settings",
      //   element: <SettingsPage />,
      // }
    ],
  },
]);

export default router;
