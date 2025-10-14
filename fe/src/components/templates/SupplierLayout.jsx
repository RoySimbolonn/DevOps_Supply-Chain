import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import NavigationSupplier from "./NavigationSupplier";
import { FaRegCircleUser } from "react-icons/fa6";

const SupplierLayout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserFromToken = () => {
      try {
        const token = Cookies.get("access_token");
        if (token) {
          const decoded = jwtDecode(token);
          setUser(decoded);
        } else {
          console.log("Token tidak ditemukan");
        }
      } catch (error) {
        console.error("Gagal mendekode token:", error.message);
      }
    };

    fetchUserFromToken();
  }, []);

  const username = user?.username ?? "Loading....";
  const email = user?.email;
  return (
    <div className="w-full lg:flex">
      <NavigationSupplier />

      <div className="w-full bg-blue-gray-50 lg:ml-80">
        <div className="fixed left-0 right-0 top-0 z-50 hidden items-center justify-between bg-HIJAU px-8 py-4 text-white lg:ml-80 lg:flex">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold drop-shadow-lg">Supplier</h1>
          </div>
          <div className="flex justify-center items-center">
            <div className="justify-items-end">
              <h1 className="text-lg font-bold">{username}</h1>
              <h3 className="text-sm text-gray-300">{email}</h3>
            </div>
            <div>
              <FaRegCircleUser className="h-11 w-12 ml-2"/>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SupplierLayout;
