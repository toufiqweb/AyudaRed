"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Heart,
  MapPin,
  Loader2,
  Camera,
  X,
  Check,
  BadgeCheck,
  Edit3,
  Shield,
  Clock,
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

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    bloodGroup: initialData?.bloodGroup || "A+",
    district: initialData?.district || "Cumilla",
    upazila: initialData?.upazila || "Nangalkot",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        bloodGroup: initialData.bloodGroup || "A+",
        district: initialData.district || "Cumilla",
        upazila: initialData.upazila || "Nangalkot",
      });
      setImagePreview(initialData.image || "");
    }
  }, [initialData]);

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

      // Call the Server Action
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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Premium Hero Header Section */}
      <div className="relative h-64 w-full  border-b border-border/50 overflow-hidden">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-end pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between w-full gap-6 z-10">
            {/* Avatar & Meta Info Block */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <div className="relative group w-28 h-28 rounded-2xl border-2 border-border bg-secondary shadow-xl overflow-hidden shrink-0">
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
                    <User className="w-10 h-10 text-foreground/40" />
                  </div>
                )}

                {isEditing && (
                  <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200 text-white text-[11px] font-semibold">
                    <Camera className="w-4 h-4 mb-1 text-primary animate-pulse" />
                    Upload
                    <input
                      id="profileImageInput"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setImagePreview(URL.createObjectURL(file));
                      }}
                      className="hidden"
                      disabled={loading}
                    />
                  </label>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading">
                    {formData.name || initialData?.name || "User Name"}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    <BadgeCheck className="w-3.5 h-3.5" /> Verified Lifesaver
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-foreground/60 justify-center sm:justify-start">
                  <p className="flex items-center gap-1.5 font-body">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    Joined {initialData?.createdAt || "Recently"}
                  </p>
                  <p className="flex items-center gap-1.5 font-body">
                    <Shield className="w-3.5 h-3.5 text-primary" />
                    ID: BloodLink-Member
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Action Controls */}
            <div className="flex items-center gap-3 shrink-0">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-secondary hover:bg-muted border border-border text-foreground rounded-xl transition-all duration-200 shadow-sm active:scale-95"
                >
                  <Edit3 className="w-4 h-4 text-primary" /> Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold bg-secondary border border-border rounded-xl hover:bg-muted text-foreground/80 transition-all duration-200"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button
                    form="profile-dashboard-form"
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold bg-primary text-primary-foreground rounded-xl hover:bg-accent disabled:opacity-50 transition-all duration-200 shadow-lg shadow-primary/20 active:scale-95"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout Block */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Workspace Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Summary Sidebar Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-secondary border border-border/60 rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-4 font-heading">
                Donation Status
              </h3>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border/40">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Heart className="w-6 h-6 text-primary fill-primary" />
                </div>
                <div>
                  <div className="text-xl font-black">
                    {formData.bloodGroup}
                  </div>
                  <div className="text-xs text-foreground/50">
                    Your Blood Group Type
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary border border-border/60 rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-3 font-heading">
                Account Health
              </h3>
              <p className="text-xs text-foreground/60 leading-relaxed font-body">
                Keep your location up-to-date so local blood requests in your
                sub-district find you immediately.
              </p>
            </div>
          </div>

          {/* Right Core Details Form Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-secondary border border-border/60 rounded-2xl p-6 sm:p-8">
              <div className="border-b border-border/60 pb-4 mb-6">
                <h2 className="text-lg font-bold text-foreground font-heading">
                  Profile Configuration
                </h2>
                <p className="text-xs text-foreground/50 font-body">
                  Manage your credentials and area metrics
                </p>
              </div>

              <form id="profile-dashboard-form" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/70 block uppercase tracking-wide">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={!isEditing || loading}
                        className="w-full pl-11 pr-4 py-3 bg-background border border-border/60 rounded-xl outline-none text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed text-foreground"
                      />
                    </div>
                  </div>

                  {/* Read-Only Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/40 block uppercase tracking-wide">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input
                        type="email"
                        value={initialData?.email || ""}
                        disabled
                        className="w-full pl-11 pr-4 py-3 bg-muted/50 text-foreground/40 border border-border/30 rounded-xl cursor-not-allowed text-sm"
                      />
                    </div>
                  </div>

                  {/* Blood Group Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/70 block uppercase tracking-wide">
                      Blood Group
                    </label>
                    <div className="relative">
                      <Heart className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        required
                        disabled={!isEditing || loading}
                        className="w-full pl-11 pr-10 py-3 bg-background border border-border/60 rounded-xl outline-none text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed appearance-none cursor-pointer text-foreground"
                      >
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                          (bg) => (
                            <option
                              key={bg}
                              value={bg}
                              className="bg-secondary text-foreground"
                            >
                              {bg}
                            </option>
                          ),
                        )}
                      </select>
                      {isEditing && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground/60 w-0 h-0" />
                      )}
                    </div>
                  </div>

                  {/* District Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/70 block uppercase tracking-wide">
                      District
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleDistrictChange}
                        required
                        disabled={!isEditing || loading}
                        className="w-full pl-11 pr-10 py-3 bg-background border border-border/60 rounded-xl outline-none text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed appearance-none cursor-pointer text-foreground"
                      >
                        {districtsList.map((d) => (
                          <option
                            key={d.value}
                            value={d.value}
                            className="bg-secondary text-foreground"
                          >
                            {d.label}
                          </option>
                        ))}
                      </select>
                      {isEditing && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground/60 w-0 h-0" />
                      )}
                    </div>
                  </div>

                  {/* Upazila Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/70 block uppercase tracking-wide">
                      Upazila
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                      <select
                        name="upazila"
                        value={formData.upazila}
                        onChange={handleInputChange}
                        required
                        disabled={!isEditing || loading}
                        className="w-full pl-11 pr-10 py-3 bg-background border border-border/60 rounded-xl outline-none text-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed appearance-none cursor-pointer text-foreground"
                      >
                        {availableUpazilas.map((u) => (
                          <option
                            key={u}
                            value={u}
                            className="bg-secondary text-foreground"
                          >
                            {u}
                          </option>
                        ))}
                      </select>
                      {isEditing && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground/60 w-0 h-0" />
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
