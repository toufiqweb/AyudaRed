"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Loader2,
  Filter,
  MoreVertical,
  ShieldCheck,
  UserCheck,
  Ban,
  Unlock,
} from "lucide-react";
import { updateUser } from "@/lib/actions/admin";
import { getAllUsers } from "@/lib/api/admin";
import Pagination from "@/components/ui/Pagination";
import { useToast } from "@/components/ui/Toast";

export default function AllUsersPage() {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Filtering and Pagination States
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Global click tracker securely intercepts backdrop clicks to close drop menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".user-actions-container")) {
        return;
      }
      setOpenMenuId(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getAllUsers(statusFilter, currentPage, itemsPerPage);
      setUsers(result.data || []);
      setTotalPages(result.pagination?.totalPages || 1);
    } catch (err) {
      setError(
        err.message || "An error occurred fetching user management lines.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  const handleUpdateUser = async (userId, payload) => {
    setActionLoadingId(userId);
    setOpenMenuId(null);
    try {
      await updateUser(userId, payload);
      toast.success("User updated successfully.");
      fetchUsers();
    } catch (error) {
      console.error("Mutation failure:", error);
      toast.error(error.message || "Could not execute this action.");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Helper styles maps for statuses
  const getStatusStyle = (status) => {
    return status === "blocked"
      ? "bg-rose-50 text-rose-700 border-rose-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";
  };

  // Helper styles maps for system authority scopes
  const getRoleStyle = (role) => {
    const config = {
      admin: "bg-purple-50 text-purple-700 border-purple-200 font-bold",
      volunteer: "bg-blue-50 text-blue-700 border-blue-200 font-medium",
      donor: "bg-stone-50 text-stone-700 border-stone-200",
    };
    return config[role] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-2">
      {/* Configuration Control Card Section Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background border border-border p-5 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 font-heading">
            All Users Accounts 👤
          </h1>
          <p className="text-xs text-muted-foreground font-body">
            Manage system memberships, assign global roles, and govern account
            permissions flags
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
            <option value="active">Active Only</option>
            <option value="blocked">Blocked Only</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl">
          {error}
        </div>
      )}

      {/* Main Structural Roster Datagrid Workspace */}
      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary opacity-80" />
            <p className="text-xs text-muted-foreground animate-pulse font-body">
              Loading identity datasets...
            </p>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <h3 className="text-sm font-semibold text-foreground font-heading">
              No Accounts Matches Present
            </h3>
            <p className="text-xs text-muted-foreground max-w-xs mt-1 font-body">
              There are no user accounts profiles recorded fitting your chosen
              lookup properties.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                  <th className="px-6 py-3.5">User Identity Profile</th>
                  <th className="px-6 py-3.5">Email Address</th>
                  <th className="px-6 py-3.5">Role Level</th>
                  <th className="px-6 py-3.5">Account Status</th>
                  <th className="px-6 py-3.5 text-right">Actions Governance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-sm">
                {users.map((profile) => (
                  <tr
                    key={profile._id}
                    className="hover:bg-muted/10 transition-colors"
                  >
                    {/* Identity Metadata Cell */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full bg-muted overflow-hidden border border-border/60 shrink-0">
                          <Image
                            src={
                              profile.avatar ||
                              profile.image ||
                              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                            }
                            alt={profile.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="font-semibold text-foreground truncate max-w-[160px] font-body">
                          {profile.name}
                        </p>
                      </div>
                    </td>

                    {/* Email Tracking Address lines */}
                    <td className="px-6 py-4 text-muted-foreground font-medium text-xs">
                      {profile.email}
                    </td>

                    {/* Authority Scope Badge Indicator */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 border rounded text-xs capitalize ${getRoleStyle(profile.role)}`}
                      >
                        {profile.role || "donor"}
                      </span>
                    </td>

                    {/* Operational Account Status parameters */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 border rounded-full text-xs capitalize font-medium ${getStatusStyle(profile.status)}`}
                      >
                        {profile.status || "active"}
                      </span>
                    </td>

                    {/* Context Action Toggles Three Dot Layout */}
                    <td className="px-6 py-4 text-right relative user-actions-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === profile._id ? null : profile._id,
                          );
                        }}
                        disabled={actionLoadingId === profile._id}
                        className={`p-1.5 rounded-lg border transition ${
                          openMenuId === profile._id
                            ? "bg-muted border-border text-foreground"
                            : "border-transparent hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        {actionLoadingId === profile._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <MoreVertical className="w-4 h-4" />
                        )}
                      </button>

                      {/* Dropdown Options Frame */}
                      {openMenuId === profile._id && (
                        <div className="absolute right-6 top-11 w-52 bg-background border border-border rounded-xl shadow-lg z-20 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 text-left">
                          {/* --- 1. ACCOUNT STATUS SWITCHES (Block / Unblock) --- */}
                          {profile.status !== "blocked" ? (
                            <button
                              onClick={() =>
                                handleUpdateUser(profile._id, {
                                  status: "blocked",
                                })
                              }
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50/50 transition"
                            >
                              <Ban className="w-3.5 h-3.5" />
                              Block User Account
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleUpdateUser(profile._id, {
                                  status: "active",
                                })
                              }
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-emerald-600 hover:bg-emerald-50/50 transition"
                            >
                              <Unlock className="w-3.5 h-3.5" />
                              Activate/Unblock User
                            </button>
                          )}

                          {/* --- 2. ROLE GOVERNANCE ACTIONS (Dynamic Inter-changing) --- */}

                          {/* Make Donor: Current user is Admin or Volunteer */}
                          {profile.role !== "donor" && (
                            <button
                              onClick={() =>
                                handleUpdateUser(profile._id, { role: "donor" })
                              }
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition border-t border-border/40"
                            >
                              <UserCheck className="w-3.5 h-3.5 text-stone-500" />
                              Demote to Donor
                            </button>
                          )}

                          {/* Make Volunteer: Current user is Donor or Admin */}
                          {profile.role !== "volunteer" && (
                            <button
                              onClick={() =>
                                handleUpdateUser(profile._id, {
                                  role: "volunteer",
                                })
                              }
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition border-t border-border/40"
                            >
                              <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                              {profile.role === "admin"
                                ? "Change to Volunteer"
                                : "Promote to Volunteer"}
                            </button>
                          )}

                          {/* Make Admin: Current user is Donor or Volunteer */}
                          {profile.role !== "admin" && (
                            <button
                              onClick={() =>
                                handleUpdateUser(profile._id, { role: "admin" })
                              }
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition border-t border-border/40"
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                              Elevate to Admin
                            </button>
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
      {!loading && users.length > 0 && totalPages > 1 && (
        <div className="flex justify-center py-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
