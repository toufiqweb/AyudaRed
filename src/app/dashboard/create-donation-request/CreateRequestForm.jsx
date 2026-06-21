"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Heart,
  MapPin,
  Hospital,
  Calendar,
  Clock,
  MessageSquare,
  Loader2,
  PlusCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { upazilas, districtsList } from "@/lib/geoData"; // Ensure you have this helper available
import { createDonationRequest } from "@/lib/actions/requests";

export default function CreateRequestForm({ user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  // Watch district selections to compute corresponding upazila choices dynamically
  const availableUpazilas =
    formData.recipientDistrict && upazilas[formData.recipientDistrict]
      ? upazilas[formData.recipientDistrict]
      : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDistrictChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      recipientDistrict: e.target.value,
      recipientUpazila: "", // Reset child location element
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createDonationRequest(formData);

      setSuccess("Emergency donation request added successfully!");
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background border border-border rounded-2xl shadow-sm p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Create Donation Request 🆕
        </h1>
        <p className="text-xs text-muted-foreground font-body">
          Post a new request case to find available donors
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Read-Only Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/40 p-4 rounded-xl border border-border/60">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground block">
              Requester Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input
                type="text"
                value={user.name || ""}
                disabled
                className="w-full pl-10 pr-4 py-2 bg-muted/50 text-muted-foreground border border-border/80 rounded-xl cursor-not-allowed text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground block">
              Requester Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input
                type="email"
                value={user.email || ""}
                disabled
                className="w-full pl-10 pr-4 py-2 bg-muted/50 text-muted-foreground border border-border/80 rounded-xl cursor-not-allowed text-sm"
              />
            </div>
          </div>
        </div>

        {/* Recipient Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground/80 block">
            Recipient Name
          </label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleInputChange}
            placeholder="Enter patient's full name"
            required
            disabled={loading}
            className="w-full px-4 py-2 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition"
          />
        </div>

        {/* Regional Location Mappings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80 block">
              Recipient District
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <select
                name="recipientDistrict"
                value={formData.recipientDistrict}
                onChange={handleDistrictChange}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm transition appearance-none"
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
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80 block">
              Recipient Upazila
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <select
                name="recipientUpazila"
                value={formData.recipientUpazila}
                onChange={handleInputChange}
                required
                disabled={loading || !formData.recipientDistrict}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm transition appearance-none disabled:opacity-50"
              >
                <option value="" disabled>
                  {!formData.recipientDistrict
                    ? "Choose District First"
                    : "Select Upazila"}
                </option>
                {availableUpazilas.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blood Group Target Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground/80 block">
            Required Blood Group
          </label>
          <div className="relative">
            <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500 opacity-70" />
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm transition appearance-none"
            >
              <option value="" disabled>
                Select target blood group
              </option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Logistics and Hospital Details */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground/80 block">
            Hospital Name
          </label>
          <div className="relative">
            <Hospital className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleInputChange}
              placeholder="e.g., Chattogram Medical College Hospital"
              required
              disabled={loading}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm transition"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground/80 block">
            Full Address Line
          </label>
          <input
            type="text"
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleInputChange}
            placeholder="e.g., Nasirabad Rd, Chittagong"
            required
            disabled={loading}
            className="w-full px-4 py-2 bg-background border border-border rounded-xl text-sm transition"
          />
        </div>

        {/* Schedule Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80 block">
              Donation Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input
                type="date"
                name="donationDate"
                value={formData.donationDate}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80 block">
              Donation Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input
                type="time"
                name="donationTime"
                value={formData.donationTime}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm transition"
              />
            </div>
          </div>
        </div>

        {/* Detailed Explanation Context Case */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground/80 block">
            Request Message
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-4 h-4 opacity-40" />
            <textarea
              name="requestMessage"
              value={formData.requestMessage}
              onChange={handleInputChange}
              placeholder="Provide context regarding the patient's medical situation..."
              rows={4}
              required
              disabled={loading}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm transition resize-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Submit Controller Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition disabled:opacity-50 shadow-sm"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <PlusCircle className="w-4 h-4" />
          )}
          Create Request
        </button>
      </form>
    </div>
  );
}
