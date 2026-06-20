"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Heart,
  MoreVertical,
} from "lucide-react";
import {
  updateDonationRequestStatus,
  deleteDonationRequest,
} from "@/lib/actions/requests";
import { getUserDonationRequests } from "@/lib/api/requests";
import { useToast } from "../ui/Toast";
import DonationRequestsTable from "@/components/ui/DonationRequestsTable";

export default function DonorDashboard({ user }) {
  const toast = useToast();
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetRequestId, setTargetRequestId] = useState(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".donor-menu-container")) setOpenMenuId(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const fetchRecentRequests = useCallback(async () => {
    try {
      const result = await getUserDonationRequests("all", 1, 3);
      if (result.success) setRequests(result.data || []);
    } catch (err) {
      console.error("Error loading recent requests:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.email) {
      const timer = setTimeout(() => {
        fetchRecentRequests();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [user?.email, fetchRecentRequests]);

  const handleUpdateStatus = async (id, nextStatus) => {
    setActionLoading(id);
    setOpenMenuId(null);
    try {
      await updateDonationRequestStatus(id, nextStatus);
      toast.success(
        nextStatus === "done"
          ? "Request marked as Done! ✅"
          : "Donation cancelled successfully.",
      );
      fetchRecentRequests();
    } catch (err) {
      toast.error(err.message || "Failed to update status.");
    } finally {
      setActionLoading(null);
    }
  };

  const openDeleteModal = (id) => {
    setTargetRequestId(id);
    setDeleteModalOpen(true);
    setOpenMenuId(null);
  };

  const handleConfirmDelete = async () => {
    if (!targetRequestId) return;
    setActionLoading(targetRequestId);
    try {
      await deleteDonationRequest(targetRequestId);
      toast.success("Request deleted successfully.");
      fetchRecentRequests();
      setDeleteModalOpen(false);
    } catch (err) {
      toast.error(err.message || "Failed to delete.");
    } finally {
      setActionLoading(null);
      setTargetRequestId(null);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      inprogress: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      done: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      canceled: "bg-muted text-muted-foreground border-border",
    };
    return (
      <span
        className={`px-2.5 py-1 text-xs font-semibold border rounded-full capitalize tracking-wide inline-flex items-center ${config[status] || "bg-muted"}`}
      >
        {status === "inprogress" ? "In Progress" : status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="relative flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary relative z-10" />
          <div className="absolute w-12 h-12 rounded-full border border-primary/20 animate-ping opacity-40" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6  text-foreground select-none">
      {/* Recent Donation Requests Header Section */}
      {requests.length > 0 && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-foreground font-heading flex items-center gap-2">
                Recent Donation Requests
              </h2>
              <p className="text-sm text-muted-foreground">
                Quick control panel of your 3 most recent entries
              </p>
            </div>
          </div>

          {/* Premium Glass-Style Table Container with Dropdown Safety */}
          <div className="bg-secondary/40 backdrop-blur-md border border-border/80 rounded-2xl shadow-xl overflow-visible relative">
            <div className="overflow-x-auto rounded-2xl overflow-visible">
              <DonationRequestsTable
                role="donor"
                variant="dashboard"
                requests={requests}
                actionLoadingId={actionLoading}
                onUpdateStatus={handleUpdateStatus}
                onDeleteTrigger={(id) => openDeleteModal(id)}
              />
            </div>
          </div>

          {/* Luxury View All Button */}
          <div className="flex justify-center pt-2">
            <Link
              href="/dashboard/my-donation-requests"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-secondary border border-border rounded-xl hover:bg-muted/60 hover:border-muted-foreground/30 transition-all shadow-md group text-foreground"
            >
              View My All Requests
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      )}

      {/* Premium Glass Blur Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-secondary border border-border rounded-2xl max-w-sm w-full p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-danger mb-4">
              <div className="p-2.5 bg-danger/10 border border-danger/20 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-danger" />
              </div>
              <h3 className="text-base font-bold text-foreground font-heading">
                Confirm Deletion
              </h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to permanently delete this donation request?
              This action is absolute and cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 mt-6 border-t border-border/60 pt-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2.5 text-xs font-semibold bg-muted border border-border rounded-xl text-foreground hover:bg-muted/80 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={actionLoading !== null}
                className="px-4 py-2.5 text-xs font-semibold bg-danger text-white border border-danger/20 rounded-xl hover:opacity-90 transition disabled:opacity-50 min-w-[120px] flex items-center justify-center shadow-md shadow-danger/10"
              >
                {actionLoading !== null ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Confirm Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
