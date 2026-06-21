/* eslint-disable react-hooks/rules-of-hooks */
import { useUserServerSession } from "@/lib/core/sessionSever";
import DonorDashboard from "@/components/dashboard/DonorDashboard";
import AdminVolunteerDashboard from "@/components/dashboard/AdminVolunteerDashboard";

const DashboardOverViewPage = async () => {
  let user = null;
  let error = null;

  try {
    user = await useUserServerSession();
  } catch (err) {
    console.error("Failed to retrieve server session:", err);
    error = "Failed to load session criteria.";
  }

  // Error State Layout
  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-[1400px] bg-background text-foreground">
        <div className="p-4 text-sm text-danger bg-danger/10 border border-danger/20 rounded-xl font-medium">
          {error}
        </div>
      </div>
    );
  }

  // Unauthenticated State Layout
  if (!user) {
    return (
      <div className="container mx-auto p-6 max-w-[1400px] bg-background text-foreground">
        <div className="p-4 text-sm text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-xl font-medium">
          Please sign in to access your control panel dashboard view.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-8 max-w-[1400px] text-foreground select-none">
      {/* ================= PREMIUM HERO WELCOME SECTION ================= */}
      <div className="relative rounded-2xl p-6 sm:p-8 bg-secondary/40 border border-border/80 shadow-xl overflow-hidden">
        {/* Micro-Grid Pattern For Subtle High-Tech Aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

        {/* Ambient Glows Rooted In Crimson/Primary Theme */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[80px]" />

        <div className="relative z-10 space-y-2">
          <span className="text-[10px] uppercase font-black tracking-widest text-primary px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-full">
            Control Panel
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight capitalize font-heading text-foreground pt-1">
            Welcome back, {user.name || "Companion"}!
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium max-w-2xl leading-relaxed">
            {user.role === "admin" || user.role === "volunteer"
              ? `System Management Dashboard — Logged in securely as a verified ${user.role}.`
              : "Monitor your active lifelines, recent requests, and manage donation profiles smoothly."}
          </p>
        </div>
      </div>

      {/* ================= CONDITIONAL DASHBOARD RENDERING ================= */}
      <div className="relative z-10">
        {user.role === "admin" || user.role === "volunteer" ? (
          <AdminVolunteerDashboard user={user} />
        ) : (
          <DonorDashboard user={user} />
        )}
      </div>
    </div>
  );
};

export default DashboardOverViewPage;
