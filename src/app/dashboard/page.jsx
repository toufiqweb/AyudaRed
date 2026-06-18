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

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="p-4 text-sm text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-xl">
          Please sign in to access your control panel dashboard view.
        </div>
      </div>
    );
  }

  // Common Header/Welcome Section for everyone
  return (
    <div className="container mx-auto p-2 sm:p-6 space-y-6 max-w-6xl">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-6 sm:p-8 text-white shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight capitalize">
          Welcome back, {user.name || "Companion"}! 🏠
        </h1>
        <p className="text-white/80 text-xs sm:text-sm mt-1">
          {user.role === "admin" || user.role === "volunteer"
            ? `System Management Dashboard — Logged in as ${user.role}`
            : "Monitor your active lifelines, recent requests, and manage donation profiles."}
        </p>
      </div>

      {/* Conditional Rendering Based on User Role */}
      {user.role === "admin" || user.role === "volunteer" ? (
        <AdminVolunteerDashboard user={user} />
      ) : (
        <DonorDashboard user={user} />
      )}
    </div>
  );
};

export default DashboardOverViewPage;
