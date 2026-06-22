"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShieldAlert,
  CheckCircle2,
  Loader2,
  X,
  User,
  Mail,
} from "lucide-react";
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
      const result = await confirmDonation(requestId, user?.name, user?.email);

      if (result?.success) {
        setIsOpen(false);
        toast.success(
          "Thank you! You have successfully volunteered for this request.",
        );
        router.refresh();
      } else {
        toast.error(
          result?.message || "Could not complete donation confirmation.",
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      {/* MAIN TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center gap-2 focus:outline-none font-sans"
      >
        <Heart className="w-4 h-4 fill-current" /> Initialize Dispatch Protocol
      </button>

      {/* OVERLAY AND MODAL ARCHITECTURE */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-200">
          <div
            className="bg-background border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Background Accent Mesh */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl -z-10 pointer-events-none" />

            {/* Absolute Close Vector */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-secondary-foreground/40 hover:text-foreground hover:bg-secondary border border-transparent hover:border-border transition-colors"
              disabled={submitLoading}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Content Node */}
            <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-border/60">
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl text-primary shrink-0">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-foreground font-heading tracking-tight">
                  Confirm Assignment Dispatch
                </h3>
                <p className="text-[10px] font-bold text-secondary-foreground/40 uppercase tracking-widest font-sans mt-0.5">
                  Life-Saving Logistical Commitment
                </p>
              </div>
            </div>

            {/* Warning Strategy Notice Banner */}
            <div className="mb-5 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 rounded-xl flex items-start gap-3 text-xs leading-relaxed font-sans">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold uppercase tracking-wider text-[9px] opacity-80">
                  Irreversible Action Warning
                </p>
                <p className="text-secondary-foreground/80 font-medium">
                  By executing validation, you accept active handling
                  assignment. The target state vector flags update from{" "}
                  <span className="font-bold text-foreground">Pending</span> to{" "}
                  <span className="font-bold text-primary">In Progress</span>.
                </p>
              </div>
            </div>

            {/* Form & Identity Pipeline */}
            <form onSubmit={handleConfirmDonation} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary-foreground/40 font-sans flex items-center gap-1.5">
                  <User className="w-3 h-3 text-primary" /> Volunteer Node
                  Identity
                </label>
                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full bg-secondary/40 border border-border/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-foreground/70 cursor-not-allowed focus:outline-none font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary-foreground/40 font-sans flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-primary" /> Communications
                  Endpoint
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full bg-secondary/40 border border-border/80 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-foreground/70 cursor-not-allowed focus:outline-none font-sans"
                />
              </div>

              {/* Action Vectors Footer */}
              <div className="flex items-center justify-end gap-2.5 mt-6 border-t border-border/60 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={submitLoading}
                  className="px-4 py-2.5 text-xs font-bold bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border rounded-xl font-sans transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="px-5 py-2.5 text-xs font-bold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition flex items-center justify-center gap-1.5 font-sans min-w-[120px]"
                >
                  {submitLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Commit Allocation
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
