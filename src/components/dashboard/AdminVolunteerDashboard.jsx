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
import Image from "next/image";

/* ─────────────────── Tooltip ─────────────────── */
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
  if (s === "pending")
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  if (s === "inprogress")
    return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
  if (s === "done")
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  if (s === "canceled")
    return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20";
  return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20";
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
  const sz = size === "sm" ? "w-7 h-7 text-[10px]" : "w-9 h-9 text-[11px]";
  return (
    <span
      className={`${sz} rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 border border-primary/20 shadow-inner`}
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
    (stats?.statusDistribution?.pending || 0) +
    (stats?.statusDistribution?.inprogress || 0) +
    (stats?.statusDistribution?.done || 0) +
    (stats?.statusDistribution?.canceled || 0);

  const donutData = [
    {
      name: "Pending",
      value: stats?.statusDistribution?.pending || 0,
      color: "#d97706",
    },
    {
      name: "In Progress",
      value: stats?.statusDistribution?.inprogress || 0,
      color: "#2563eb",
    },
    {
      name: "Completed",
      value: stats?.statusDistribution?.done || 0,
      color: "#059669",
    },
    {
      name: "Canceled",
      value: stats?.statusDistribution?.canceled || 0,
      color: "#71717a",
    },
  ];

  const recentRequests = stats?.recentRequests || [];
  const recentUsers = stats?.recentUsers || [];

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="flex flex-col items-center gap-4 relative">
          <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full w-12 h-12 -ml-2 -mt-2 animate-pulse" />
          <Loader2 className="w-10 h-10 animate-spin text-primary relative z-10" />
          <p className="text-xs text-foreground/80 font-medium tracking-wide animate-pulse">
            Assembling system metrics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-foreground select-none pb-12 relative overflow-hidden">
      {/* Background Decorative Glow Matrix */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-12 left-1/4 w-80 h-80 bg-secondary/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ── 1. Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-serif">
            Platform Overview Statistics
          </h1>
          <p className="text-xs text-foreground/60 mt-1 font-sans">
            Real-time infrastructure performance and operations summary metrics.
          </p>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold text-foreground/80 border border-border bg-secondary hover:bg-muted backdrop-blur-md px-4 py-2 rounded-xl transition shadow-sm hover:text-foreground">
          <Activity className="w-3.5 h-3.5 text-primary" /> Analytics{" "}
          <ChevronRight className="w-3.5 h-3.5 text-foreground/60" />
        </button>
      </div>

      {/* ── 2. Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Total Users */}
        <div className="bg-secondary backdrop-blur-md border border-border rounded-2xl p-6 flex items-center gap-5 transition hover:border-border/80 hover:bg-muted shadow-xs relative group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-muted rounded-bl-3xl group-hover:bg-muted/80 transition-colors" />
          <div className="p-3 bg-muted text-foreground/80 rounded-xl shrink-0 border border-border shadow-inner">
            <Users className="w-5 h-5 text-foreground/60 group-hover:text-foreground transition-colors" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest font-sans">
              Total Users
            </p>
            <h3 className="text-3xl font-bold text-foreground tracking-tight mt-1 font-sans">
              {stats?.totalUsers != null
                ? stats.totalUsers.toLocaleString()
                : "—"}
            </h3>
          </div>
        </div>

        {/* Total Funding */}
        <div className="bg-secondary backdrop-blur-md border border-border rounded-2xl p-6 flex items-center gap-5 transition hover:border-border/80 hover:bg-muted shadow-xs relative group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-3xl group-hover:bg-emerald-500/10 transition-colors" />
          <div className="p-3 bg-muted text-foreground/80 rounded-xl shrink-0 border border-border shadow-inner">
            <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest font-sans">
              Total Funding
            </p>
            <h3 className="text-3xl font-bold text-foreground tracking-tight mt-1 font-sans">
              ${stats?.totalFunding != null
                ? stats.totalFunding.toLocaleString()
                : "0"}
            </h3>
          </div>
        </div>

        {/* Total Requests */}
        <div className="bg-secondary backdrop-blur-md border border-border rounded-2xl p-6 flex items-center gap-5 transition hover:border-border/80 hover:bg-muted shadow-xs relative group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-3xl group-hover:bg-primary/10 transition-colors" />
          <div className="p-3 bg-muted text-foreground/80 rounded-xl shrink-0 border border-border shadow-inner">
            <HeartPulse className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest font-sans">
              Total Requests
            </p>
            <h3 className="text-3xl font-bold text-foreground tracking-tight mt-1 font-sans">
              {stats?.totalRequests != null
                ? stats.totalRequests.toLocaleString()
                : "—"}
            </h3>
          </div>
        </div>
      </div>

      {/* ── 3. Visual Analytics ── */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold text-foreground/60 uppercase tracking-wider font-sans">
          Visual System Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Area Chart */}
          <div className="lg:col-span-8 bg-secondary backdrop-blur-md border border-border rounded-2xl p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground font-sans">
                  Donation Trends Chart
                </h3>
                <p className="text-[11px] text-foreground/60 mt-0.5 font-sans">
                  Volumetric visualizer of active requests over time
                </p>
              </div>
              <div className="flex items-center gap-2.5 bg-background/60 border border-border px-3 py-1.5 rounded-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <select
                  value={chartView}
                  onChange={(e) => setChartView(e.target.value)}
                  className="bg-transparent text-[11px] font-semibold text-foreground/80 focus:outline-none cursor-pointer pr-1 border-none appearance-none"
                >
                  <option value="daily" className="bg-background text-foreground/80">
                    Daily Interval
                  </option>
                  <option value="weekly" className="bg-background text-foreground/80">
                    Weekly Interval
                  </option>
                  <option value="monthly" className="bg-background text-foreground/80">
                    Monthly Interval
                  </option>
                </select>
              </div>
            </div>

            <div className="min-h-[220px] w-full">
              {chartData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-foreground/40 gap-3 border border-dashed border-border rounded-xl">
                  <HeartPulse className="w-7 h-7 opacity-20" />
                  <p className="text-xs font-medium">
                    No system chart history logs found.
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -22, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="requestsGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--primary, #ae1919)"
                          stopOpacity={0.25}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--primary, #ae1919)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="4 4"
                      vertical={false}
                      stroke="var(--border)"
                      strokeOpacity={0.5}
                    />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "var(--foreground)", opacity: 0.6, fontSize: 10, fontWeight: 500 }}
                    />
                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "var(--foreground)", opacity: 0.6, fontSize: 10, fontWeight: 500 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="requests"
                      stroke="var(--primary, #ae1919)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#requestsGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Donut Chart */}
          <div className="lg:col-span-4 bg-secondary backdrop-blur-md border border-border rounded-2xl p-6 flex flex-col justify-between shadow-xs">
            <div className="pb-4">
              <h3 className="text-sm font-bold text-foreground font-sans">
                Request Status Distribution
              </h3>
              <p className="text-[11px] text-foreground/60 mt-0.5 font-sans">
                Operational status breakdown metrics
              </p>
            </div>

            {totalDist === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 text-foreground/40 gap-3 border border-dashed border-border rounded-xl my-auto">
                <ClipboardList className="w-7 h-7 opacity-20" />
                <p className="text-xs font-medium">
                  No processing history records found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-4 items-center py-2">
                <div className="col-span-7 flex justify-center relative">
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={48}
                        outerRadius={62}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {donutData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke="var(--background)"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "var(--background)",
                          border: "1px solid var(--border)",
                          borderRadius: 12,
                          fontSize: 11,
                          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                        }}
                        itemStyle={{ color: "var(--foreground)" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="col-span-5 space-y-3">
                  {donutData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2.5 text-xs"
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0 mt-1"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-foreground/80 font-medium leading-tight truncate">
                          {item.name}
                        </span>
                        <span className="text-foreground/60 text-[10px] font-bold mt-0.5">
                          {item.value} units
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 4. Activity Feed + User Management ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity Feed */}
        <div
          className={`${user?.role === "admin" ? "lg:col-span-8" : "lg:col-span-12"} bg-secondary backdrop-blur-md border border-border rounded-2xl p-6 space-y-5 shadow-xs`}
        >
          <div>
            <h3 className="text-sm font-bold text-foreground font-sans">
              Recent Activity Feed
            </h3>
            <p className="text-[11px] text-foreground/60 mt-0.5 font-sans">
              Monitoring latest live deployment structural requirements
            </p>
          </div>

          {recentRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-foreground/40 gap-3 border border-dashed border-border rounded-xl">
              <ClipboardList className="w-7 h-7 opacity-20" />
              <p className="text-xs font-medium">
                No recent interactive tracking files loaded.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              <table className="w-full text-left text-xs border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-border text-foreground/60 font-semibold tracking-normal sm:tracking-wider uppercase text-[10px]">
                    <th className="pb-3.5 px-2 sm:px-3 font-semibold">Recipient</th>
                    <th className="pb-3.5 px-2 sm:px-3 font-semibold">Blood Group</th>
                    <th className="pb-3.5 px-2 sm:px-3 font-semibold">Location</th>
                    <th className="pb-3.5 px-2 sm:px-3 font-semibold">Date</th>
                    <th className="pb-3.5 px-2 sm:px-3 font-semibold text-right pr-2">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50 text-foreground/80">
                  {recentRequests.map((act, index) => (
                    <tr
                      key={act._id || index}
                      className="hover:bg-muted/50 transition-colors group"
                    >
                      <td className="py-3.5 flex items-center gap-3">
                        {act.avatar ? (
                          <Image
                            width={28}
                            height={28}
                            src={act.avatar}
                            alt={act.recipientName}
                            className="w-7 h-7 rounded-full object-cover border border-border ring-1 ring-black/10 dark:ring-white/10"
                          />
                        ) : (
                          <InitialsAvatar name={act.recipientName} size="sm" />
                        )}
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {act.recipientName || "—"}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className="font-mono bg-background/50 px-2 py-0.5 rounded-md border border-border/50 font-bold text-foreground">
                          {act.bloodGroup || "—"}
                        </span>
                      </td>
                      <td className="py-3.5 text-foreground/80 font-medium max-w-[150px] truncate">
                        {act.hospitalName || act.recipientDistrict || "—"}
                      </td>
                      <td className="py-3.5 text-foreground/60 font-medium whitespace-nowrap">
                        {formatDonationDate(act.donationDate)}
                      </td>
                      <td className="py-3.5 text-right pr-2">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold border tracking-wide font-sans shadow-xs ${getStatusBadgeClass(act.donationStatus)}`}
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
          <div className="lg:col-span-4 bg-secondary backdrop-blur-md border border-border rounded-2xl p-6 space-y-5 shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-foreground font-sans">
                User Management
              </h3>
              <p className="text-[11px] text-foreground/60 mt-0.5 font-sans">
                Recently authenticated profile logs
              </p>
            </div>

            {recentUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-foreground/40 gap-3 border border-dashed border-border rounded-xl">
                <UserCircle className="w-7 h-7 opacity-20" />
                <p className="text-xs font-medium">
                  No account registrations captured.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border/50">
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
                      className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {u.image ? (
                          <Image
                            width={32}
                            height={32}
                            src={u.image}
                            alt={u.name}
                            className="w-8 h-8 rounded-full object-cover border border-border ring-1 ring-black/10 dark:ring-white/10"
                          />
                        ) : (
                          <InitialsAvatar name={u.name} size="lg" />
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-foreground leading-tight truncate group-hover:text-primary transition-colors">
                            {u.name || "Unknown"}
                          </p>
                          <p className="text-[10px] text-foreground/60 mt-1 font-medium font-mono">
                            {roleLabel} <span className="text-border">|</span>{" "}
                            ID: {shortId}
                          </p>
                        </div>
                      </div>
                      <button className="text-foreground/60 hover:text-foreground p-1.5 hover:bg-muted rounded-lg focus:outline-none transition shrink-0">
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
