// app/dashboard/layout.jsx

import DashboardClientWrapper from "@/components/shared/DashboardClientWrapper";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* This client component handles both the navbar and sidebar state */}
      <DashboardClientWrapper />

      {/* Main Content Area remains completely server-rendered */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Empty spacing element to push content below the fixed header height */}
        <div className="h-16 shrink-0" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
}
