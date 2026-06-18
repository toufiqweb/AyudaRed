"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getUserByEmail } from "@/lib/api/users";
import { useUserClientSession } from "@/lib/core/sessionClient";

export default function DashboardDonorHomePage({ user }) {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Modal configurations states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetRequestId, setTargetRequestId] = useState(null);

  // Fetch recent 3 donation entries created by current user
  const fetchRecentRequests = async () => {
    try {
      const data = await getUserByEmail(user?.email);
      console.log(data);

      if (Array.isArray(data)) {
        setRequests(data.slice(0, 3));
      } else if (data && typeof data === "object") {
        setRequests(data.donationRequests?.slice(0, 3) || []);
      }
    } catch (err) {
      console.error(
        "Error loading specific user collection payload streams:",
        err,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentRequests();
  }, [user.email]);

  // Handle status updating transitions (inprogress -> done / canceled)
  const handleUpdateStatus = async (id, nextStatus) => {
    setActionLoading(id);
    try {
      const session = await authClient.getSession();
      const token = session?.data?.token;

      const response = await fetch(
        `http://localhost:9000/api/donation-requests/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: nextStatus }),
        },
      );

      if (response.ok) {
        fetchRecentRequests();
      } else {
        alert("Failed to update execution process status flags.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(null);
    }
  };

  // Trigger modal confirmation tracking state pointers
  const openDeleteModal = (id) => {
    setTargetRequestId(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteRequest = async () => {
    if (!targetRequestId) return;
    setDeleteModalOpen(false);

    try {
      const session = await authClient.getSession();
      const token = session?.data?.token;

      const response = await fetch(
        `http://localhost:9000/api/donation-requests/${targetRequestId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        fetchRecentRequests();
      } else {
        alert("Could not process destructive database extraction lines.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTargetRequestId(null);
    }
  };

  // Helper utility mapping status tags styling variables
  const getStatusBadge = (status) => {
    const config = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      inprogress: "bg-blue-50 text-blue-700 border-blue-200",
      done: "bg-emerald-50 text-emerald-700 border-emerald-200",
      canceled: "bg-rose-50 text-rose-700 border-rose-200",
    };
    return (
      <span
        className={`px-2.5 py-1 text-xs font-semibold border rounded-full capitalize ${config[status] || "bg-muted"}`}
      >
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

  if (requests.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Recent Donation Requests
          </h2>
          <p className="text-xs text-muted-foreground">
            Quick management view for your 3 most recent entries
          </p>
        </div>
      </div>

      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-xs font-bold tracking-wider text-muted-foreground uppercase">
                <th className="p-4">Recipient</th>
                <th className="p-4">Location</th>
                <th className="p-4">Schedule Details</th>
                <th className="p-4 text-center">Blood</th>
                <th className="p-4">Status</th>
                <th className="p-4">Donor Metadata</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {requests.map((request) => (
                <tr key={request._id} className="hover:bg-muted/20 transition">
                  <td className="p-4 font-medium text-foreground">
                    {request.recipientName}
                  </td>

                  <td className="p-4 text-muted-foreground">
                    <div className="flex items-center gap-1 text-xs">
                      <MapPin className="w-3.5 h-3.5 shrink-0 opacity-60" />
                      <span>
                        {request.recipientUpazila}, {request.recipientDistrict}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 text-xs space-y-1 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 opacity-60" />
                      <span>{request.donationDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 opacity-60" />
                      <span>{request.donationTime}</span>
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    <span className="inline-block px-2 py-0.5 text-xs font-black bg-red-100 text-red-700 border border-red-200 rounded">
                      {request.bloodGroup}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="space-y-2">
                      {getStatusBadge(request.donationStatus)}

                      {request.donationStatus === "inprogress" && (
                        <div className="flex gap-1 items-center">
                          <button
                            onClick={() =>
                              handleUpdateStatus(request._id, "done")
                            }
                            disabled={actionLoading !== null}
                            className="p-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 transition shadow-sm"
                            title="Mark as Done"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(request._id, "canceled")
                            }
                            disabled={actionLoading !== null}
                            className="p-1 rounded bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition shadow-sm"
                            title="Cancel Request"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-4 text-xs max-w-[160px] truncate">
                    {request.donationStatus === "inprogress" ? (
                      <div className="space-y-0.5 text-muted-foreground">
                        <p className="font-semibold text-foreground">
                          {user.name}
                        </p>
                        <p className="text-[11px] opacity-80">{user.email}</p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground/40 italic text-xs">
                        Unassigned
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/dashboard/donation-requests/view/${request._id}`}
                        className="p-1.5 rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/dashboard/donation-requests/edit/${request._id}`}
                        className="p-1.5 rounded-lg border border-border text-blue-600 hover:bg-blue-50/50 transition"
                        title="Edit Request"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => openDeleteModal(request._id)}
                        className="p-1.5 rounded-lg border border-border text-rose-600 hover:bg-rose-50/50 transition"
                        title="Delete Request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <Link
          href="/dashboard/my-donation-requests"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-muted border border-border rounded-xl hover:bg-muted/80 transition shadow-sm group text-foreground"
        >
          View My All Requests
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition" />
        </Link>
      </div>

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
              entry from database logs? This structural action cannot be
              reverted.
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
                onClick={confirmDeleteRequest}
                className="px-4 py-2 text-sm font-medium bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
