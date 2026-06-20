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
    if (variant === "dashboard") {
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
    } else {
      const styles = {
        pending: "bg-amber-50 text-amber-700 border-amber-200",
        inprogress: "bg-blue-50 text-blue-700 border-blue-200",
        done: "bg-emerald-50 text-emerald-700 border-emerald-200",
        canceled: "bg-stone-50 text-stone-600 border-stone-200",
      };
      const pyClass = variant === "all-requests" ? "py-0.5" : "py-1";
      return (
        <span
          className={`px-2.5 ${pyClass} text-xs font-semibold border rounded-full capitalize ${styles[status] || "bg-muted text-muted-foreground"}`}
        >
          {status}
        </span>
      );
    }
  };

  const tableHeaderClass =
    variant === "dashboard"
      ? "bg-secondary/70 border-b border-border text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
      : "bg-muted/40 border-b border-border text-[11px] font-bold tracking-wider text-muted-foreground uppercase";

  const rowClass =
    variant === "dashboard"
      ? "hover:bg-muted/30 transition duration-150 ease-in-out overflow-visible"
      : variant === "all-requests"
        ? "hover:bg-muted/10 transition-colors overflow-visible"
        : "hover:bg-muted/20 transition-colors overflow-visible";

  const tableClass =
    variant === "dashboard"
      ? "w-full text-left border-collapse min-w-[800px] overflow-visible"
      : "w-full text-left border-collapse overflow-visible";

  return (
    <table className={tableClass}>
      <thead>
        <tr className={tableHeaderClass}>
          <th className="px-6 py-4.5">Recipient</th>
          <th className="px-6 py-4.5">Location</th>
          {variant === "dashboard" ? (
            <>
              <th className="px-6 py-4.5">Schedule</th>
              <th className="px-6 py-4.5 text-center">Blood Group</th>
            </>
          ) : (
            <>
              <th className="px-6 py-4.5">Blood Group</th>
              <th className="px-6 py-4.5">Schedule</th>
            </>
          )}
          <th className="px-6 py-4.5">Status</th>
          <th className="px-6 py-4.5">
            {variant === "my-requests" ? "Donor Info" : "Assigned Donor"}
          </th>
          <th className="px-6 py-4.5 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/40 text-sm overflow-visible">
        {requests.map((request, index) => {
          const detailUrl =
            variant === "dashboard"
              ? `/dashboard/donation-requests/view/${request._id}`
              : `/donation-requests/${request._id}`;

          // স্মার্ট লজিক: যদি রিকোয়েস্ট ৩টির বেশি হয় এবং কারেন্ট রো শেষ ২টি রোর একটি হয়, তবে ড্রপডাউন উপরে উঠবে।
          const isLastRow = requests.length > 2 && index >= requests.length - 2;

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
                        variant === "dashboard" ? "truncate max-w-[180px]" : ""
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
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold ${variant === "all-requests" ? "bg-rose-50 text-rose-700 border border-rose-100" : "bg-red-50 text-red-700 border border-red-100"}`}
                    >
                      <Heart
                        className={`w-3 h-3 ${variant === "all-requests" ? "fill-rose-500 text-rose-500" : "fill-red-500 text-red-500"}`}
                      />
                      {request.bloodGroup}
                    </span>
                  </td>

                  {/* Schedule */}
                  <td className="px-6 py-4">
                    <div className="space-y-0.5 text-xs text-muted-foreground">
                      <p className="flex items-center gap-1 text-foreground/80 font-medium font-body">
                        <Calendar className="w-3.5 h-3.5 opacity-60" />{" "}
                        {request.donationDate}
                      </p>
                      <p
                        className={`flex items-center gap-1 font-body ${variant === "all-requests" ? "pl-4.5" : "pl-[18px]"}`}
                      >
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
                      variant === "dashboard" ? "space-y-0.5 max-w-[160px]" : ""
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
                        ? "text-muted-foreground/30 italic font-light tracking-wide"
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
                  className={
                    variant === "dashboard"
                      ? "p-2 rounded-xl border border-border/50 bg-secondary/40 hover:bg-muted hover:border-border text-muted-foreground hover:text-foreground transition focus:outline-none inline-flex items-center justify-center disabled:opacity-40"
                      : "p-1.5 rounded-lg border border-transparent hover:bg-muted text-muted-foreground transition focus:outline-none inline-flex items-center justify-center disabled:opacity-40"
                  }
                >
                  {actionLoadingId === request._id ? (
                    <Loader2
                      className={`w-4 h-4 animate-spin ${variant === "dashboard" ? "text-primary" : ""}`}
                    />
                  ) : (
                    <MoreVertical className="w-4 h-4" />
                  )}
                </button>

                {openMenuId === request._id && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute right-6 w-52 border border-border rounded-xl shadow-2xl z-50 py-1.5 text-left transition-all duration-150
                      ${variant === "dashboard" ? "bg-secondary" : "bg-background"}
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
                      className={
                        variant === "dashboard"
                          ? "flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition"
                          : "flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition"
                      }
                    >
                      <Eye
                        className={
                          variant === "dashboard"
                            ? "w-4 h-4 text-muted-foreground"
                            : "w-3.5 h-3.5 text-muted-foreground"
                        }
                      />
                      View Details
                    </Link>

                    {/* Edit + Delete */}
                    {(variant !== "all-requests" || role === "admin") && (
                      <>
                        <Link
                          href={`/dashboard/donation-requests/edit/${request._id}`}
                          onClick={() => setOpenMenuId(null)}
                          className={
                            variant === "dashboard"
                              ? "flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition"
                              : "flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition"
                          }
                        >
                          <Edit
                            className={
                              variant === "dashboard"
                                ? "w-4 h-4 text-blue-500"
                                : "w-3.5 h-3.5 text-blue-500"
                            }
                          />
                          Edit Request
                        </Link>

                        <button
                          onClick={() => {
                            onDeleteTrigger(request._id);
                            setOpenMenuId(null);
                          }}
                          className={
                            variant === "dashboard"
                              ? "w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-danger hover:bg-danger/10 transition border-t border-border/40"
                              : "w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 transition border-t border-border/40"
                          }
                        >
                          <Trash2
                            className={
                              variant === "dashboard"
                                ? "w-4 h-4"
                                : "w-3.5 h-3.5"
                            }
                          />
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
                          className={
                            variant === "dashboard"
                              ? "w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-emerald-500 hover:bg-emerald-500/10 transition border-t border-border/40"
                              : "w-full flex items-center gap-2 px-3 py-2 text-xs text-emerald-700 hover:bg-emerald-50 transition border-t border-border/40"
                          }
                        >
                          <CheckCircle2
                            className={
                              variant === "dashboard"
                                ? "w-4 h-4"
                                : "w-3.5 h-3.5 text-emerald-600"
                            }
                          />
                          Mark as Done
                        </button>

                        <button
                          onClick={() => {
                            onUpdateStatus(request._id, "canceled");
                            setOpenMenuId(null);
                          }}
                          className={
                            variant === "dashboard"
                              ? "w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted transition"
                              : "w-full flex items-center gap-2 px-3 py-2 text-xs text-stone-600 hover:bg-stone-50 transition"
                          }
                        >
                          <XCircle
                            className={
                              variant === "dashboard"
                                ? "w-4 h-4"
                                : "w-3.5 h-3.5 text-stone-500"
                            }
                          />
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
  );
}
