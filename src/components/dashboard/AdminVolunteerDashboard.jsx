"use client";

import { useState, useEffect } from "react";
import { Users, DollarSign, HeartPulse, Loader2 } from "lucide-react";

export default function AdminVolunteerDashboard({ user }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // এখানে তোমার এক্সপ্রেস ব্যাকএন্ডের ড্যাশবোর্ড স্ট্যাটস API কল করবে
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:9000/api/admin/dashboard-stats",
        );
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-red-500" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Card 1: Total User (Donors) */}
      <div className="bg-background border border-border p-6 rounded-2xl shadow-sm flex items-center gap-4">
        <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Donors
          </p>
          <h3 className="text-2xl font-bold text-foreground mt-0.5">
            {stats?.totalDonors || 0}
          </h3>
        </div>
      </div>

      {/* Card 2: Total Funding */}
      <div className="bg-background border border-border p-6 rounded-2xl shadow-sm flex items-center gap-4">
        <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
          <DollarSign className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Funding
          </p>
          <h3 className="text-2xl font-bold text-foreground mt-0.5">
            ${stats?.totalFunding || 0}
          </h3>
        </div>
      </div>

      {/* Card 3: Total Blood Request */}
      <div className="bg-background border border-border p-6 rounded-2xl shadow-sm flex items-center gap-4">
        <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl">
          <HeartPulse className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Requests
          </p>
          <h3 className="text-2xl font-bold text-foreground mt-0.5">
            {stats?.totalRequests || 0}
          </h3>
        </div>
      </div>
    </div>
  );
}
