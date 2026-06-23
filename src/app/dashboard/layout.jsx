// app/dashboard/layout.jsx
import { redirect } from "next/navigation";
import { useUserServerSession } from "@/lib/core/sessionSever";
import DashboardClientWrapper from "@/components/shared/DashboardClientWrapper";

export default async function DashboardLayout({ children }) {
  const user = await useUserServerSession();

  if (!user) {
    redirect("/sign-in");
  }

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
