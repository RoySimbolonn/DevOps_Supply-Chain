import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "./authStore";
import { jwtDecode } from "jwt-decode"; // Pastikan Anda mengimpor jwtDecode

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.getToken());
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      setIsRedirecting(true); // Set state untuk melakukan redirect
    }
  }, [token]);

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp < Date.now() / 1000; // Cek apakah token kadaluarsa
    } catch (error) {
      return true; // Jika ada error, anggap token kadaluarsa
    }
  };

  if (isRedirecting || !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children; // Jika tidak ada redirect, tampilkan children
};

export default ProtectedRoute;
