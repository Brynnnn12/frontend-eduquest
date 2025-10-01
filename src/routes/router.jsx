import { createBrowserRouter } from "react-router-dom";
import { protectedLoader, publicLoader } from "../utils/authLoaders";

// Impor Layouts dan Pages
import MissionDetail from "../pages/mission/MissionDetail";
import RegisterPage from "../pages/auth/RegisterPage";

import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import QuizPage from "../pages/quiz/QuizPage";
import BadgeManagement from "../features/badges/components/BadgeManagement";
import CharacterProfile from "../features/characters/components/CharacterProfile";
import MissionManagement from "../features/missions/components/MissionManagement";
import QuizManagement from "../features/quiz/components/QuizManagement";
import ProfilePage from "../features/profile/components/ProfilePage";
import ProgressManagement from "../features/progress/components/ProgressManagement";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import DashboardHome from "../pages/dashboard/DashboardHome";

const router = createBrowserRouter([
  // Rute Publik
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/mission/:missionId",
    element: <MissionDetail />,
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
      {
        path: "character",
        element: <CharacterProfile />,
      },
      {
        path: "missions",
        element: <MissionManagement />,
      },
      {
        path: "quiz",
        element: <QuizManagement />,
      },
      {
        path: "quiz/:quizId",
        element: <QuizPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "progress",
        element: <ProgressManagement />,
      },
      // {
      //   path: "settings",
      //   element: <SettingsPage />,
      // }
    ],
  },
]);

export default router;
