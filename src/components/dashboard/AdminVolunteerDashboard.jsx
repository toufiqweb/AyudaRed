"use client";

import { useState, useEffect } from "react";
import {
  Users,
  HeartPulse,
  TrendingUp,
  Loader2,
  CalendarDays,
  Calendar,
  BarChart2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getDashboardStats } from "@/lib/api/admin";

const VIEWS = [
  { key: "daily", label: "Daily", icon: CalendarDays },
  { key: "weekly", label: "Weekly", icon: Calendar },
  { key: "monthly", label: "Monthly", icon: BarChart2 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="text-muted-foreground mb-0.5">{label}</p>
        <p className="font-bold text-rose-600">
          {payload[0].value}{" "}
          <span className="font-normal text-muted-foreground">requests</span>
        </p>
      </div>
    );
  }
  return null;
};

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

  const chartData = stats?.charts?.[chartView] || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-7 h-7 animate-spin text-rose-500" />
          <p className="text-xs text-muted-foreground animate-pulse">
            Loading dashboard metrics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Users */}
        <div className="bg-background border border-border rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Total Users
            </p>
            <h3 className="text-2xl font-extrabold text-foreground tabular-nums mt-0.5">
              {stats?.totalUsers ?? 0}
            </h3>
          </div>
        </div>

        {/* Total Requests */}
        <div className="bg-background border border-border rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl shrink-0">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Total Requests
            </p>
            <h3 className="text-2xl font-extrabold text-foreground tabular-nums mt-0.5">
              {stats?.totalRequests ?? 0}
            </h3>
          </div>
        </div>

        {/* Active Period */}
        <div className="bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 bg-white/20 text-white rounded-xl shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
              Viewing
            </p>
            <h3 className="text-xl font-extrabold text-white mt-0.5 capitalize">
              {chartView} trend
            </h3>
          </div>
        </div>
      </div>

      {/* Chart Card */}
      <div className="bg-background border border-border rounded-2xl shadow-sm p-5">
        {/* Chart Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-sm font-bold text-foreground">
              Donation Requests Trend
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {chartView === "daily"
                ? "Last 7 days breakdown"
                : chartView === "weekly"
                  ? "Last 8 weeks breakdown"
                  : "Last 6 months breakdown"}
            </p>
          </div>

          {/* View Toggle Tabs */}
          <div className="flex items-center gap-1 bg-muted/60 border border-border rounded-xl p-1 self-start sm:self-auto">
            {VIEWS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setChartView(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  chartView === key
                    ? "bg-background text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        {chartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-2">
            <HeartPulse className="w-8 h-8 opacity-20" />
            <p className="text-xs">No data for this period yet.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart
              data={chartData}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="requestsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#f43f5e"
                strokeWidth={2.5}
                fill="url(#requestsGrad)"
                dot={{ r: 3, fill: "#f43f5e", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#f43f5e", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {/* Chart Footer Summary */}
        <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-3 h-0.5 bg-rose-500 rounded-full inline-block" />
          Blood donation requests over time
        </div>
      </div>
    </div>
  );
}
