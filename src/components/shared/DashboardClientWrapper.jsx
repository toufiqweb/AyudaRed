// components/DashboardClientWrapper.jsx
"use client";
import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";

export default function DashboardClientWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar handles its own mobile translation based on sidebarOpen */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {/* Navbar triggers the state change */}
      <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
    </>
  );
}
