"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, ChevronRight, HeartPulse, ClipboardList, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  updateDonationRequestStatus,
  deleteDonationRequest,
} from "@/lib/actions/requests";
import { getUserDonationRequests, getDonorDashboardStats } from "@/lib/api/requests";
import { useToast } from "../ui/Toast";
import DonationRequestsTable from "@/components/shared/DonationRequestsTable";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/90 backdrop-blur-md border border-border rounded-xl px-3 py-2.5 shadow-2xl text-xs ring-1 ring-black/5 dark:ring-white/5">
        <p className="text-foreground/60 font-medium mb-1">{label}</p>
        <p className="font-bold text-primary flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          {payload[0].value}{" "}
          <span className="font-normal text-foreground/80">requests</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function DonorDashboard({ user }) {
  const toast = useToast();
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState(null);
  const [chartView, setChartView] = useState("daily");
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

  const fetchDashboardData = useCallback(async () => {
    try {
      const [requestsResult, statsResult] = await Promise.all([
        getUserDonationRequests("all", 1, 3),
        getDonorDashboardStats()
      ]);
      if (requestsResult.success) setRequests(requestsResult.data || []);
      if (statsResult?.success) setStats(statsResult);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.email) {
      const timer = setTimeout(() => {
        fetchDashboardData();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [user?.email, fetchDashboardData]);

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
      fetchDashboardData();
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
      fetchDashboardData();
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

  const chartData = stats?.charts?.[chartView] || [];
  const totalDist =
    (stats?.statusDistribution?.pending || 0) +
    (stats?.statusDistribution?.inprogress || 0) +
    (stats?.statusDistribution?.done || 0) +
    (stats?.statusDistribution?.canceled || 0);

  const donutData = [
    { name: "Pending", value: stats?.statusDistribution?.pending || 0, color: "#d97706" },
    { name: "In Progress", value: stats?.statusDistribution?.inprogress || 0, color: "#2563eb" },
    { name: "Completed", value: stats?.statusDistribution?.done || 0, color: "#059669" },
    { name: "Canceled", value: stats?.statusDistribution?.canceled || 0, color: "#71717a" },
  ];

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
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 sm:p-6  text-foreground select-none">
      {/* ── Visual Analytics ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-serif">
              My Activity Analytics
            </h1>
            <p className="text-xs text-foreground/60 mt-1 font-sans">
              Personal donation history and performance metrics.
            </p>
          </div>
          <button className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold text-foreground/80 border border-border bg-secondary hover:bg-muted backdrop-blur-md px-4 py-2 rounded-xl transition shadow-sm hover:text-foreground">
            <Activity className="w-3.5 h-3.5 text-primary" /> Reports{" "}
            <ChevronRight className="w-3.5 h-3.5 text-foreground/60" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Area Chart */}
          <div className="lg:col-span-8 bg-secondary backdrop-blur-md border border-border rounded-2xl p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground font-sans">
                  Donation Trends
                </h3>
                <p className="text-[11px] text-foreground/60 mt-0.5 font-sans">
                  Your requests over time
                </p>
              </div>
              <div className="flex items-center gap-2.5 bg-background/60 border border-border px-3 py-1.5 rounded-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <select
                  value={chartView}
                  onChange={(e) => setChartView(e.target.value)}
                  className="bg-transparent text-[11px] font-semibold text-foreground/80 focus:outline-none cursor-pointer pr-1 border-none appearance-none"
                >
                  <option value="daily" className="bg-background text-foreground/80">Daily Interval</option>
                  <option value="weekly" className="bg-background text-foreground/80">Weekly Interval</option>
                  <option value="monthly" className="bg-background text-foreground/80">Monthly Interval</option>
                </select>
              </div>
            </div>

            <div className="min-h-[220px] w-full">
              {chartData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-foreground/40 gap-3 border border-dashed border-border rounded-xl">
                  <HeartPulse className="w-7 h-7 opacity-20" />
                  <p className="text-xs font-medium">No activity history found.</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -22, bottom: 0 }}>
                    <defs>
                      <linearGradient id="requestsGradUser" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary, #ae1919)" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="var(--primary, #ae1919)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "var(--foreground)", opacity: 0.6, fontSize: 10, fontWeight: 500 }} />
                    <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "var(--foreground)", opacity: 0.6, fontSize: 10, fontWeight: 500 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="requests" stroke="var(--primary, #ae1919)" strokeWidth={2} fillOpacity={1} fill="url(#requestsGradUser)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Donut Chart */}
          <div className="lg:col-span-4 bg-secondary backdrop-blur-md border border-border rounded-2xl p-6 flex flex-col justify-between shadow-xs">
            <div className="pb-4">
              <h3 className="text-sm font-bold text-foreground font-sans">
                Status Distribution
              </h3>
              <p className="text-[11px] text-foreground/60 mt-0.5 font-sans">
                Breakdown of your requests
              </p>
            </div>

            {totalDist === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 text-foreground/40 gap-3 border border-dashed border-border rounded-xl my-auto">
                <ClipboardList className="w-7 h-7 opacity-20" />
                <p className="text-xs font-medium">No history found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-4 items-center py-2">
                <div className="col-span-7 flex justify-center relative">
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie data={donutData} cx="50%" cy="50%" innerRadius={48} outerRadius={62} paddingAngle={4} dataKey="value">
                        {donutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="var(--background)" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 11, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }} itemStyle={{ color: "var(--foreground)" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="col-span-5 space-y-3">
                  {donutData.map((item, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs">
                      <span className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ backgroundColor: item.color }} />
                      <div className="flex flex-col min-w-0">
                        <span className="text-foreground/80 font-medium leading-tight truncate">{item.name}</span>
                        <span className="text-foreground/60 text-[10px] font-bold mt-0.5">{item.value} units</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
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
