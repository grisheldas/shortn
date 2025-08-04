import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <main className="min-h-screen px-10 sm:px-20 py-5">
        <Header />
        <Outlet />
      </main>

      <div className="p-10 text-center bg-gray-900 mt-10">
        Made with 💖 by Shelda
      </div>
    </div>
  );
}

export default AppLayout;
