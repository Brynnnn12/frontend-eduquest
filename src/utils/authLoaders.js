import { redirect } from "react-router-dom";
import { store } from "../store/store"; // Impor store Redux Anda

// Loader untuk melindungi rute privat
export const protectedLoader = () => {
  const { token } = store.getState().auth;
  if (!token ) {
    // Jika tidak ada token sama token expired atau salah, tendang ke halaman login
    return redirect("/login");
  }
  return null; // Izinkan akses
};

// Loader untuk rute publik (agar tidak bisa diakses jika sudah login)
export const publicLoader = () => {
  const { token } = store.getState().auth;
  if (token) {
    // Jika ada token, tendang ke dashboard
    return redirect("/dashboard");
  }
  return null; // Izinkan akses
};
