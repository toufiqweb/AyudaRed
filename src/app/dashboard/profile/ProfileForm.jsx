"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Heart,
  MapPin,
  Loader2,
  Image as ImageIcon,
  Edit2,
  Save,
} from "lucide-react";
import Image from "next/image";
import { imageUpload } from "@/lib/imageUpload";
import { upazilas, districtsList } from "@/lib/geoData";
import { updateUserProfile } from "@/lib/actions/users";

export default function ProfileForm({ initialData }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");

  // ১. ডিরেক্ট ডাটাবেজের ভ্যালু ফর্মে বসানো হচ্ছে (কোনো এক্সট্রা "Select..." অপশন ছাড়া)
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    bloodGroup: initialData?.bloodGroup || "A+", // ব্যাকআপ হিসেবে 'A+' দেওয়া
    district: initialData?.district || "Cumilla", // ব্যাকআপ হিসেবে 'Cumilla' দেওয়া
    upazila: initialData?.upazila || "Nangalkot", // ব্যাকআপ হিসেবে 'Nangalkot' দেওয়া
  });

  // ২. সার্ভার থেকে ডাটা রি-ভ্যালিডেট হলে স্টেট আপডেট হবে
  useEffect(() => {
    if (initialData) {
      const timer = setTimeout(() => {
        setFormData({
          name: initialData.name || "",
          bloodGroup: initialData.bloodGroup || "A+",
          district: initialData.district || "Cumilla",
          upazila: initialData.upazila || "Nangalkot",
        });
        setImagePreview(initialData.image || "");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [initialData]);

  // ৩. সিলেক্টেড জেলা অনুযায়ী উপজেলার ড্রপডাউন ডাটা ফিল্টার করা dynamically
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
    const firstUpazila = upazilas[targetDistrict]?.[0] || ""; // জেলা বদলালে প্রথম উপজেলা অটো সিলেক্ট হবে
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
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let finalImageUrl = initialData.image;
      const fileInput = document.getElementById("profileImageInput");
      const file = fileInput?.files?.[0];
      if (file) {
        const uploadResult = await imageUpload(file);
        if (uploadResult?.url) finalImageUrl = uploadResult.url;
      }

      // Call the Server Action — it gets session email + calls backend + revalidates cache
      await updateUserProfile({
        name: formData.name,
        image: finalImageUrl,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
      });

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      setError(err?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-6 text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-xs text-gray-500">
            Manage your identity metadata parameters
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow-sm"
          >
            <Edit2 className="w-4 h-4" /> Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="px-3 py-2 text-sm font-medium bg-gray-100 border border-gray-200 rounded-xl hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              form="profile-form"
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 text-sm text-emerald-600 bg-emerald-50 rounded-xl">
          {success}
        </div>
      )}

      <form id="profile-form" onSubmit={handleSubmit} className="space-y-5">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3 bg-gray-50 border border-gray-100 p-4 rounded-xl">
          <div className="w-24 h-24 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center overflow-hidden relative shadow-inner">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Avatar"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <ImageIcon className="w-8 h-8 opacity-30" />
            )}
          </div>
          {isEditing && (
            <label className="cursor-pointer text-xs font-semibold py-1.5 px-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition shadow-sm">
              Change Picture
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

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold block text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={!isEditing || loading}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none disabled:opacity-60 disabled:bg-gray-50/70"
            />
          </div>
        </div>

        {/* Read-Only Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold block text-gray-400">
            Email Address (Read-Only)
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
            <input
              type="email"
              value={initialData?.email || ""}
              disabled
              className="w-full pl-10 pr-4 py-2 bg-gray-50 text-gray-400 border border-gray-200 rounded-xl cursor-not-allowed select-none opacity-70"
            />
          </div>
        </div>

        {/* Blood Group */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold block text-gray-700">
            Blood Group
          </label>
          <div className="relative">
            <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500 opacity-70" />
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              required
              disabled={!isEditing || loading}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none disabled:opacity-60 disabled:bg-gray-50/70 appearance-none"
            >
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* District */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold block text-gray-700">
              District
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <select
                name="district"
                value={formData.district}
                onChange={handleDistrictChange}
                required
                disabled={!isEditing || loading}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none disabled:opacity-60 disabled:bg-gray-50/70 appearance-none"
              >
                {districtsList.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Upazila */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold block text-gray-700">
              Upazila
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <select
                name="upazila"
                value={formData.upazila}
                onChange={handleInputChange}
                required
                disabled={!isEditing || loading}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none disabled:opacity-50 disabled:bg-gray-50/70 appearance-none"
              >
                {availableUpazilas.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
