"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
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
} from "lucide-react";
import {
  getUserDonationRequests,
  deleteDonationRequest,
} from "@/lib/actions/requests";

export default function MyDonationRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetRequestId, setTargetRequestId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Filtering and Pagination States
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Global click tracker handles closing active menus safely on outside interaction
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Find out if the user clicked inside an active dropdown trigger element
      if (event.target.closest(".menu-trigger-container")) {
        return;
      }
      setOpenMenuId(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchDonationRequests();
  }, [statusFilter, currentPage]);

  const fetchDonationRequests = async () => {
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
      setError(err.message || "An error occurred fetching data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset tracking window page offset back to initial step
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
      fetchDonationRequests();
      setDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error securely deleting structural component.");
    } finally {
      setActionLoading(null);
      setTargetRequestId(null);
    }
  };

  // Helper status color rendering utilities
  const getStatusBadge = (status) => {
    const systemStyles = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      inprogress: "bg-blue-50 text-blue-700 border-blue-200",
      done: "bg-emerald-50 text-emerald-700 border-emerald-200",
      canceled: "bg-stone-50 text-stone-600 border-stone-200",
    };
    return (
      <span
        className={`px-2.5 py-1 text-xs font-semibold border rounded-full capitalize ${systemStyles[status] || "bg-muted text-muted-foreground"}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-2">
      {/* Page Header and Filtering Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background border border-border p-5 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            My Donation Requests 🩸
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage and track your emergency blood requests timeline
          </p>
        </div>

        {/* Filter Selection Input Group */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Filter className="w-4 h-4 text-muted-foreground opacity-70" />
          <select
            value={statusFilter}
            onChange={handleFilterChange}
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

      {/* Error State Banner */}
      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl">
          {error}
        </div>
      )}

      {/* Table Workspace Content Loader Layout container */}
      <div className="bg-background border border-border rounded-2xl shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary opacity-80" />
            <p className="text-xs text-muted-foreground animate-pulse">
              Loading donation log datasets...
            </p>
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3">
              ✕
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              No Request Records Found
            </h3>
            <p className="text-xs text-muted-foreground max-w-xs mt-1">
              You haven't posted any request lines matching the selected
              validation filter parameters.
            </p>
          </div>
        ) : (
          <div>
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
                    className="hover:bg-muted/20 transition-colors"
                  >
                    {/* Recipient Basic Name Profile */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">
                        {request.recipientName}
                      </p>
                      <p
                        className="text-[11px] text-muted-foreground max-w-[180px] truncate mt-0.5"
                        title={request.requestMessage}
                      >
                        {request.requestMessage}
                      </p>
                    </td>

                    {/* Regional Geo Mapping Metrics */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5 text-xs text-foreground/90">
                        <p className="font-medium flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          {request.hospitalName}
                        </p>
                        <p className="text-muted-foreground pl-4.5">
                          {request.recipientUpazila},{" "}
                          {request.recipientDistrict}
                        </p>
                      </div>
                    </td>

                    {/* Critical Blood Groups Indicator badges */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-100">
                        <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                        {request.bloodGroup}
                      </span>
                    </td>

                    {/* Operational Timing parameters */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5 text-xs text-muted-foreground">
                        <p className="flex items-center gap-1 text-foreground/80 font-medium">
                          <Calendar className="w-3.5 h-3.5 opacity-60" />
                          {request.donationDate}
                        </p>
                        <p className="flex items-center gap-1 pl-4.5">
                          <Clock className="w-3.5 h-3.5 opacity-40" />
                          {request.donationTime}
                        </p>
                      </div>
                    </td>

                    {/* Stateful Validation Labels pill output */}
                    <td className="px-6 py-4">
                      {getStatusBadge(request.donationStatus)}
                    </td>

                    {/* Conditional donor mapping profiles */}
                    <td className="px-6 py-4">
                      {request.donorName ? (
                        <div className="text-xs">
                          <p className="font-medium text-foreground">
                            {request.donorName}
                          </p>
                          <p className="text-muted-foreground opacity-80 text-[11px]">
                            {request.donorEmail}
                          </p>
                        </div>
                      ) : (
                        <span className="text-xs italic text-muted-foreground/60">
                          Awaiting Donor
                        </span>
                      )}
                    </td>

                    {/* Actions Dropdown Wrapper */}
                    <td className="px-6 py-4 text-right relative menu-trigger-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Stop bubbling immediately
                          setOpenMenuId(
                            openMenuId === request._id ? null : request._id,
                          );
                        }}
                        className={`p-1.5 rounded-lg border transition ${
                          openMenuId === request._id
                            ? "bg-muted border-border text-foreground"
                            : "border-transparent hover:bg-muted text-muted-foreground"
                        }`}
                        aria-label="Toggle actions menu"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {openMenuId === request._id && (
                        <div className="absolute right-6 top-12 w-40 bg-background border border-border rounded-xl shadow-lg z-20 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                          <Link
                            href={`/dashboard/donation-requests/view/${request._id}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition text-left"
                          >
                            <Eye className="w-4 h-4 text-muted-foreground" />
                            View Details
                          </Link>
                          <Link
                            href={`/dashboard/donation-requests/edit/${request._id}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition text-left"
                          >
                            <Edit className="w-4 h-4 text-blue-500" />
                            Edit Request
                          </Link>
                          <button
                            onClick={() => openDeleteModal(request._id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 transition text-left border-t border-border/40"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION INTERACTION ACTION FOOTER */}
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
                className="inline-flex items-center justify-center p-1.5 border border-border rounded-lg bg-background hover:bg-muted text-muted-foreground disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center p-1.5 border border-border rounded-lg bg-background hover:bg-muted text-muted-foreground disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal Overlay */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-background border border-border rounded-2xl max-w-sm w-full p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="p-2 bg-rose-50 border border-rose-100 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Confirm Deletion
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to permanently erase this donation request
              entry from database logs? This action cannot be reverted.
            </p>
            <div className="flex items-center justify-end gap-2 mt-5 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium bg-muted border border-border rounded-xl hover:bg-muted/80 transition"
              >
                Cancel
              </button>
              <button
                type="button"
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
    </div>
  );
}
