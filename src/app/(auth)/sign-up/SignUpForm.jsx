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
  Droplet,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { imageUpload } from "@/lib/imageUpload";
import { authClient } from "@/lib/auth-client";
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
        district,
        upazila,
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
    <div className="min-h-screen w-full flex bg-background text-foreground overflow-x-hidden">
      {/* ================= LEFT SIDE: SaaS Brand & Value Panel ================= */}
      <div className="hidden lg:flex w-1/2 relative bg-secondary border-r border-border p-16 flex-col justify-between overflow-hidden">
        {/* Subtle Decorative Grid Pattern & Radial Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-15" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

        {/* Top: Branding */}
        <div className="relative z-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold font-heading tracking-tight text-foreground"
          >
            <Droplet className="w-6 h-6 text-primary fill-primary transform rotate-180" />
            <span>BloodLink</span>
          </Link>
        </div>

        {/* Center: Hero SaaS Copy */}
        <div className="relative z-10 max-w-lg space-y-6 my-auto">
          <h2 className="text-4xl xl:text-5xl font-bold text-foreground leading-[1.15] tracking-tight font-heading">
            Empowering the life-saving network,{" "}
            <span className="text-primary">one drop</span> at a time.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md">
            Join thousands of active donors. Manage donation requests instantly
            with our real-time smart matching dashboard.
          </p>

          {/* SaaS Feature Checklist */}
          <div className="space-y-3 pt-4">
            {[
              "Real-time global donor search",
              "Instant matching with local requests",
              "Secure and decentralized data privacy",
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-sm font-medium opacity-90"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Footer / Micro-copy */}
        <div className="relative z-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} BloodLink Platform. All rights reserved.
        </div>
      </div>

      {/* ================= RIGHT SIDE: Sign Up Form Scrollable Container ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 xl:px-24 py-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                Join as a Donor{" "}
              </h1>
              <Droplet className="w-6 h-6 text-primary fill-primary transform rotate-180" />
            </div>
            <p className="text-sm text-muted-foreground">
              Create your account to start managing requests and saving lives
            </p>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="p-4 text-sm text-danger bg-danger/10 border border-danger/20 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Picture Upload Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Profile Avatar
              </label>
              <div className="flex items-center gap-4 w-full bg-secondary border border-border p-3.5 rounded-xl transition hover:border-border/80">
                <div className="w-14 h-14 rounded-full border-2 border-border bg-background flex items-center justify-center overflow-hidden flex-shrink-0">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-5 h-5 opacity-40 text-foreground" />
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="cursor-pointer text-xs font-bold py-1.5 px-3 bg-background border border-border rounded-lg text-foreground hover:bg-muted transition shadow-sm block w-max">
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
                  <span className="text-[11px] text-muted-foreground truncate max-w-[200px]">
                    {imagePreview ? "✓ Image selected" : "JPEG, PNG up to 5MB"}
                  </span>
                </div>
              </div>
            </div>

            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Blood Group Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Blood Group
              </label>
              <div className="relative">
                <Heart className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary fill-primary/20 pointer-events-none" />
                <select
                  name="blood_group"
                  required
                  defaultValue=""
                  className="w-full pl-11 pr-10 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition appearance-none cursor-pointer"
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
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Dynamic Cascading Location Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  District
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none" />
                  <select
                    name="district"
                    required
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className="w-full pl-11 pr-10 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition appearance-none cursor-pointer"
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
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Upazila
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none" />
                  <select
                    name="upazila"
                    required
                    defaultValue=""
                    className="w-full pl-11 pr-10 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition appearance-none cursor-pointer disabled:opacity-40"
                    disabled={loading || !selectedDistrict}
                  >
                    <option value="" disabled>
                      {!selectedDistrict
                        ? "Choose District First"
                        : availableUpazilas.length === 0
                          ? "No upazilas mapped"
                          : "Select Upazila"}
                    </option>
                    {availableUpazilas.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-xs">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Password Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-10 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 transition"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-10 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 transition"
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-95 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/15"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Registering profile...
                </>
              ) : (
                "Sign Up As Donor"
              )}
            </button>
          </form>

          {/* Bottom Link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary hover:underline font-semibold transition"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
