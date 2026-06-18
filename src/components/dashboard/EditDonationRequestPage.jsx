"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Loader2,
  Save,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useToast, ToastContainer } from "@/components/ui/Toast";
import { upazilas, districtsList } from "@/lib/geoData";
import { getDonationRequestById } from "@/lib/api/requests";
import { updateDonationRequest } from "@/lib/actions/requests";

export default function EditDonationRequestPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const { toasts, showToast, removeToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    hospitalName: "",
    fullAddress: "",
    requestMessage: "",
  });

  const availableUpazilas =
    formData.recipientDistrict && upazilas[formData.recipientDistrict]
      ? upazilas[formData.recipientDistrict]
      : [];

  useEffect(() => {
    if (!id) return;

    const fetchRequestDetails = async () => {
      setLoading(true);
      try {
        const response = await getDonationRequestById(id);
        if (response) {
          setFormData({
            recipientName: response.recipientName || "",
            recipientDistrict: response.recipientDistrict || "",
            recipientUpazila: response.recipientUpazila || "",
            bloodGroup: response.bloodGroup || "",
            donationDate: response.donationDate || "",
            donationTime: response.donationTime || "",
            hospitalName: response.hospitalName || "",
            fullAddress: response.fullAddress || "",
            requestMessage: response.requestMessage || "",
          });
        }
      } catch (err) {
        showToast(err.message || "Failed to fetch request details.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id, showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDistrictChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      recipientDistrict: e.target.value,
      recipientUpazila: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await updateDonationRequest(id, formData);
      if (response.success) {
        showToast("Donation request updated successfully! 🎉", "success");
        setTimeout(() => {
          router.push("/dashboard/my-donation-requests");
          router.refresh();
        }, 1500);
      } else {
        throw new Error(
          response.message || "Failed to update donation request.",
        );
      }
    } catch (err) {
      showToast(err.message || "Failed to update donation request.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-3">
        <Loader2 className="w-9 h-9 animate-spin text-rose-500 opacity-80" />
        <p className="text-xs text-muted-foreground tracking-wide">
          Loading donation request data...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 min-h-screen">
      {/* Back Button & Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/my-donation-requests"
          className="p-2 border border-border bg-background rounded-xl hover:bg-muted text-muted-foreground transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Edit Donation Request 🩸
          </h1>
          <p className="text-xs text-muted-foreground">
            Modify the specific details below to update the current live blood
            request.
          </p>
        </div>
      </div>

      {/* Main Edit Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-background border border-border rounded-2xl shadow-sm p-5 sm:p-6 space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Recipient Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-muted-foreground" /> Recipient
              Name
            </label>
            <input
              type="text"
              name="recipientName"
              required
              value={formData.recipientName}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
            />
          </div>

          {/* Blood Group */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" /> Required Blood
              Group
            </label>
            <select
              name="bloodGroup"
              required
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition cursor-pointer"
            >
              <option value="" disabled>
                Select Blood Group
              </option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* District Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" /> District
            </label>
            <select
              name="recipientDistrict"
              required
              value={formData.recipientDistrict}
              onChange={handleDistrictChange}
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition cursor-pointer"
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

          {/* Upazila Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" /> Upazila
            </label>
            <select
              name="recipientUpazila"
              required
              value={formData.recipientUpazila}
              onChange={handleChange}
              disabled={!formData.recipientDistrict}
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition cursor-pointer disabled:opacity-50"
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

          {/* Donation Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />{" "}
              Donation Date
            </label>
            <input
              type="date"
              name="donationDate"
              required
              value={formData.donationDate}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
            />
          </div>

          {/* Donation Time */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" /> Donation
              Time
            </label>
            <input
              type="time"
              name="donationTime"
              required
              value={formData.donationTime}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
            />
          </div>

          {/* Hospital Name */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Hospital Name
            </label>
            <input
              type="text"
              name="hospitalName"
              required
              value={formData.hospitalName}
              onChange={handleChange}
              placeholder="e.g. Dhaka Medical College Hospital"
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
            />
          </div>

          {/* Full Address */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Full Address Detail
            </label>
            <input
              type="text"
              name="fullAddress"
              required
              value={formData.fullAddress}
              onChange={handleChange}
              placeholder="e.g. Ward 5, House 24, Road 2"
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
            />
          </div>

          {/* Request Message */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />{" "}
              Why do you need blood? (Request Message)
            </label>
            <textarea
              name="requestMessage"
              rows={4}
              required
              value={formData.requestMessage}
              onChange={handleChange}
              placeholder="Provide context regarding the patient's medical situation..."
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition resize-none"
            />
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
          <Link
            href="/dashboard/my-donation-requests"
            className="px-4 py-2.5 rounded-full border border-border bg-muted/40 hover:bg-muted text-xs sm:text-sm font-semibold text-slate-600 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-rose-600 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full hover:bg-rose-700 disabled:opacity-50 transition shadow-sm focus:outline-none"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Updating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Update Donation Request
              </>
            )}
          </button>
        </div>
      </form>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
