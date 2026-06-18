"use client";

import { useState, useEffect } from "react";
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
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  getAllDonationRequests,
  managementUpdateStatus,
  adminDeleteDonationRequest,
  getCurrentUserRole,
} from "@/lib/actions/admin";

export default function AllBloodDonationRequestsPage() {
  const [userRole, setUserRole] = useState("volunteer"); // Default Safe fallback
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Controls
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Pagination & Filter States
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // 🛠️ গ্লোবাল ক্লিক ট্র্যাকার: বাইরে ক্লিক করলে মেনু ক্লোজ করার অপ্টিমাইজড লজিক
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

  const fetchAllRequests = async () => {
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
  };

  useEffect(() => {
    fetchAllRequests();
  }, [statusFilter, currentPage]);

  const handleUpdateStatus = async (id, status) => {
    setActionLoadingId(id);
    try {
      await managementUpdateStatus(id, status);
      fetchAllRequests();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to update status.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async () => {
    if (!targetId) return;
    try {
      await adminDeleteDonationRequest(targetId);
      setDeleteModalOpen(false);
      fetchAllRequests();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete request.");
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

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-2 sm:p-4">
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
            <Loader2 className="w-8 h-8 animate-spin text-red-500 opacity-80" />
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
                  <th className="px-6 py-3.5">Status & Quick Change</th>
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
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-100">
                        <Heart className="w-3 h-3 fill-red-500 text-red-500" />
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

                    {/* Status & Quick Action */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        {getStatusBadge(request.donationStatus)}

                        {request.donationStatus === "inprogress" && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                handleUpdateStatus(request._id, "done")
                              }
                              disabled={actionLoadingId === request._id}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded border border-emerald-200 transition"
                              title="Mark as Done"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateStatus(request._id, "canceled")
                              }
                              disabled={actionLoadingId === request._id}
                              className="p-1 text-rose-600 hover:bg-rose-50 rounded border border-rose-200 transition"
                              title="Cancel Request"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
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

                    {/* 🛠️ Actions Row: ৩-ডট মেনুর বাবলিং সমস্যা সম্পূর্ণ ফিক্সড করা হয়েছে */}
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation(); // ক্লিক প্রপাগেশন বন্ধ করে গ্লোবাল লিসেনারকে আটকানো হয়েছে
                          setOpenMenuId((prev) =>
                            prev === request._id ? null : request._id,
                          );
                        }}
                        className="p-1.5 rounded-lg border border-transparent hover:bg-muted text-muted-foreground transition focus:outline-none inline-flex items-center justify-center"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {openMenuId === request._id && (
                        <div
                          onClick={(e) => e.stopPropagation()} // ড্রপডাউনের ভেতর ক্লিক করলে যেন মেনু বন্ধ না হয়
                          className="absolute right-6 top-12 w-44 bg-background border border-border rounded-xl shadow-xl z-50 py-1.5 overflow-hidden text-left origin-top-right animate-in fade-in zoom-in-95 duration-100"
                        >
                          <Link
                            href={`/dashboard/donation-requests/view/${request._id}`}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition"
                          >
                            <Eye className="w-3.5 h-3.5 text-muted-foreground" />{" "}
                            View Details
                          </Link>

                          {/* 🔒 ROLE CONDITION: ভলান্টিয়ারদের জন্য রেস্ট্রিক্টেড অ্যাকশন হাইড করা হয়েছে */}
                          {userRole === "admin" && (
                            <>
                              <Link
                                href={`/dashboard/donation-requests/edit/${request._id}`}
                                className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition"
                              >
                                <Edit className="w-3.5 h-3.5 text-blue-500" />{" "}
                                Edit Request
                              </Link>
                              <button
                                onClick={() => {
                                  setTargetId(request._id);
                                  setDeleteModalOpen(true);
                                  setOpenMenuId(null); // মোডাল খোলার পর ড্রপডাউন অফ করবে
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 transition border-t border-border/40"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Delete
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

        {/* Pagination Section */}
        {!loading && requests.length > 0 && (
          <div className="px-6 py-4 border-t border-border bg-muted/20 flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground font-medium">
              Page{" "}
              <span className="text-foreground font-semibold">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="text-foreground font-semibold">
                {totalPages}
              </span>
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 border border-border rounded-lg bg-background hover:bg-muted disabled:opacity-40 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-1.5 border border-border rounded-lg bg-background hover:bg-muted disabled:opacity-40 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

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
    </div>
  );
}
