// app/dashboard/layout.jsx

import DashboardClientWrapper from "@/components/shared/DashboardClientWrapper";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar (left column) + Navbar + content (right column) */}
      <DashboardClientWrapper>
        {/* Main Content Area - server-rendered children passed as slot */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-muted/20">
          {children}
        </main>
      </DashboardClientWrapper>
    </div>
  );
}
