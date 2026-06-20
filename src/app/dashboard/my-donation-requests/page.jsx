"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Filter,
  Loader2,
  MapPin,
  Calendar,
  Clock,
  Heart,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  updateDonationRequestStatus,
  deleteDonationRequest,
} from "@/lib/actions/requests";
import { getUserDonationRequests } from "@/lib/api/requests";
import { useToast } from "@/components/ui/Toast";
import Pagination from "@/components/ui/Pagination";

export default function MyDonationRequestsPage() {
  const toast = useToast();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetRequestId, setTargetRequestId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-trigger-container")) setOpenMenuId(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const fetchDonationRequests = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getUserDonationRequests(
        statusFilter,
        currentPage,
        itemsPerPage,
      );
      setRequests(result.data || []);
      setTotalPages(result.pagination?.totalPages || 1);
    } catch (err) {
      setError(err.message || "Failed to load donation requests.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDonationRequests();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchDonationRequests]);

  const handleUpdateStatus = async (id, nextStatus) => {
    setActionLoading(id);
    setOpenMenuId(null);
    try {
      await updateDonationRequestStatus(id, nextStatus);
      toast.success(
        nextStatus === "done"
          ? "Request marked as Done! ✅"
          : "Donation canceled successfully.",
      );
      fetchDonationRequests();
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
      toast.success("Donation request deleted successfully.");
      fetchDonationRequests();
      setDeleteModalOpen(false);
    } catch (err) {
      toast.error(err.message || "Failed to delete request.");
    } finally {
      setActionLoading(null);
      setTargetRequestId(null);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      inprogress: "bg-blue-50 text-blue-700 border-blue-200",
      done: "bg-emerald-50 text-emerald-700 border-emerald-200",
      canceled: "bg-stone-50 text-stone-600 border-stone-200",
    };
    return (
      <span
        className={`px-2.5 py-1 text-xs font-semibold border rounded-full capitalize ${styles[status] || "bg-muted text-muted-foreground"}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-2">
      {/* Header + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background border border-border p-5 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 font-heading">
            My Donation Requests 🩸
          </h1>
          <p className="text-xs text-muted-foreground font-body">
            Manage and track your emergency blood requests timeline
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Filter className="w-4 h-4 text-muted-foreground opacity-70" />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-background border border-border rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-visible">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary opacity-80" />
            <p className="text-xs text-muted-foreground animate-pulse font-body">
              Loading donation records...
            </p>
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <Heart className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <h3 className="text-sm font-semibold text-foreground font-heading">
              No Request Records Found
            </h3>
            <p className="text-xs text-muted-foreground max-w-xs mt-1 font-body">
              No requests match the selected filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                  <th className="px-6 py-3.5">Recipient</th>
                  <th className="px-6 py-3.5">Location</th>
                  <th className="px-6 py-3.5">Blood Group</th>
                  <th className="px-6 py-3.5">Schedule</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Donor Info</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm">
                {requests.map((request) => (
                  <tr
                    key={request._id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground font-body">
                        {request.recipientName}
                      </p>
                      {request.requestMessage && (
                        <p className="text-[11px] text-muted-foreground max-w-[160px] truncate mt-0.5 font-body">
                          {request.requestMessage}
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-0.5 text-xs text-foreground/90">
                        <p className="font-medium flex items-center gap-1 font-body">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          {request.hospitalName}
                        </p>
                        <p className="text-muted-foreground pl-[18px] font-body">
                          {request.recipientUpazila},{" "}
                          {request.recipientDistrict}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-100">
                        <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                        {request.bloodGroup}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-0.5 text-xs text-muted-foreground">
                        <p className="flex items-center gap-1 text-foreground/80 font-medium font-body">
                          <Calendar className="w-3.5 h-3.5 opacity-60" />{" "}
                          {request.donationDate}
                        </p>
                        <p className="flex items-center gap-1 pl-[18px] font-body">
                          <Clock className="w-3.5 h-3.5 opacity-40" />{" "}
                          {request.donationTime}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {getStatusBadge(request.donationStatus)}
                    </td>

                    <td className="px-6 py-4 text-xs">
                      {request.donationStatus === "inprogress" &&
                      request.donorName ? (
                        <div>
                          <p className="font-medium text-foreground font-body">
                            {request.donorName}
                          </p>
                          <p className="text-muted-foreground text-[11px] font-body">
                            {request.donorEmail}
                          </p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground/50 italic">
                          —
                        </span>
                      )}
                    </td>

                    {/* 3-dot dropdown — status-based actions */}
                    <td className="px-6 py-4 text-right relative menu-trigger-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId((prev) =>
                            prev === request._id ? null : request._id,
                          );
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
                          className="absolute right-6 top-12 w-52 bg-background border border-border rounded-xl shadow-xl z-50 py-1.5 text-left origin-top-right animate-in fade-in zoom-in-95 duration-100"
                        >
                          {/* View — always visible */}
                          <Link
                            href={`/donation-requests/${request._id}`}
                            onClick={() => setOpenMenuId(null)}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition"
                          >
                            <Eye className="w-3.5 h-3.5 text-muted-foreground" />{" "}
                            View Details
                          </Link>

                          {/* Edit — always visible */}
                          <Link
                            href={`/dashboard/donation-requests/edit/${request._id}`}
                            onClick={() => setOpenMenuId(null)}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition"
                          >
                            <Edit className="w-3.5 h-3.5 text-blue-500" /> Edit
                            Request
                          </Link>

                          {/* Delete — always visible */}
                          <button
                            onClick={() => openDeleteModal(request._id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 transition border-t border-border/40"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete Request
                          </button>

                          {/* Mark as Done + Cancel — only for inprogress */}
                          {request.donationStatus === "inprogress" && (
                            <>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(request._id, "done")
                                }
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-emerald-700 hover:bg-emerald-50 transition border-t border-border/40"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{" "}
                                Mark as Done
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(request._id, "canceled")
                                }
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-stone-600 hover:bg-stone-50 transition"
                              >
                                <XCircle className="w-3.5 h-3.5 text-stone-500" />{" "}
                                Cancel Donation
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
        )}
      </div>

      {/* Pagination */}
      {!loading && requests.length > 0 && totalPages > 1 && (
        <div className="flex justify-center py-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
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
              <h3 className="text-base font-bold text-foreground font-heading">
                Confirm Deletion
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-body">
              Are you sure you want to permanently delete this donation request?
              This action cannot be reverted.
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
                className="px-4 py-2 text-sm font-medium bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition shadow-sm disabled:opacity-50 min-w-[120px] flex items-center justify-center"
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

      {/* Global toast provider handles the container now */}
    </div>
  );
}
