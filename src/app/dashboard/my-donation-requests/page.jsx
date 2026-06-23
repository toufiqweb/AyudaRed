"use client";
import { useState, useEffect, useCallback } from "react";
import { Filter, Loader2, Heart, AlertTriangle } from "lucide-react";
import {
  updateDonationRequestStatus,
  deleteDonationRequest,
} from "@/lib/actions/requests";
import { getUserDonationRequests } from "@/lib/api/requests";
import { useToast } from "@/components/ui/Toast";
import Pagination from "@/components/ui/Pagination";
import DonationRequestsTable from "@/components/shared/DonationRequestsTable";
import ErrorState from "@/components/ui/ErrorState";
import RoleGuard from "@/components/shared/RoleGuard";

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
      console.error(err);
      setError("We encountered an issue while loading donation requests. Please try again later.");
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
      console.error(err);
      toast.error("Failed to update status. Please try again.");
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
      console.error(err);
      toast.error("Failed to delete request. Please try again.");
    } finally {
      setActionLoading(null);
      setTargetRequestId(null);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
      inprogress: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
      done: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
      canceled: "bg-stone-50 text-stone-600 border-stone-200 dark:bg-zinc-500/10 dark:text-zinc-400 dark:border-zinc-500/20",
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
    <RoleGuard allowedRoles={["donor"]}>
      <div className="space-y-6 max-w-[1400px] mx-auto p-2">
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
        <ErrorState 
          title="Unable to load requests" 
          message={error} 
          onRetry={fetchDonationRequests} 
          className="my-4"
        />
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
            <DonationRequestsTable
              role="donor"
              variant="my-requests"
              requests={requests}
              actionLoadingId={actionLoading}
              onUpdateStatus={handleUpdateStatus}
              onDeleteTrigger={openDeleteModal}
            />
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
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400 mb-3">
              <div className="p-2 bg-rose-50 border border-rose-100 rounded-xl dark:bg-rose-500/10 dark:border-rose-500/20">
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
    </RoleGuard>
  );
}
