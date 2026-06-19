"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Heart,
  Loader2,
  AlertCircle,
  RefreshCw,
  LayoutGrid,
} from "lucide-react";
import Pagination from "@/components/ui/Pagination";
import { getPendingDonationRequests } from "@/lib/api/requests";
import PendingRequestCard from "@/components/ui/PendingRequestCard";

export default function DonationRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // 9 works perfectly for a 3-column desktop grid row arrangement

  const fetchPendingRequests = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getPendingDonationRequests(currentPage, itemsPerPage);
      if (data.success) {
        setRequests(data.requests || []);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (err) {
      setError(err.message || "Something went wrong fetching live feed.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPendingRequests();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchPendingRequests]);

  return (
    <div className="dark bg-background text-foreground py-10 md:py-15 lg:py-15 xl:py-20 min-h-screen w-full transition-colors duration-300">
      <div className="space-y-8 max-w-7xl mx-auto p-4  sm:p-6 lg:p-8 min-h-screen flex flex-col justify-between">
        <div className="space-y-8">
          {/* Modern SaaS Header Utility Bar Structure */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border/60">
            <div className="space-y-1 text-left">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Active Donation Requests
              </h1>
              <p className="text-xs sm:text-sm text-gray-400">
                Urgent requests requiring emergency routing. Step forward to
                review details.
              </p>
            </div>

            {/* Quick Action / Real-time Status Badge Group */}
            <div className="flex items-center gap-3 self-start md:self-center">
              {!loading && requests.length > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-muted border border-border text-gray-300">
                  <LayoutGrid className="w-3.5 h-3.5 text-primary" />
                  {requests.length} Requests Live
                </span>
              )}
              <button
                onClick={fetchPendingRequests}
                disabled={loading}
                className="p-2 rounded-lg bg-secondary border border-border/80 hover:bg-muted text-gray-400 hover:text-foreground transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Clean SaaS Centered Error Handling Alert */}
          {error && (
            <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center gap-2 max-w-xl mx-auto text-left">
              <AlertCircle className="w-4 h-4 text-danger shrink-0" />
              <p className="text-sm font-medium text-danger">{error}</p>
            </div>
          )}

          {/* Loading States Overlay view */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-36 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                Syncing live database records...
              </p>
            </div>
          ) : requests.length === 0 ? (
            /* Clean Empty Slate Design */
            <div className="flex flex-col items-center justify-center py-28 text-center bg-secondary border border-dashed border-border/80 rounded-2xl max-w-md mx-auto px-6">
              <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-4 border border-border/40">
                <Heart className="w-5 h-5 text-gray-500" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">
                No Pending Requests Found
              </h3>
              <p className="text-xs text-gray-400 max-w-xs">
                All platform requests have been matched or successfully
                completed. Check back shortly.
              </p>
            </div>
          ) : (
            /* Main High-Fidelity Cards Display Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((request) => (
                <div
                  key={request._id}
                  className="transition-all duration-200 hover:-translate-y-0.5"
                >
                  <PendingRequestCard request={request} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Streamlined Custom Theme Pagination Control wrapper */}
        {!loading && requests.length > 0 && totalPages > 1 && (
          <div className="mt-12 pt-6 border-t border-border/40 flex justify-center w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
