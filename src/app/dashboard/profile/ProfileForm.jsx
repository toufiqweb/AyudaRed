"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Heart,
  MapPin,
  Loader2,
  Camera,
  X,
  BadgeCheck,
  Edit3,
  Shield,
  Clock,
  Activity,
  Droplet,
  ChevronRight,
  Save,
} from "lucide-react";
import Image from "next/image";
import { imageUpload } from "@/lib/imageUpload";
import { upazilas, districtsList } from "@/lib/geoData";
import { updateUserProfile } from "@/lib/actions/users";
import { useToast } from "@/components/ui/Toast";

export default function ProfilePage({ initialData }) {
  const router = useRouter();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    bloodGroup: initialData?.bloodGroup || "A+",
    district: initialData?.district || "Cumilla",
    upazila: initialData?.upazila || "Nangalkot",
  });

  const availableUpazilas =
    formData.district && upazilas[formData.district]
      ? upazilas[formData.district]
      : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDistrictChange = (e) => {
    const targetDistrict = e.target.value;
    const firstUpazila = upazilas[targetDistrict]?.[0] || "";
    setFormData((prev) => ({
      ...prev,
      district: targetDistrict,
      upazila: firstUpazila,
    }));
  };

  const handleCancel = () => {
    setFormData({
      name: initialData.name || "",
      bloodGroup: initialData.bloodGroup || "A+",
      district: initialData.district || "Cumilla",
      upazila: initialData.upazila || "Nangalkot",
    });
    setImagePreview(initialData.image || "");
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = initialData.image;
      const fileInput = document.getElementById("profileImageInput");
      const file = fileInput?.files?.[0];
      if (file) {
        const uploadResult = await imageUpload(file);
        if (uploadResult?.url) finalImageUrl = uploadResult.url;
      }

      await updateUserProfile({
        name: formData.name,
        image: finalImageUrl,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
      });

      toast.success("Profile layout updated successfully!");
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-foreground transition-colors duration-500 overflow-hidden relative pb-20">
      {/* Dynamic Background Elements for Premium Glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 via-background to-background pointer-events-none -z-10" />
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[60%] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[10000ms]" />
      <div className="absolute top-[20%] -left-[10%] w-[40%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Premium Hero Header Section */}
      <div className="relative w-full pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Glassmorphic Hero Card */}
          <div className="relative rounded-3xl bg-secondary/30 backdrop-blur-xl border border-border/60 shadow-2xl overflow-hidden p-8 sm:p-12">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
              {/* Left Side: Avatar & Info */}
              <div className="flex flex-col md:flex-row items-center md:items-center gap-8 w-full md:w-auto text-center md:text-left">
                {/* Avatar with Animated Ring */}
                <div
                  className="relative group shrink-0"
                  onMouseEnter={() => setIsHoveringAvatar(true)}
                  onMouseLeave={() => setIsHoveringAvatar(false)}
                >
                  <div
                    className={`absolute -inset-1.5 bg-gradient-to-r from-primary to-blue-600 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500 ${isEditing ? "animate-pulse opacity-60" : ""}`}
                  />
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-background bg-secondary shadow-2xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Avatar"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <User className="w-16 h-16 text-foreground/20" />
                      </div>
                    )}

                    {isEditing && (
                      <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 text-white font-bold backdrop-blur-sm">
                        <Camera className="w-8 h-8 mb-2 text-primary animate-bounce" />
                        <span>Change Photo</span>
                        <input
                          id="profileImageInput"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file)
                              setImagePreview(URL.createObjectURL(file));
                          }}
                          className="hidden"
                          disabled={loading}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Info Text */}
                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-heading drop-shadow-md">
                      {formData.name || initialData?.name || "Anonymous User"}
                    </h1>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30 shadow-sm backdrop-blur-md uppercase tracking-wider">
                      <BadgeCheck className="w-4 h-4" />{" "}
                      {initialData?.role || "Verified"}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-sm text-foreground/70 font-medium">
                    <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-lg border border-border/50">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>Joined {initialData?.createdAt || "Recently"}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-lg border border-border/50">
                      <Shield className="w-4 h-4 text-emerald-500" />
                      <span className="capitalize">
                        Status: {initialData?.status || "Active"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Actions */}
              <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-3.5 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto justify-center"
                  >
                    <Edit3 className="w-5 h-5" /> Edit Identity
                  </button>
                ) : (
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={loading}
                      className="flex items-center gap-2 px-5 py-3 text-sm font-bold bg-secondary hover:bg-muted border border-border rounded-xl text-foreground/80 transition-all duration-200 active:scale-95"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                    <button
                      form="profile-dashboard-form"
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 text-sm font-bold bg-gradient-to-r from-primary to-red-600 text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-all duration-300 shadow-xl shadow-primary/30 active:scale-95"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout Block */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Summary Sidebar Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Blood Type Card */}
            <div className="group bg-secondary/40 backdrop-blur-xl border border-border/60 rounded-3xl p-8 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500" />

              <h3 className="text-xs font-black uppercase tracking-widest text-foreground/50 mb-6 font-heading flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> Core Vital
              </h3>

              <div className="flex items-center gap-6">
                <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <Heart className="w-10 h-10 text-primary fill-primary animate-pulse" />
                </div>
                <div>
                  <div className="text-4xl font-black font-heading tracking-tighter text-foreground drop-shadow-sm">
                    {formData.bloodGroup}
                  </div>
                  <div className="text-sm font-bold text-foreground/50 mt-1">
                    Registered Blood Type
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Completion Card */}
            <div className="bg-secondary/40 backdrop-blur-xl border border-border/60 rounded-3xl p-8 hover:border-border transition-all duration-300">
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground/50 mb-4 font-heading flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" /> Account Health
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-black font-heading text-foreground">
                    100%
                  </span>
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md mb-1">
                    Excellent
                  </span>
                </div>

                <div className="w-full h-3 bg-background rounded-full overflow-hidden border border-border/50">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] w-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:20px_20px] animate-[shimmer_1s_linear_infinite]" />
                  </div>
                </div>

                <p className="text-sm text-foreground/60 leading-relaxed font-medium">
                  Your profile is fully verified. Keep your location updated so
                  local requests can find you instantly.
                </p>
              </div>
            </div>

            {/* Quick Stats Placeholder */}
            <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-8 relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-start gap-4">
                <div className="p-3 bg-background/80 backdrop-blur-md rounded-xl border border-border">
                  <Droplet className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground">
                    Ready to Donate?
                  </h4>
                  <p className="text-sm text-foreground/70 mt-1">
                    Check the community requests tab to find someone in need
                    near your district.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/donation-requests")}
                  className="text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all mt-2"
                >
                  View Requests <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Core Details Form Canvas */}
          <div className="lg:col-span-8">
            <div
              className={`bg-secondary/40 backdrop-blur-xl border ${isEditing ? "border-primary/40 shadow-2xl shadow-primary/10" : "border-border/60 shadow-xl"} rounded-3xl p-8 sm:p-10 transition-all duration-500`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6 mb-8">
                <div>
                  <h2 className="text-2xl font-black text-foreground font-heading flex items-center gap-3">
                    <User className="w-6 h-6 text-primary" /> Identity
                    Configuration
                  </h2>
                  <p className="text-sm text-foreground/60 font-medium mt-1.5">
                    Update your personal information and geographical
                    coordinates.
                  </p>
                </div>

                {isEditing && (
                  <div className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-xl animate-pulse flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" /> Editing
                    Mode Active
                  </div>
                )}
              </div>

              <form
                id="profile-dashboard-form"
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Personal Information Group */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-foreground/40 mb-4 font-heading border-l-2 border-primary pl-3">
                    Personal Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Full Name */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-black text-foreground/80 block uppercase tracking-wider">
                        Full Legal Name
                      </label>
                      <div className="relative group">
                        <div
                          className={`absolute inset-0 bg-primary/20 rounded-xl blur-md transition-opacity duration-300 ${isEditing ? "opacity-100 group-focus-within:opacity-100" : "opacity-0"}`}
                        />
                        <div className="relative flex items-center">
                          <User
                            className={`absolute left-4 w-5 h-5 transition-colors duration-300 ${isEditing ? "text-primary" : "text-foreground/40"}`}
                          />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            disabled={!isEditing || loading}
                            className={`w-full pl-12 pr-4 py-4 bg-background border rounded-xl outline-none text-base font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-foreground ${isEditing ? "border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-inner" : "border-border/60 hover:border-border"}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Read-Only Email */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-black text-foreground/40 block uppercase tracking-wider flex items-center justify-between">
                        Email Address
                        <span className="text-[10px] text-primary/80 bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                          Verified
                        </span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                        <input
                          type="email"
                          value={initialData?.email || ""}
                          disabled
                          className="w-full pl-12 pr-4 py-4 bg-muted/30 text-foreground/50 border border-border/30 rounded-xl cursor-not-allowed text-base font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />

                {/* Medical & Location Group */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-foreground/40 mb-4 font-heading border-l-2 border-primary pl-3">
                    Medical & Regional
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Blood Group Selector */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-black text-foreground/80 block uppercase tracking-wider">
                        Blood Group
                      </label>
                      <div className="relative group">
                        <div
                          className={`absolute inset-0 bg-primary/20 rounded-xl blur-md transition-opacity duration-300 ${isEditing ? "opacity-100 group-focus-within:opacity-100" : "opacity-0"}`}
                        />
                        <div className="relative">
                          <Heart
                            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isEditing ? "text-primary" : "text-foreground/40"}`}
                          />
                          <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleInputChange}
                            required
                            disabled={!isEditing || loading}
                            className={`w-full pl-12 pr-10 py-4 bg-background border rounded-xl outline-none text-base font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed appearance-none cursor-pointer text-foreground ${isEditing ? "border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-inner" : "border-border/60 hover:border-border"}`}
                          >
                            {[
                              "A+",
                              "A-",
                              "B+",
                              "B-",
                              "AB+",
                              "AB-",
                              "O+",
                              "O-",
                            ].map((bg) => (
                              <option
                                key={bg}
                                value={bg}
                                className="bg-secondary text-foreground font-bold"
                              >
                                {bg}
                              </option>
                            ))}
                          </select>
                          <div
                            className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${isEditing ? "rotate-180 text-primary" : "text-foreground/40"}`}
                          >
                            ▼
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* District Selector */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-black text-foreground/80 block uppercase tracking-wider">
                        District
                      </label>
                      <div className="relative group">
                        <div
                          className={`absolute inset-0 bg-primary/20 rounded-xl blur-md transition-opacity duration-300 ${isEditing ? "opacity-100 group-focus-within:opacity-100" : "opacity-0"}`}
                        />
                        <div className="relative">
                          <MapPin
                            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isEditing ? "text-primary" : "text-foreground/40"}`}
                          />
                          <select
                            name="district"
                            value={formData.district}
                            onChange={handleDistrictChange}
                            required
                            disabled={!isEditing || loading}
                            className={`w-full pl-12 pr-10 py-4 bg-background border rounded-xl outline-none text-base font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed appearance-none cursor-pointer text-foreground ${isEditing ? "border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-inner" : "border-border/60 hover:border-border"}`}
                          >
                            {districtsList.map((d) => (
                              <option
                                key={d.value}
                                value={d.value}
                                className="bg-secondary text-foreground font-bold"
                              >
                                {d.label}
                              </option>
                            ))}
                          </select>
                          <div
                            className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${isEditing ? "rotate-180 text-primary" : "text-foreground/40"}`}
                          >
                            ▼
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Upazila Selector */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-black text-foreground/80 block uppercase tracking-wider">
                        Upazila
                      </label>
                      <div className="relative group">
                        <div
                          className={`absolute inset-0 bg-primary/20 rounded-xl blur-md transition-opacity duration-300 ${isEditing ? "opacity-100 group-focus-within:opacity-100" : "opacity-0"}`}
                        />
                        <div className="relative">
                          <MapPin
                            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isEditing ? "text-primary" : "text-foreground/40"}`}
                          />
                          <select
                            name="upazila"
                            value={formData.upazila}
                            onChange={handleInputChange}
                            required
                            disabled={!isEditing || loading}
                            className={`w-full pl-12 pr-10 py-4 bg-background border rounded-xl outline-none text-base font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed appearance-none cursor-pointer text-foreground ${isEditing ? "border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-inner" : "border-border/60 hover:border-border"}`}
                          >
                            {availableUpazilas.map((u) => (
                              <option
                                key={u}
                                value={u}
                                className="bg-secondary text-foreground font-bold"
                              >
                                {u}
                              </option>
                            ))}
                          </select>
                          <div
                            className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${isEditing ? "rotate-180 text-primary" : "text-foreground/40"}`}
                          >
                            ▼
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Global Shimmer Animation Definition */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            background-position: 20px 0;
          }
        }
      `}</style>
    </div>
  );
}
