// components/DashboardClientWrapper.jsx
"use client";
import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";

export default function DashboardClientWrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Left Column: Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Right Column: Navbar on top, page content below */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
        {children}
      </div>
    </>
  );
}

