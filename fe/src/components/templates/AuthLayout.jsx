import React from "react";
import { MaterialNav } from "../ui/MaterialNav";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <MaterialNav />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
