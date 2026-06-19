"use client";

import { useState, useEffect } from "react";
import {
  Users,
  HeartPulse,
  CreditCard,
  Droplet,
  MoreHorizontal,
  ChevronRight,
  Loader2,
  Activity,
  UserCircle,
  ClipboardList,
} from "lucide-react";
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
import { getDashboardStats } from "@/lib/api/admin";

/* ─────────────────── Tooltip ─────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 shadow-2xl text-xs">
        <p className="text-gray-400 mb-0.5">{label}</p>
        <p className="font-bold text-red-500">
          {payload[0].value}{" "}
          <span className="font-normal text-gray-500">requests</span>
        </p>
      </div>
    );
  }
  return null;
};

/* ─────────────────── Helpers ─────────────────── */
const formatDonationDate = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const getStatusBadgeClass = (status) => {
  const s = status?.toLowerCase();
  if (s === "pending")    return "bg-amber-950/40 text-amber-400 border-amber-900/30";
  if (s === "inprogress") return "bg-blue-950/40  text-blue-400  border-blue-900/30";
  if (s === "done")       return "bg-emerald-950/40 text-emerald-400 border-emerald-900/30";
  if (s === "canceled")   return "bg-zinc-800/60  text-zinc-400  border-zinc-700/40";
  return "bg-zinc-800/60 text-zinc-400 border-zinc-700/40";
};

const getStatusLabel = (status) => {
  const s = status?.toLowerCase();
  if (s === "inprogress") return "In Progress";
  return status ? status.charAt(0).toUpperCase() + status.slice(1) : "—";
};

/* Initials avatar when no image is available */
const InitialsAvatar = ({ name, size = "sm" }) => {
  const initials = (name || "U")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const sz = size === "sm" ? "w-6 h-6 text-[9px]" : "w-8 h-8 text-[10px]";
  return (
    <span
      className={`${sz} rounded-full bg-red-900/60 text-red-300 font-bold flex items-center justify-center shrink-0 border border-red-800/40`}
    >
      {initials}
    </span>
  );
};

/* ─────────────────── Component ─────────────────── */
export default function AdminVolunteerDashboard({ user }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartView, setChartView] = useState("daily");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        if (data?.success) setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  /* ── Derived values ── */
  const chartData = stats?.charts?.[chartView] || [];

  const totalDist =
    (stats?.statusDistribution?.pending    || 0) +
    (stats?.statusDistribution?.inprogress || 0) +
    (stats?.statusDistribution?.done       || 0) +
    (stats?.statusDistribution?.canceled   || 0);

  const donutData = [
    { name: "Pending",     value: stats?.statusDistribution?.pending    || 0, color: "#b45309" },
    { name: "In Progress", value: stats?.statusDistribution?.inprogress || 0, color: "#3b82f6" },
    { name: "Completed",   value: stats?.statusDistribution?.done       || 0, color: "#10b981" },
    { name: "Canceled",    value: stats?.statusDistribution?.canceled   || 0, color: "#52525b" },
  ];

  // Only real data — no fallbacks
  const recentRequests = stats?.recentRequests || [];
  const recentUsers    = stats?.recentUsers    || [];

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-red-600 opacity-80" />
          <p className="text-xs text-gray-400 animate-pulse">
            Loading dashboard metrics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-gray-200 select-none">

      {/* ── 1. Header ── */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <h1 className="text-lg font-bold tracking-tight text-white">
          Platform Overview Statistics
        </h1>
        <button className="flex items-center gap-1 text-[11px] font-bold text-gray-400 border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 px-3 py-1.5 rounded-lg transition">
          <Activity className="w-3.5 h-3.5" /> Analytics <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* ── 2. Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-zinc-800/80 text-gray-300 rounded-xl shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Users</p>
            <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
              {stats?.totalUsers != null ? stats.totalUsers.toLocaleString() : "—"}
            </h3>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-zinc-800/80 text-gray-300 rounded-xl shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Pending</p>
            <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
              {stats?.statusDistribution?.pending != null
                ? stats.statusDistribution.pending.toLocaleString()
                : "—"}
            </h3>
          </div>
        </div>

        {/* Total Requests */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-zinc-800/80 text-gray-300 rounded-xl shrink-0">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Total Requests
            </p>
            <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
              {stats?.totalRequests != null ? stats.totalRequests.toLocaleString() : "—"}
            </h3>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-zinc-800/80 text-gray-300 rounded-xl shrink-0">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Completed</p>
            <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
              {stats?.statusDistribution?.done != null
                ? stats.statusDistribution.done.toLocaleString()
                : "—"}
            </h3>
          </div>
        </div>
      </div>

      {/* ── 3. Visual Analytics ── */}
      <h2 className="text-sm font-bold text-gray-400 pt-2">Visual Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Area Chart */}
        <div className="lg:col-span-8 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Donation Trends Chart</h3>
              <p className="text-[10px] text-gray-500 mt-0.5">Requests over time</p>
            </div>
            <div className="flex items-center gap-2 bg-zinc-950/80 border border-zinc-800 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <select
                value={chartView}
                onChange={(e) => setChartView(e.target.value)}
                className="bg-transparent text-[10px] font-bold text-gray-300 focus:outline-none cursor-pointer pr-1 border-none appearance-none"
              >
                <option value="daily"   className="bg-zinc-950 text-gray-300">Daily</option>
                <option value="weekly"  className="bg-zinc-950 text-gray-300">Weekly</option>
                <option value="monthly" className="bg-zinc-950 text-gray-300">Monthly</option>
              </select>
            </div>
          </div>

          <div className="min-h-[220px]">
            {chartData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-2">
                <HeartPulse className="w-8 h-8 opacity-20" />
                <p className="text-xs">No chart records found.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="requestsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#dc2626" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 10 }} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="requests" stroke="#dc2626" strokeWidth={2} fillOpacity={1} fill="url(#requestsGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Donut Chart */}
        <div className="lg:col-span-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-white">Request Status Distribution</h3>

          {totalDist === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-600 gap-2">
              <ClipboardList className="w-8 h-8 opacity-30" />
              <p className="text-xs">No requests yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-3 items-center py-4">
              <div className="col-span-7 flex justify-center">
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%" cy="50%"
                      innerRadius={45} outerRadius={60}
                      paddingAngle={3} dataKey="value"
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 10, fontSize: 11 }}
                      itemStyle={{ color: "#d4d4d8" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="col-span-5 space-y-2.5">
                {donutData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-400 font-medium leading-tight">
                      {item.name}
                      <span className="block text-gray-600 text-[10px]">{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── 4. Activity Feed + User Management ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Recent Activity Feed — full width for volunteers, 8/12 for admins */}
        <div className={`${user?.role === "admin" ? "lg:col-span-8" : "lg:col-span-12"} bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 space-y-4`}>
          <h3 className="text-sm font-bold text-white">Recent Activity Feed</h3>

          {recentRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-600 gap-2">
              <ClipboardList className="w-8 h-8 opacity-30" />
              <p className="text-xs">No recent donation requests.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800/60 text-gray-500 font-bold uppercase tracking-wider">
                    <th className="pb-3 font-medium">Recipient</th>
                    <th className="pb-3 font-medium">Blood Group</th>
                    <th className="pb-3 font-medium">Location</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/40 text-gray-300">
                  {recentRequests.map((act, index) => (
                    <tr key={act._id || index} className="hover:bg-zinc-800/10 transition-colors">
                      <td className="py-3.5 flex items-center gap-3">
                        {act.avatar ? (
                          <img
                            src={act.avatar}
                            alt={act.recipientName}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <InitialsAvatar name={act.recipientName} size="sm" />
                        )}
                        <span className="font-semibold">{act.recipientName || "—"}</span>
                      </td>
                      <td className="py-3.5 font-bold">{act.bloodGroup || "—"}</td>
                      <td className="py-3.5 text-gray-400">
                        {act.hospitalName || act.recipientDistrict || "—"}
                      </td>
                      <td className="py-3.5 text-gray-400 whitespace-nowrap">
                        {formatDonationDate(act.donationDate)}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize ${getStatusBadgeClass(act.donationStatus)}`}
                        >
                          {getStatusLabel(act.donationStatus)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* User Management — Admin only */}
        {user?.role === "admin" && (
          <div className="lg:col-span-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">User Management</h3>
              <p className="text-[10px] text-gray-500 mt-0.5">Recently Joined Users</p>
            </div>

            {recentUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-600 gap-2">
                <UserCircle className="w-8 h-8 opacity-30" />
                <p className="text-xs">No users found.</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-800/40">
                {recentUsers.map((u, index) => {
                  const roleLabel =
                    u.role === "admin"
                      ? "Admin"
                      : u.role === "volunteer"
                      ? "Volunteer"
                      : "Donor";
                  const shortId = u._id
                    ? u._id.substring(u._id.length - 4).toUpperCase()
                    : `${index + 1}`;

                  return (
                    <div
                      key={u._id || index}
                      className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        {u.image ? (
                          <img
                            src={u.image}
                            alt={u.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <InitialsAvatar name={u.name} size="lg" />
                        )}
                        <div>
                          <p className="text-xs font-semibold text-white leading-tight">
                            {u.name || "Unknown"}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-0.5">
                            {roleLabel} | ID: {shortId}
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-500 hover:text-gray-300 p-1 focus:outline-none transition">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
