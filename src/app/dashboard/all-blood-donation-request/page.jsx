"use client";

import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, Loader2, Filter, Droplet } from "lucide-react";
import {
  managementUpdateStatus,
  adminDeleteDonationRequest,
} from "@/lib/actions/admin";
import { getAllDonationRequests, getCurrentUserRole } from "@/lib/api/admin";
import { useToast } from "@/components/ui/Toast";
import Pagination from "@/components/ui/Pagination";
import DonationRequestsTable from "@/components/shared/DonationRequestsTable";
import ErrorState from "@/components/ui/ErrorState";

export default function AllBloodDonationRequestsPage() {
  const toast = useToast();
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
      console.error(err);
      setError("We encountered an issue while loading requests data. Please try again later.");
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
      toast.success(
        status === "done" ? "Request marked as done." : "Donation canceled.",
      );
      fetchAllRequests();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async () => {
    if (!targetId) return;
    try {
      await adminDeleteDonationRequest(targetId);
      toast.success("Donation request deleted.");
      setDeleteModalOpen(false);
      fetchAllRequests();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete request. Please try again.");
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-2 sm:p-4 min-h-screen flex flex-col justify-between select-none">
      <div className="space-y-6">
        {/* Title Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background border border-border/10 p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2 font-heading">
              <span>All Blood Donation Requests</span>
              <Droplet className="w-4 h-4 text-primary fill-primary/20 shrink-0 transform rotate-180" />
            </h1>
            <p className="text-[11px] text-muted-foreground font-body mt-1 max-w-xl leading-relaxed">
              {userRole === "admin"
                ? "Full administrative access to govern and modify all users' blood requests."
                : "Volunteer monitoring dashboard. Authorized to view and update request status flags only."}
            </p>
          </div>

          {/* Filters Selectors Row */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-secondary/30 border border-border/10 px-2.5 py-1 rounded-xl">
            <Filter className="w-3.5 h-3.5 text-foreground/40" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-foreground border-none rounded-none text-xs font-semibold focus:outline-none transition cursor-pointer pr-1 font-body"
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
            onRetry={fetchAllRequests} 
            className="mb-4"
          />
        )}

        {/* Main Table Structure */}
        <div className="bg-background border border-border/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-visible">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary opacity-80" />
              <p className="text-[11px] text-muted-foreground font-body">
                Fetching complete request directories...
              </p>
            </div>
          ) : requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <h3 className="text-xs font-semibold text-foreground/60 font-heading">
                No Donation Requests Found
              </h3>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <DonationRequestsTable
                role={userRole}
                variant="all-requests"
                requests={requests}
                actionLoadingId={actionLoadingId}
                onUpdateStatus={handleUpdateStatus}
                onDeleteTrigger={(id) => {
                  setTargetId(id);
                  setDeleteModalOpen(true);
                }}
              />
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
        <div className="fixed inset-0 bg-background/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border/20 rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 text-danger mb-2">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="font-bold text-sm text-foreground font-heading tracking-tight">
                Confirm Permanent Erase
              </h3>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-body">
              Are you sure you want to delete this donation request? This action
              cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-border/10">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-3 py-1.5 text-[11px] font-semibold bg-secondary/60 border border-border/10 rounded-lg hover:bg-secondary text-foreground/70 transition-colors cursor-pointer font-body"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 text-[11px] font-bold bg-danger text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer font-body"
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
