"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShieldAlert, CheckCircle2, Loader2 } from "lucide-react";
import { confirmDonation } from "@/lib/actions/admin";
import { useToast } from "@/components/ui/Toast";

export default function DonationConfirmModal({ requestId, user }) {
  const router = useRouter();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleConfirmDonation = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const result = await confirmDonation(requestId, user.name, user.email);

      if (result?.success) {
        setIsOpen(false);
        toast.success("Thank you! You have successfully volunteered for this request. 🩸");
        router.refresh();
      } else {
        toast.error(result?.message || "Could not complete donation confirmation.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl transition shadow-sm flex items-center gap-2 focus:outline-none font-sans"
      >
        <Heart className="w-4 h-4 fill-white" /> Donate 🩸
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 mb-4 pb-2 border-b border-border/60">
              <div className="p-2 bg-rose-50 border border-rose-100 rounded-xl">
                <Heart className="w-5 h-5 fill-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground font-heading">
                  Confirm Blood Donation
                </h3>
                <p className="text-[11px] text-muted-foreground font-sans">
                  You are volunteering to save a life
                </p>
              </div>
            </div>

            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-start gap-2 text-xs leading-relaxed font-sans">
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
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-sans">
                  Volunteer Name
                </label>
                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full bg-muted border border-border rounded-xl px-3.5 py-2 text-xs font-semibold text-foreground/70 cursor-not-allowed font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-sans">
                  Volunteer Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full bg-muted border border-border rounded-xl px-3.5 py-2 text-xs font-semibold text-foreground/70 cursor-not-allowed font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-2 mt-6 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={submitLoading}
                  className="px-4 py-2 text-xs font-semibold bg-muted border border-border rounded-xl font-sans"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="px-5 py-2 text-xs font-bold bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition flex items-center justify-center gap-1.5 font-sans"
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
    </>
  );
}
