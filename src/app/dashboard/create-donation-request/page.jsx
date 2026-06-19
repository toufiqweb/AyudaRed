/* eslint-disable react-hooks/rules-of-hooks */
import { useUserServerSession } from "@/lib/core/sessionSever";
import { getUserByEmail } from "@/lib/api/users";
import CreateRequestForm from "./CreateRequestForm";

const CreateDonationRequestPage = async () => {
  let user = null;
  let dbUser = null;
  let error = null;

  try {
    user = await useUserServerSession();

    if (user?.email) {
      // Check the user status from your Express backend using shared API configuration
      dbUser = await getUserByEmail(user.email);
    }
  } catch (err) {
    console.error("Authorization check failure:", err);
    error = "Failed to load safety authentication checks.";
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <div className="p-4 text-sm text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-xl">
          Please sign in to access the creation workspace.
        </div>
      </div>
    );
  }

  // 💡 Blocked users cannot create donation requests
  if (dbUser?.status === "blocked") {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <div className="p-5 border border-rose-200 bg-rose-50 text-rose-700 rounded-2xl space-y-2 shadow-sm">
          <h2 className="text-base font-bold">Account Restricted 🚫</h2>
          <p className="text-sm opacity-90">
            Your account status is currently marked as inactive or blocked. You
            are restricted from posting new donation requests.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <CreateRequestForm user={user} />
    </div>
  );
};

export default CreateDonationRequestPage;
