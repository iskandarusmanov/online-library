import React from "react";
import AuthSideBar from "../pages/auth/AuthSideBar";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex ">
      <div className="w-[50%]">
        <Outlet />
      </div>

      <AuthSideBar />
    </div>
  );
}
