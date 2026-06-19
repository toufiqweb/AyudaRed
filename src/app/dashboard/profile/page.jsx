/* eslint-disable react-hooks/rules-of-hooks */
import { getUserByEmail } from "@/lib/api/users";
import { useUserServerSession } from "@/lib/core/sessionSever";
import ProfileForm from "./ProfileForm";

const ProfilePage = async () => {
  let user = null;
  let userData = null;
  let error = null;

  try {
    user = await useUserServerSession();
  } catch (err) {
    console.error("Failed to get session:", err);
    error = "Failed to load session.";
  }

  if (error) {
    return (
      <div className="container mx-auto pt-20 p-6 max-w-2xl">
        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto pt-20 p-6 max-w-2xl">
        <div className="p-4 text-sm text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-xl">
          You are not logged in. Please sign in to view your profile.
        </div>
      </div>
    );
  }

  try {
    userData = await getUserByEmail(user.email);
  } catch (err) {
    console.error("Failed to fetch database user data:", err);
  }

  // Combine Better-Auth baseline session with your strict MongoDB fields layout
  const initialProfile = {
    name: userData?.name || user.name || "",
    email: userData?.email || user.email || "",
    image: userData?.image || user.image || "",
    bloodGroup: userData?.bloodGroup || "", // Explicitly maps your "A+" key format
    district: userData?.district || "", // Explicitly maps your "Cumilla" string
    upazila: userData?.upazila || "", // Explicitly maps your "Nangalkot" string
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <ProfileForm initialData={initialProfile} />
    </div>
  );
};

export default ProfilePage;
