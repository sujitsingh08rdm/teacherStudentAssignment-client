import React from "react";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex flex-col gap-2 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
