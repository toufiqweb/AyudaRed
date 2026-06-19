"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Filter,
} from "lucide-react";
import {
  managementUpdateStatus,
  adminDeleteDonationRequest,
} from "@/lib/actions/admin";
import { getAllDonationRequests, getCurrentUserRole } from "@/lib/api/admin";
import { useToast, ToastContainer } from "@/components/ui/Toast";
import Pagination from "@/components/ui/Pagination";

export default function AllBloodDonationRequestsPage() {
  const { toasts, showToast, removeToast } = useToast();
  const [userRole, setUserRole] = useState("volunteer");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const handleClickOutside = () => {
      if (openMenuId !== null) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenuId]);

  // Fetch current user role securely server-side
  useEffect(() => {
    const checkRole = async () => {
      try {
        const role = await getCurrentUserRole();
        if (role) setUserRole(role);
      } catch (err) {
        console.error("Error fetching user role:", err);
      }
    };
    checkRole();
  }, []);

  const fetchAllRequests = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getAllDonationRequests(
        statusFilter,
        currentPage,
        itemsPerPage,
      );
      if (result.success) {
        setRequests(result.data || []);
        setTotalPages(result.pagination?.totalPages || 1);
      }
    } catch (err) {
      setError(err.message || "Failed to load requests dataset.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, currentPage, itemsPerPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAllRequests();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchAllRequests]);

  const handleUpdateStatus = async (id, status) => {
    setActionLoadingId(id);
    setOpenMenuId(null);
    try {
      await managementUpdateStatus(id, status);
      showToast(
        status === "done"
          ? "Marked as Done successfully! ✅"
          : "Donation canceled.",
        "success",
      );
      fetchAllRequests();
    } catch (err) {
      showToast(err.message || "Failed to update status.", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async () => {
    if (!targetId) return;
    try {
      await adminDeleteDonationRequest(targetId);
      showToast("Donation request deleted.", "success");
      setDeleteModalOpen(false);
      fetchAllRequests();
    } catch (err) {
      showToast(err.message || "Failed to delete.", "error");
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
        className={`px-2.5 py-0.5 text-xs font-semibold border rounded-full capitalize ${styles[status] || ""}`}
      >
        {status}
      </span>
    );
  };

  // ডাইনামিক প্যাজিনেশন নাম্বার জেনারেটর (ইমেজ-১ এর ডিজাইন অনুযায়ী)
  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span
            key={`dots-${index}`}
            className="px-2 text-sm text-muted-foreground tracking-widest select-none"
          >
            ...
          </span>
        );
      }
      return (
        <button
          key={`page-${page}`}
          onClick={() => setCurrentPage(page)}
          className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs sm:text-sm font-semibold rounded-full transition-all ${
            currentPage === page
              ? "bg-rose-50 text-rose-600 font-bold shadow-sm scale-105"
              : "text-slate-600 hover:bg-muted"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-2 sm:p-4 min-h-screen flex flex-col justify-between">
      <div className="space-y-6">
        {/* Title Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background border border-border p-5 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              All Blood Donation Requests 🩸
            </h1>
            <p className="text-xs text-muted-foreground">
              {userRole === "admin"
                ? "Full administrative access to govern and modify all users' blood requests."
                : "Volunteer monitoring dashboard. Authorized to view and update request status flags only."}
            </p>
          </div>

          {/* Filters Selectors Row */}
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

        {/* Main Table Structure */}
        <div className="bg-background border border-border rounded-2xl shadow-sm overflow-visible">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-rose-500 opacity-80" />
              <p className="text-xs text-muted-foreground">
                Fetching complete request directories...
              </p>
            </div>
          ) : requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <h3 className="text-sm font-semibold text-foreground">
                No Donation Requests Found
              </h3>
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
                    <th className="px-6 py-3.5">Assigned Donor</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-sm">
                  {requests.map((request) => (
                    <tr
                      key={request._id}
                      className="hover:bg-muted/10 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-foreground">
                        {request.recipientName}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-xs text-foreground/90">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <span>
                            {request.recipientUpazila},{" "}
                            {request.recipientDistrict}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
                          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                          {request.bloodGroup}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-0.5 text-xs text-muted-foreground">
                          <p className="flex items-center gap-1 text-foreground/80 font-medium">
                            <Calendar className="w-3.5 h-3.5 opacity-60" />{" "}
                            {request.donationDate}
                          </p>
                          <p className="flex items-center gap-1 pl-4.5">
                            <Clock className="w-3.5 h-3.5 opacity-40" />{" "}
                            {request.donationTime}
                          </p>
                        </div>
                      </td>

                      {/* Status badge column (বাটন দুটি রিমুভ করা হয়েছে) */}
                      <td className="px-6 py-4">
                        {getStatusBadge(request.donationStatus)}
                      </td>

                      <td className="px-6 py-4 text-xs">
                        {request.donationStatus === "inprogress" &&
                        request.donorName ? (
                          <div>
                            <p className="font-medium text-foreground">
                              {request.donorName}
                            </p>
                            <p className="text-muted-foreground text-[11px]">
                              {request.donorEmail}
                            </p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground/60 italic">
                            —
                          </span>
                        )}
                      </td>

                      {/* Actions 3-dot dropdown */}
                      {/* Actions 3-dot dropdown */}
                      <td className="px-6 py-4 text-right relative">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenMenuId((prev) =>
                              prev === request._id ? null : request._id,
                            );
                          }}
                          disabled={actionLoadingId === request._id}
                          className="p-1.5 rounded-lg border border-transparent hover:bg-muted text-muted-foreground transition focus:outline-none inline-flex items-center justify-center disabled:opacity-40"
                        >
                          {actionLoadingId === request._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <MoreVertical className="w-4 h-4" />
                          )}
                        </button>

                        {openMenuId === request._id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-6 bottom-full mb-1 w-52 bg-background border border-border rounded-xl shadow-xl z-50 py-1.5 text-left origin-bottom-right animate-in fade-in zoom-in-95 duration-100"
                          >
                            {/* View Details */}
                            <Link
                              href={`/dashboard/donation-requests/view/${request._id}`}
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition"
                            >
                              <Eye className="w-3.5 h-3.5 text-muted-foreground" />{" "}
                              View Details
                            </Link>

                            {/* Edit + Delete — admin only */}
                            {userRole === "admin" && (
                              <>
                                <Link
                                  href={`/dashboard/donation-requests/edit/${request._id}`}
                                  onClick={() => setOpenMenuId(null)}
                                  className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition"
                                >
                                  <Edit className="w-3.5 h-3.5 text-blue-500" />{" "}
                                  Edit Request
                                </Link>
                                <button
                                  onClick={() => {
                                    setTargetId(request._id);
                                    setDeleteModalOpen(true);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 transition border-t border-border/40"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Delete
                                  Request
                                </button>
                              </>
                            )}

                            {/* Status controls inside dropdown menu */}
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
      </div>

      {/* Pagination */}
      {!loading && requests.length > 0 && totalPages > 1 && (
        <div className="flex justify-center py-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Delete Confirmation Modal (Only accessible for admins) */}
      {deleteModalOpen && userRole === "admin" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl max-w-sm w-full p-5 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2.5 text-rose-600 mb-2.5">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-foreground">
                Confirm Permanent Erase
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to delete this donation request? This action
              cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-border">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-3 py-1.5 text-xs bg-muted border border-border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 text-xs bg-rose-600 text-white rounded-lg hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
