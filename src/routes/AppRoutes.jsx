import { RouterProvider } from "react-router-dom";
import router from "./router.jsx"; // Impor konfigurasi router dari file terpisah

const AppRoute = () => {
  return <RouterProvider router={router} />;
};

export default AppRoute;
