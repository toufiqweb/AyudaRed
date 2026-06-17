"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Loader2,
  Image as ImageIcon,
  MapPin,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { imageUpload } from "@/lib/imageUpload";
import { authClient } from "@/lib/auth-client";
// Updated Imports to handle your current dataset layout
import { upazilas, districtsList } from "@/lib/geoData";

export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // Cascading location state management
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [availableUpazilas, setAvailableUpazilas] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Triggers whenever a user shifts target districts
  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);

    // Dynamically retrieve upazilas from your upazilas dictionary object
    if (districtName && upazilas[districtName]) {
      setAvailableUpazilas(upazilas[districtName]);
    } else {
      setAvailableUpazilas([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");
    const bloodGroup = formData.get("blood_group");
    const district = formData.get("district");
    const upazila = formData.get("upazila");
    const profileImage = formData.get("image");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      let uploadedImage = null;
      if (profileImage && profileImage.size > 0) {
        uploadedImage = await imageUpload(profileImage);
      }

      await authClient.signUp.email({
        email,
        password,
        name,
        image: uploadedImage?.url,
        role: "donor",
        status: "active",
        bloodGroup,
        district, // Sends clean string, e.g., "Dhaka"
        upazila, // Sends clean string, e.g., "Savar"
      });

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err?.message || "Something went wrong during registration.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg p-8 bg-muted border border-border rounded-2xl shadow-sm mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">
          Join as a Donor 🩸
        </h1>
        <p className="text-sm opacity-80">
          Create your account to start managing requests and saving lives
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/30 dark:text-red-400 dark:border-red-900">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Picture Upload Input */}
        <div className="space-y-2 flex flex-col items-center">
          <label className="text-sm font-medium block text-foreground w-full text-left">
            Profile Avatar
          </label>
          <div className="flex items-center gap-4 w-full bg-background p-3 border border-border rounded-xl">
            <div className="w-12 h-12 rounded-full border border-border bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-5 h-5 opacity-40" />
              )}
            </div>
            <label className="cursor-pointer text-xs font-semibold py-2 px-3 bg-muted border border-border rounded-lg hover:opacity-80 transition">
              Choose File
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={loading}
                required
              />
            </label>
            <span className="text-xs opacity-60 truncate">
              {imagePreview ? "Image selected" : "No file chosen"}
            </span>
          </div>
        </div>

        {/* Full Name Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium block text-foreground">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
              disabled={loading}
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium block text-foreground">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
              disabled={loading}
            />
          </div>
        </div>

        {/* Blood Group Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium block text-foreground">
            Blood Group
          </label>
          <div className="relative">
            <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 pointer-events-none text-red-500" />
            <select
              name="blood_group"
              required
              defaultValue=""
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition appearance-none cursor-pointer"
              disabled={loading}
            >
              <option value="" disabled>
                Select your blood group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-sm">
              ▼
            </div>
          </div>
        </div>

        {/* Dynamic Cascading Location Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium block text-foreground">
              District
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 pointer-events-none" />
              <select
                name="district"
                required
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition appearance-none cursor-pointer"
                disabled={loading}
              >
                <option value="" disabled>
                  Select District
                </option>
                {districtsList.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-sm">
                ▼
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block text-foreground">
              Upazila
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 pointer-events-none" />
              <select
                name="upazila"
                required
                defaultValue=""
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition appearance-none cursor-pointer disabled:opacity-50"
                disabled={loading || !selectedDistrict}
              >
                <option value="" disabled>
                  {!selectedDistrict
                    ? "Choose District First"
                    : availableUpazilas.length === 0
                      ? "No upazilas mapped yet"
                      : "Select Upazila"}
                </option>
                {availableUpazilas.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-sm">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Password Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium block text-foreground">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-80 transition"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block text-foreground">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-80 transition"
                disabled={loading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-3 px-4 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Registering profile...
            </>
          ) : (
            "Sign Up As Donor"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm opacity-80">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-primary hover:underline font-semibold"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
