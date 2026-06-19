"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  Hospital,
  MessageSquare,
  Loader2,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { confirmDonation } from "@/lib/actions/admin";
import { getDonationRequestById } from "@/lib/api/requests";

export default function DonationRequestsDetails() {
  const router = useRouter();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const initializePage = async () => {
      setLoading(true);
      try {
        const session = await authClient.getSession();
        if (!session || !session.data?.user) {
          router.push(`/login?callbackUrl=/donation-requests/${id}`);
          return;
        }
        setUser(session.data.user);

        const data = await getDonationRequestById(id);
        setRequest(data);
      } catch (err) {
        setError(err.message || "Failed to load request details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) initializePage();
  }, [id, router]);

  const handleConfirmDonation = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const result = await confirmDonation(id, user.name, user.email);

      if (result?.success) {
        setDonateModalOpen(false);
        setRequest((prev) => ({
          ...prev,
          donationStatus: "inprogress",
          donorName: user.name,
          donorEmail: user.email,
        }));
        alert(
          "Thank you! You have successfully volunteered for this request. 🩸",
        );
      } else {
        alert(result?.message || "Could not complete donation confirmation.");
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "An error occurred. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-3">
        <Loader2 className="w-9 h-9 animate-spin text-rose-600" />
        <p className="text-xs text-muted-foreground font-medium animate-pulse">
          Loading secure medical lifelines...
        </p>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="max-w-md mx-auto p-4 mt-12 text-center bg-rose-50 border border-rose-100 rounded-2xl">
        <p className="text-sm text-rose-700 font-semibold">
          {error || "Request not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-2 sm:p-4">
      <div className="bg-background border border-border p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider bg-muted px-2 py-0.5 rounded">
            Emergency Case File
          </span>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground mt-1.5">
            Request for {request.recipientName}
          </h1>
        </div>
        <div>
          <span
            className={`px-3 py-1 border rounded-full text-xs font-bold capitalize ${
              request.donationStatus === "pending"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : request.donationStatus === "inprogress"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : request.donationStatus === "done"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-stone-50 text-stone-600 border-stone-200"
            }`}
          >
            Status: {request.donationStatus}
          </span>
        </div>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden divide-y divide-border/60">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/10">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 shrink-0">
              <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                Required Blood Group
              </p>
              <h3 className="text-xl font-black text-rose-700">
                {request.bloodGroup}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 shrink-0">
              <Hospital className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                Medical Hospital Destination
              </p>
              <h3 className="text-sm font-bold text-foreground line-clamp-1">
                {request.hospitalName}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> Date & Timeline Parameters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-border p-3 rounded-xl flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground opacity-60" />
              <div>
                <p className="text-[10px] text-muted-foreground">
                  Donation Date
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {request.donationDate}
                </p>
              </div>
            </div>
            <div className="border border-border p-3 rounded-xl flex items-center gap-3">
              <Clock className="w-4 h-4 text-muted-foreground opacity-60" />
              <div>
                <p className="text-[10px] text-muted-foreground">
                  Expected Time
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {request.donationTime}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> Geographic Target Address
          </h3>
          <div className="space-y-1 bg-muted/30 p-3.5 rounded-xl border border-border/40 text-sm">
            <p className="font-semibold text-foreground flex items-center gap-1">
              {request.recipientUpazila}, {request.recipientDistrict}
            </p>
            <p className="text-xs text-muted-foreground pl-0 mt-1 flex items-start gap-1">
              <span className="font-medium text-foreground shrink-0">
                Full Address:
              </span>{" "}
              {request.fullAddress}
            </p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              Posted By
            </p>
            <p className="text-sm font-semibold text-foreground mt-0.5">
              {request.requesterName}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              Contact Email
            </p>
            <p className="text-sm font-semibold text-muted-foreground mt-0.5 truncate">
              {request.requesterEmail}
            </p>
          </div>
        </div>

        {request.requestMessage && (
          <div className="p-6 space-y-2">
            <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> Message / Case Details
            </h3>
            <p className="text-xs text-muted-foreground bg-muted/40 p-4 border border-border/60 rounded-xl leading-relaxed italic">
              &ldquo;{request.requestMessage}&rdquo;
            </p>
          </div>
        )}

        <div className="p-6 bg-muted/20 flex justify-end">
          {request.donationStatus === "pending" ? (
            <button
              onClick={() => setDonateModalOpen(true)}
              className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl transition shadow-sm flex items-center gap-2 focus:outline-none"
            >
              <Heart className="w-4 h-4 fill-white" /> Donate 🩸
            </button>
          ) : (
            <div className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 border border-border bg-background px-4 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              This request is currently being handled by{" "}
              <span className="text-foreground font-semibold">
                {request.donorName || "another volunteer"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Modal Popup Component */}
      {donateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 mb-4 pb-2 border-b border-border/60">
              <div className="p-2 bg-rose-50 border border-rose-100 rounded-xl">
                <Heart className="w-5 h-5 fill-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Confirm Blood Donation
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  You are volunteering to save a life
                </p>
              </div>
            </div>

            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-start gap-2 text-xs leading-relaxed">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <p>
                By clicking confirm, you accept this responsibility. The request
                status will change from{" "}
                <span className="font-bold">Pending</span> to{" "}
                <span className="font-bold">In Progress</span>.
              </p>
            </div>

            <form onSubmit={handleConfirmDonation} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Volunteer Name
                </label>
                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full bg-muted border border-border rounded-xl px-3.5 py-2 text-xs font-semibold text-foreground/70 cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Volunteer Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full bg-muted border border-border rounded-xl px-3.5 py-2 text-xs font-semibold text-foreground/70 cursor-not-allowed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 mt-6 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setDonateModalOpen(false)}
                  disabled={submitLoading}
                  className="px-4 py-2 text-xs font-semibold bg-muted border border-border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="px-5 py-2 text-xs font-bold bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition flex items-center justify-center gap-1.5"
                >
                  {submitLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Confirm Donate
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
