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
  Building2,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { upazilas, districtsList } from "@/lib/geoData";
import { getDonationRequestById } from "@/lib/api/requests";
import { updateDonationRequest } from "@/lib/actions/requests";

export default function EditDonationRequestPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const toast = useToast();
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
        toast.error(err.message || "Failed to fetch request details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id, toast]);

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
        toast.success("Donation request updated successfully! 🎉");
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
      toast.error(err.message || "Failed to update donation request.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 bg-background text-foreground font-sans">
        <div className="p-3 bg-secondary/50 rounded-2xl border border-border/60 shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin text-primary opacity-90" />
        </div>
        <p className="text-xs text-secondary-foreground/60 tracking-wider font-medium uppercase">
          Loading parameters...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8 min-h-screen  text-foreground transition-colors duration-200">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-start gap-4">
          <Link
            href="/dashboard/my-donation-requests"
            className="mt-1 p-2.5 border border-border bg-secondary/30 rounded-xl hover:bg-secondary text-secondary-foreground/80 transition-all duration-200 shadow-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-md font-sans">
              Management Portal
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground mt-1.5 font-heading">
              Edit Donation Request
            </h1>
            <p className="text-xs text-secondary-foreground/60 font-medium font-body mt-0.5">
              Modify operational variables and logs for this active file setup.
            </p>
          </div>
        </div>
      </div>

      {/* Main SaaS Form Control Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-secondary/20 border border-border rounded-2xl shadow-sm overflow-hidden p-6 sm:p-8 space-y-8"
      >
        {/* Core Identification Blocks */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold tracking-widest text-secondary-foreground/50 uppercase border-b border-border/40 pb-2 font-heading">
            01. Patient Identity & Metrics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Recipient Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wide text-foreground/80 flex items-center gap-2 font-sans">
                <User className="w-3.5 h-3.5 text-secondary-foreground/40" />{" "}
                Recipient Name
              </label>
              <input
                type="text"
                name="recipientName"
                required
                value={formData.recipientName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body"
              />
            </div>

            {/* Blood Group Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wide text-foreground/80 flex items-center gap-2 font-sans">
                <Heart className="w-3.5 h-3.5 text-primary" /> Required Blood
                Group
              </label>
              <div className="relative">
                <select
                  name="bloodGroup"
                  required
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer appearance-none font-sans"
                >
                  <option value="" disabled className="bg-background">
                    Select Blood Group
                  </option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (bg) => (
                      <option
                        key={bg}
                        value={bg}
                        className="bg-background font-semibold"
                      >
                        {bg}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Logistics & Timelines */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold tracking-widest text-secondary-foreground/50 uppercase border-b border-border/40 pb-2 font-heading">
            02. Tactical Geography & Deadlines
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* District Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wide text-foreground/80 flex items-center gap-2 font-sans">
                <MapPin className="w-3.5 h-3.5 text-secondary-foreground/40" />{" "}
                Target District
              </label>
              <select
                name="recipientDistrict"
                required
                value={formData.recipientDistrict}
                onChange={handleDistrictChange}
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer font-body"
              >
                <option value="" disabled>
                  Select Target District
                </option>
                {districtsList.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wide text-foreground/80 flex items-center gap-2 font-sans">
                <MapPin className="w-3.5 h-3.5 text-secondary-foreground/40" />{" "}
                Regional Upazila
              </label>
              <select
                name="recipientUpazila"
                required
                value={formData.recipientUpazila}
                onChange={handleChange}
                disabled={!formData.recipientDistrict}
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-body"
              >
                <option value="" disabled>
                  {!formData.recipientDistrict
                    ? "Awaiting District Input"
                    : "Select Regional Upazila"}
                </option>
                {availableUpazilas.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            {/* Donation Date */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wide text-foreground/80 flex items-center gap-2 font-sans">
                <Calendar className="w-3.5 h-3.5 text-secondary-foreground/40" />{" "}
                Scheduled Date
              </label>
              <input
                type="date"
                name="donationDate"
                required
                value={formData.donationDate}
                onChange={handleChange}
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body"
              />
            </div>

            {/* Donation Time */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wide text-foreground/80 flex items-center gap-2 font-sans">
                <Clock className="w-3.5 h-3.5 text-secondary-foreground/40" />{" "}
                Operational Timestamp
              </label>
              <input
                type="time"
                name="donationTime"
                required
                value={formData.donationTime}
                onChange={handleChange}
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body"
              />
            </div>

            {/* Hospital Name */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-bold tracking-wide text-foreground/80 flex items-center gap-2 font-sans">
                <Building2 className="w-3.5 h-3.5 text-secondary-foreground/40" />{" "}
                Medical Facility Destination
              </label>
              <input
                type="text"
                name="hospitalName"
                required
                value={formData.hospitalName}
                onChange={handleChange}
                placeholder="e.g. Dhaka Medical College Hospital"
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body"
              />
            </div>

            {/* Full Address */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-bold tracking-wide text-foreground/80 font-sans">
                Geographic Target Details (Full Address)
              </label>
              <input
                type="text"
                name="fullAddress"
                required
                value={formData.fullAddress}
                onChange={handleChange}
                placeholder="e.g. Ward 5, House 24, Road 2"
                className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body"
              />
            </div>
          </div>
        </div>

        {/* Case Context Details */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold tracking-widest text-secondary-foreground/50 uppercase border-b border-border/40 pb-2 font-heading">
            03. Operational Manifest & Briefing
          </h3>
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wide text-foreground/80 flex items-center gap-2 font-sans">
              <MessageSquare className="w-3.5 h-3.5 text-secondary-foreground/40" />{" "}
              Case Context Log (Request Message)
            </label>
            <textarea
              name="requestMessage"
              rows={4}
              required
              value={formData.requestMessage}
              onChange={handleChange}
              placeholder="Provide clean internal diagnostic logs or clinical scenario overview context regarding the patient's medical emergency timeline..."
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none leading-relaxed font-body"
            />
          </div>
        </div>

        {/* Form Action Controls Footer */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/60 bg-muted/5 -mx-6 sm:-mx-8 px-6 sm:px-8 -mb-6 sm:-mb-8 py-5">
          <Link
            href="/dashboard/my-donation-requests"
            className="px-5 py-2.5 rounded-xl border border-border bg-background hover:bg-secondary text-xs sm:text-sm font-semibold text-secondary-foreground/80 transition-all shadow-sm font-sans"
          >
            Cancel Changes
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm shadow-primary/10 focus:outline-none font-sans"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Synchronizing...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Manifest Updates
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
