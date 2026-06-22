"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  Calendar,
  Clock,
  MapPin,
  Heart,
  MoreVertical,
} from "lucide-react";

export default function DonationRequestsTable({
  requests = [],
  role,
  actionLoadingId,
  onUpdateStatus,
  onDeleteTrigger,
  variant = "default",
}) {
  const [openMenuId, setOpenMenuId] = useState(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-trigger-container")) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const getStatusBadge = (status) => {
    const config = {
      pending:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      inprogress:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      done: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      canceled: "bg-muted text-muted-foreground border-border",
    };
    const pyClass = variant === "all-requests" ? "py-0.5" : "py-1";
    return (
      <span
        className={`px-2.5 ${pyClass} text-[11px] font-bold border rounded-full capitalize tracking-wide inline-flex items-center shadow-xs ${config[status] || "bg-muted text-muted-foreground border-border"}`}
      >
        {status === "inprogress" ? "In Progress" : status}
      </span>
    );
  };

  const tableHeaderClass =
    variant === "dashboard"
      ? "bg-secondary/70 border-b border-border text-[10px] sm:text-[11px] font-bold tracking-normal sm:tracking-wider text-muted-foreground uppercase"
      : "bg-muted/40 border-b border-border text-[10px] sm:text-[11px] font-bold tracking-normal sm:tracking-wider text-muted-foreground uppercase";

  const rowClass =
    variant === "dashboard"
      ? "hover:bg-muted/30 transition duration-150 ease-in-out overflow-visible"
      : "hover:bg-muted/10 transition-colors overflow-visible";

  const tableClass =
    variant === "dashboard"
      ? "w-full text-left border-collapse min-w-[800px] overflow-visible"
      : "w-full text-left border-collapse overflow-visible min-w-[600px]";

  return (
    <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
      <table className={tableClass}>
        <thead>
          <tr className={tableHeaderClass}>
            <th className="px-3 sm:px-6 py-3 sm:py-4.5">Recipient</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4.5">Location</th>
            {variant === "dashboard" ? (
              <>
                <th className="px-3 sm:px-6 py-3 sm:py-4.5">Schedule</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4.5 text-center">
                  Blood Group
                </th>
              </>
            ) : (
              <>
                <th className="px-3 sm:px-6 py-3 sm:py-4.5">Blood Group</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4.5">Schedule</th>
              </>
            )}
            <th className="px-3 sm:px-6 py-3 sm:py-4.5">Status</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4.5">
              {variant === "my-requests" ? "Donor Info" : "Assigned Donor"}
            </th>
            <th className="px-3 sm:px-6 py-3 sm:py-4.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40 text-sm overflow-visible">
          {requests.map((request, index) => {
            const detailUrl =
              variant === "dashboard"
                ? `/dashboard/donation-requests/view/${request._id}`
                : `/donation-requests/${request._id}`;

            const isLastRow =
              requests.length > 2 && index >= requests.length - 2;

            return (
              <tr key={request._id} className={rowClass}>
                {/* Recipient */}
                <td className="px-6 py-4 font-semibold text-foreground">
                  {variant === "dashboard" ? (
                    <span className="font-bold">{request.recipientName}</span>
                  ) : (
                    <>
                      <p className="font-semibold text-foreground font-body">
                        {request.recipientName}
                      </p>
                      {variant === "my-requests" && request.requestMessage && (
                        <p className="text-[11px] text-muted-foreground max-w-[160px] truncate mt-0.5 font-body">
                          {request.requestMessage}
                        </p>
                      )}
                    </>
                  )}
                </td>

                {/* Location */}
                <td className="px-6 py-4 text-muted-foreground">
                  {variant === "my-requests" ? (
                    <div className="space-y-0.5 text-xs text-foreground/90">
                      <p className="font-medium flex items-center gap-1 font-body">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        {request.hospitalName}
                      </p>
                      <p className="text-muted-foreground pl-[18px] font-body">
                        {request.recipientUpazila}, {request.recipientDistrict}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <MapPin
                        className={`w-3.5 h-3.5 shrink-0 ${variant === "dashboard" ? "text-primary opacity-90" : "text-muted-foreground"}`}
                      />
                      <span
                        className={
                          variant === "dashboard"
                            ? "truncate max-w-[180px]"
                            : ""
                        }
                      >
                        {request.recipientUpazila}, {request.recipientDistrict}
                      </span>
                    </div>
                  )}
                </td>

                {/* Blood Group & Schedule */}
                {variant === "dashboard" ? (
                  <>
                    {/* Schedule */}
                    <td className="px-6 py-4 text-xs space-y-1.5 text-muted-foreground font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 opacity-60 text-foreground" />
                        <span>{request.donationDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 opacity-60 text-foreground" />
                        <span>{request.donationTime}</span>
                      </div>
                    </td>

                    {/* Blood Group */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black bg-primary/10 text-primary border border-primary/20 rounded-xl shadow-sm">
                        <Heart className="w-3 h-3 fill-primary text-primary" />
                        {request.bloodGroup}
                      </span>
                    </td>
                  </>
                ) : (
                  <>
                    {/* Blood Group */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-primary/10 text-primary border border-primary/20 shadow-xs">
                        <Heart className="w-3 h-3 fill-primary/80 text-primary" />
                        {request.bloodGroup}
                      </span>
                    </td>

                    {/* Schedule */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5 text-xs text-muted-foreground">
                        <p className="flex items-center gap-1.5 text-foreground/80 font-medium font-body">
                          <Calendar className="w-3.5 h-3.5 opacity-60" />{" "}
                          {request.donationDate}
                        </p>
                        <p className="flex items-center gap-1.5 font-body pl-5">
                          <Clock className="w-3.5 h-3.5 opacity-40" />{" "}
                          {request.donationTime}
                        </p>
                      </div>
                    </td>
                  </>
                )}

                {/* Status */}
                <td className="px-6 py-4">
                  {getStatusBadge(request.donationStatus)}
                </td>

                {/* Assigned Donor / Donor Info */}
                <td className="px-6 py-4 text-xs">
                  {request.donationStatus === "inprogress" &&
                  request.donorName ? (
                    <div
                      className={
                        variant === "dashboard"
                          ? "space-y-0.5 max-w-[160px]"
                          : ""
                      }
                    >
                      <p className="font-bold text-foreground truncate font-body">
                        {request.donorName}
                      </p>
                      <p
                        className={`text-[11px] text-muted-foreground truncate font-body ${variant === "dashboard" ? "opacity-80" : ""}`}
                      >
                        {request.donorEmail}
                      </p>
                    </div>
                  ) : (
                    <span
                      className={
                        variant === "dashboard"
                          ? "text-muted-foreground/40 italic font-light tracking-wide"
                          : "text-muted-foreground/50 italic"
                      }
                    >
                      {variant === "dashboard" ? "Not assigned" : "—"}
                    </span>
                  )}
                </td>

                {/* Actions Dropdown */}
                <td className="px-6 py-4 text-right relative menu-trigger-container overflow-visible">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenMenuId((prev) =>
                        prev === request._id ? null : request._id,
                      );
                    }}
                    disabled={actionLoadingId === request._id}
                    className="p-2 rounded-xl border border-transparent hover:bg-muted hover:border-border/50 text-muted-foreground hover:text-foreground transition focus:outline-none inline-flex items-center justify-center disabled:opacity-40"
                  >
                    {actionLoadingId === request._id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    ) : (
                      <MoreVertical className="w-4 h-4" />
                    )}
                  </button>

                  {openMenuId === request._id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute right-6 w-52 border border-border rounded-xl shadow-2xl z-50 py-1.5 text-left transition-all duration-150 bg-background
                        ${
                          isLastRow
                            ? "bottom-full mb-2 origin-bottom-right animate-in fade-in zoom-in-95"
                            : "top-full mt-2 origin-top-right animate-in fade-in zoom-in-95"
                        }`}
                    >
                      {/* View Details */}
                      <Link
                        href={detailUrl}
                        onClick={() => setOpenMenuId(null)}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition"
                      >
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        View Details
                      </Link>

                      {/* Edit + Delete */}
                      {(variant !== "all-requests" || role === "admin") && (
                        <>
                          <Link
                            href={`/dashboard/donation-requests/edit/${request._id}`}
                            onClick={() => setOpenMenuId(null)}
                            className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition"
                          >
                            <Edit className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                            Edit Request
                          </Link>

                          <button
                            onClick={() => {
                              onDeleteTrigger(request._id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-danger hover:bg-danger/10 transition border-t border-border/40"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Request
                          </button>
                        </>
                      )}

                      {/* Status updates */}
                      {request.donationStatus === "inprogress" && (
                        <>
                          <button
                            onClick={() => {
                              onUpdateStatus(request._id, "done");
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-500 hover:bg-emerald-500/10 transition border-t border-border/40"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                            Mark as Done
                          </button>

                          <button
                            onClick={() => {
                              onUpdateStatus(request._id, "canceled");
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted transition"
                          >
                            <XCircle className="w-4 h-4 text-muted-foreground" />
                            Cancel Donation
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
