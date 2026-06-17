"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client"; // Adjust path to your better-auth client instance
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Loader2,
  Image as ImageIcon,
  Briefcase,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // Handles displaying a quick thumbnail preview when an image is selected
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Gather values using native FormData directly from the DOM elements
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");
    const profileImage = formData.get("profileImage"); // This holds the File object

    try {
      // 2. Process image upload if your server / cloud bucket needs it first,
      // or pass a base64 string/URL directly to better-auth if configured.
      let imageString = "";
      if (profileImage && profileImage.size > 0) {
        // Simple conversion example if passing string data directly:
        // imageString = await convertToBase64(profileImage);
      }

      // 3. Submit data to better-auth
      await authClient.signUp.email({
        email,
        password,
        name,
        image: imageString || undefined, // Populates better-auth core image property
        data: {
          role, // Maps customized schema parameters into metadata profiles
        },
        callbackURL: "/",
      });

      console.log("Done successfully connected to MongoDB");
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-muted border border-border rounded-2xl shadow-sm">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">
          Create an Account
        </h1>
        <p className="text-sm opacity-80">
          Get started by setting up your profile
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
            Profile Image
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
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={loading}
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

        {/* Account Role Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium block text-foreground">
            Select Role
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 pointer-events-none" />
            <select
              name="role"
              required
              defaultValue="buyer"
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition appearance-none cursor-pointer"
              disabled={loading}
            >
              <option value="buyer">Buyer (Browse & Purchase)</option>
              <option value="seller">Seller (List & Sell items)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-sm">
              ▼
            </div>
          </div>
        </div>

        {/* Password Input */}
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 px-4 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating account...
            </>
          ) : (
            "Sign Up"
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
