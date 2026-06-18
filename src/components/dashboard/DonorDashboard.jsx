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
import { useToast, ToastContainer } from "@/components/ui/Toast";

export default function DonorDashboard({ user }) {
  const { toasts, showToast, removeToast } = useToast();
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
    if (user?.email) fetchRecentRequests();
  }, [user?.email, fetchRecentRequests]);

  const handleUpdateStatus = async (id, nextStatus) => {
    setActionLoading(id);
    setOpenMenuId(null);
    try {
      await updateDonationRequestStatus(id, nextStatus);
      showToast(
        nextStatus === "done"
          ? "Request marked as Done! ✅"
          : "Donation cancelled successfully.",
        "success"
      );
      fetchRecentRequests();
    } catch (err) {
      showToast(err.message || "Failed to update status.", "error");
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
      showToast("Request deleted successfully.", "success");
      fetchRecentRequests();
      setDeleteModalOpen(false);
    } catch (err) {
      showToast(err.message || "Failed to delete.", "error");
    } finally {
      setActionLoading(null);
      setTargetRequestId(null);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      inprogress: "bg-blue-50 text-blue-700 border-blue-200",
      done: "bg-emerald-50 text-emerald-700 border-emerald-200",
      canceled: "bg-stone-50 text-stone-600 border-stone-200",
    };
    return (
      <span className={`px-2.5 py-1 text-xs font-semibold border rounded-full capitalize ${config[status] || "bg-muted"}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-2">
      {/* Recent Donation Requests (hidden if none) */}
      {requests.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              Recent Donation Requests
            </h2>
            <p className="text-xs text-muted-foreground">
              Quick view of your 3 most recent entries
            </p>
          </div>

          <div className="bg-background border border-border rounded-2xl shadow-sm overflow-visible">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/50 border-b border-border text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                    <th className="px-5 py-3.5">Recipient</th>
                    <th className="px-5 py-3.5">Location</th>
                    <th className="px-5 py-3.5">Schedule</th>
                    <th className="px-5 py-3.5 text-center">Blood</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Donor Info</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {requests.map((request) => (
                    <tr key={request._id} className="hover:bg-muted/20 transition">
                      <td className="px-5 py-4 font-medium text-foreground">
                        {request.recipientName}
                      </td>

                      <td className="px-5 py-4 text-muted-foreground">
                        <div className="flex items-center gap-1 text-xs">
                          <MapPin className="w-3.5 h-3.5 shrink-0 opacity-60 text-primary" />
                          <span>
                            {request.recipientUpazila}, {request.recipientDistrict}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-xs space-y-1 text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 opacity-60" />
                          <span>{request.donationDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 opacity-60" />
                          <span>{request.donationTime}</span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold bg-red-50 text-red-700 border border-red-100 rounded">
                          <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                          {request.bloodGroup}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {getStatusBadge(request.donationStatus)}
                      </td>

                      <td className="px-5 py-4 text-xs max-w-[140px]">
                        {request.donationStatus === "inprogress" && request.donorName ? (
                          <div className="space-y-0.5 text-muted-foreground">
                            <p className="font-semibold text-foreground truncate">{request.donorName}</p>
                            <p className="text-[11px] opacity-80 truncate">{request.donorEmail}</p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground/40 italic">—</span>
                        )}
                      </td>

                      {/* 3-dot dropdown with status-based actions */}
                      <td className="px-5 py-4 text-right relative donor-menu-container">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId((prev) => prev === request._id ? null : request._id);
                          }}
                          disabled={actionLoading === request._id}
                          className="p-1.5 rounded-lg border border-transparent hover:bg-muted text-muted-foreground transition focus:outline-none inline-flex items-center justify-center disabled:opacity-40"
                        >
                          {actionLoading === request._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <MoreVertical className="w-4 h-4" />
                          )}
                        </button>

                        {openMenuId === request._id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-5 top-12 w-52 bg-background border border-border rounded-xl shadow-xl z-50 py-1.5 text-left origin-top-right animate-in fade-in zoom-in-95 duration-100"
                          >
                            <Link
                              href={`/dashboard/donation-requests/view/${request._id}`}
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition"
                            >
                              <Eye className="w-3.5 h-3.5 text-muted-foreground" /> View Details
                            </Link>
                            <Link
                              href={`/dashboard/donation-requests/edit/${request._id}`}
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition"
                            >
                              <Edit className="w-3.5 h-3.5 text-blue-500" /> Edit Request
                            </Link>
                            <button
                              onClick={() => openDeleteModal(request._id)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 transition border-t border-border/40"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete Request
                            </button>

                            {request.donationStatus === "inprogress" && (
                              <>
                                <button
                                  onClick={() => handleUpdateStatus(request._id, "done")}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-emerald-700 hover:bg-emerald-50 transition border-t border-border/40"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Mark as Done
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(request._id, "canceled")}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-stone-600 hover:bg-stone-50 transition"
                                >
                                  <XCircle className="w-3.5 h-3.5 text-stone-500" /> Cancel Donation
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* View All Requests Button */}
          <div className="flex justify-center pt-2">
            <Link
              href="/dashboard/my-donation-requests"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-muted border border-border rounded-xl hover:bg-muted/80 transition shadow-sm group text-foreground"
            >
              View My All Requests
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl max-w-sm w-full p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="p-2 bg-rose-50 border border-rose-100 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">Confirm Deletion</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to permanently delete this donation request? This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 mt-5 border-t border-border pt-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium bg-muted border border-border rounded-xl hover:bg-muted/80 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={actionLoading !== null}
                className="px-4 py-2 text-sm font-medium bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition disabled:opacity-50 min-w-[120px] flex items-center justify-center"
              >
                {actionLoading !== null ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
