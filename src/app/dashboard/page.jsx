import { useUserServerSession } from "@/lib/core/sessionSever";
import DashboardDonorHomePage from "@/components/dashboard/DashboardDonorHomePage";

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
          Please sign in to access your donor control panel dashboard view.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-6xl">
      <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-8 text-white shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Welcome back, {user.name || "Donor Companion"}! 🏠
        </h1>
        <p className="text-white/80 text-sm mt-1">
          Monitor your active lifelines, recent requests, and manage donation
          profiles.
        </p>
      </div>

      <DashboardDonorHomePage user={user} />
    </div>
  );
};

export default DashboardOverViewPage;
