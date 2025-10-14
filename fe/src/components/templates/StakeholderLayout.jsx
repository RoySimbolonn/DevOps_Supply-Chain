import { useState, useEffect } from "react";
import NavigationStakeholder from "./NavigationStakeholder";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { FaRegCircleUser } from "react-icons/fa6";

const StakeholderLayout = () => {
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
      <NavigationStakeholder />

      <div className="w-full bg-blue-gray-50 lg:ml-80">
        <div className="fixed left-0 right-0 top-0 z-50 hidden items-center justify-between bg-HIJAU px-8 py-4 lg:ml-80 lg:flex">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-white drop-shadow-lg">
              Stakeholder
            </h1>
          </div>
          <div className="flex items-center justify-cente text-white">
            <div className="justify-items-end">
              <h1 className="text-lg font-bold">{username}</h1>
              <h3 className="text-sm text-gray-300">{email}</h3>
            </div>
            <div>
              <FaRegCircleUser className="ml-2 h-11 w-12" />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default StakeholderLayout;
