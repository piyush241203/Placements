import React from "react";
import { Route, Routes } from "react-router-dom";
import Colleges from "../GAdmin/Pages/Colleges";
import Sidebar from "../GAdmin/components/Sidebar";
import Dashboard from "../GAdmin/Pages/Dashboard";

function GAdminRoutes() {
  return (
    <div>
      <Routes>
        <Route
          path="/college"
          element={
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-[#A3B5C0] p-6 rounded-l-3xl">
                  <Colleges />
                </main>
              </div>
          }
        />
        <Route
          path="/dashboard"
          element={
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-[#A3B5C0] p-6 rounded-l-3xl">
                  <Dashboard />
                </main>
              </div>
          }
        />
      </Routes>
    </div>
  );
}

export default GAdminRoutes;
