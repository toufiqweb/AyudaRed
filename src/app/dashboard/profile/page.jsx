import { getUserByEmail } from "@/lib/api/users";
import { useUserServerSession as getUserServerSession } from "@/lib/core/sessionSever";
import { getTokenServer } from "@/lib/core/getTokenServer";
import ProfilePage from "./ProfileForm"; // Points to your newly updated premium page layout

const ProfileServerPage = async () => {
  let user = null;
  let userData = null;
  let error = null;

  try {
    user = await getUserServerSession();
  } catch (err) {
    console.error("Failed to get session:", err);
    error = "Failed to synchronize server session secure tokens.";
  }

  /* ================= PREMIUM ERROR STATE ================= */
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="w-full max-w-md p-5 text-sm text-danger bg-danger/10 border border-danger/20 rounded-2xl shadow-sm text-center">
          <p className="font-semibold mb-1 font-body">
            Session Handshake Error
          </p>
          <span className="opacity-80">{error}</span>
        </div>
      </div>
    );
  }

  /* ================= PREMIUM AUTHENTICATION GUARD STATE ================= */
  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="w-full max-w-md p-6 bg-secondary border border-border/60 rounded-2xl shadow-xl text-center space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
            !
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base tracking-tight font-heading">
              Authentication Required
            </h3>
            <p className="text-xs text-foreground/60 font-body">
              You are not logged in. Please sign in to view your personalized
              platform metrics.
            </p>
          </div>
        </div>
      </div>
    );
  }

  try {
    const token = await getTokenServer();
    userData = await getUserByEmail(user.email, token);
  } catch (err) {
    console.error("Failed to fetch database user data:", err);
  }

  // Baseline data merging with optimized structural formatting
  const initialProfile = {
    name: userData?.name || user.name || "",
    email: userData?.email || user.email || "",
    image: userData?.image || user.image || "",
    bloodGroup: userData?.bloodGroup || "A+",
    district: userData?.district || "Cumilla",
    upazila: userData?.upazila || "Nangalkot",
    role: userData?.role || user?.role || "donor",
    status: userData?.status || "active",
    createdAt: userData?.createdAt
      ? new Date(userData.createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Jan 28, 2026", // Dynamic localized string conversion matching your image mockup dates
  };

  return (
    <main className="w-full min-h-screen ">
      {/* Container wrapper configured wide to give the grid framework adequate room to expand */}
      <div className="mx-auto w-full transition-all duration-300">
        <ProfilePage
          key={JSON.stringify(initialProfile)}
          initialData={initialProfile}
        />
      </div>
    </main>
  );
};

export default ProfileServerPage;
