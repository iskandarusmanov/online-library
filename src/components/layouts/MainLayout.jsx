import React from "react";
import Navbar from "../UI/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <Navbar />

      <div>
        <Outlet />
      </div>
    </div>
  );
}
