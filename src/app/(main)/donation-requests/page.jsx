"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Heart, MapPin, Calendar, Clock, Eye, Loader2 } from "lucide-react";
import Pagination from "@/components/ui/Pagination";
import { getPendingDonationRequests } from "@/lib/api/requests";

export default function DonationRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
      setError(err.message || "Something went wrong.");
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

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span
            key={`dots-${index}`}
            className="px-3 py-1.5 text-sm text-muted-foreground tracking-widest"
          >
            ...
          </span>
        );
      }
      return (
        <button
          key={`page-${page}`}
          onClick={() => setCurrentPage(page)}
          className={`w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-full transition-colors ${
            currentPage === page
              ? "bg-rose-50 text-rose-600 font-bold"
              : "text-slate-600 hover:bg-muted"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 sm:p-6 min-h-screen flex flex-col justify-between">
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center justify-center gap-2">
            Active Blood Donation Requests 🩸
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Urgent requests in need of immediate support. Find details below and
            step forward to volunteer.
          </p>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl text-center max-w-md mx-auto">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <Loader2 className="w-9 h-9 animate-spin text-rose-600 opacity-80" />
            <p className="text-xs text-muted-foreground font-medium">
              Scanning live blood requests...
            </p>
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-muted/20 border border-dashed border-border rounded-2xl max-w-md mx-auto px-4">
            <Heart className="w-10 h-10 text-muted-foreground/40 mb-2" />
            <h3 className="text-sm font-semibold text-foreground">
              No Pending Requests
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-background border border-border rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-border/80 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100 shadow-sm">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
                    {request.bloodGroup}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground opacity-70">
                      Recipient
                    </span>
                    <h3 className="text-base font-bold text-foreground mt-0.5 truncate pr-16">
                      {request.recipientName}
                    </h3>
                  </div>

                  <div className="space-y-2.5 text-xs text-foreground/80">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="font-semibold text-foreground">
                          {request.hospitalName}
                        </p>
                        <p className="text-muted-foreground text-[11px] line-clamp-1">
                          {request.recipientUpazila},{" "}
                          {request.recipientDistrict}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-muted/40 p-2.5 rounded-xl border border-border/40">
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">
                          Date
                        </p>
                        <p className="font-bold text-foreground flex items-center gap-1 text-[11px]">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground opacity-70" />{" "}
                          {request.donationDate}
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">
                          Time
                        </p>
                        <p className="font-bold text-foreground flex items-center gap-1 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-muted-foreground opacity-70" />{" "}
                          {request.donationTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 🔗 ডাইনামিক রাউট লিংক আপডেট করা হয়েছে */}
                <div className="mt-5 pt-3 border-t border-border/50">
                  <Link
                    href={`/donation-requests/${request._id}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-muted hover:bg-rose-600 hover:text-white text-foreground font-semibold text-xs py-2.5 px-4 rounded-xl transition-all focus:outline-none"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && requests.length > 0 && totalPages > 1 && (
        <div className="mt-8 flex justify-center">
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
