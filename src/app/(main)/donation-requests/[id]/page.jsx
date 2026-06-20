import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  Hospital,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { getDonationRequestById } from "@/lib/api/requests";
import { useUserServerSession } from "@/lib/core/sessionSever";
import DonationConfirmModal from "@/components/ui/DonationConfirmModal";

export default async function DonationRequestsDetails({ params }) {
  const { id } = await params;

  const user = await useUserServerSession();

  let request = null;
  let error = "";

  try {
    request = await getDonationRequestById(id);
  } catch (err) {
    error = err.message || "Failed to load request details.";
  }

  if (error || !request) {
    return (
      <div className="max-w-md mx-auto p-4 mt-12 text-center bg-destructive/10 border border-destructive/20 rounded-2xl font-sans">
        <p className="text-sm text-destructive font-semibold">
          {error || "Request not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-2 sm:p-4 mt-8 md:mt-12">
      <div className="bg-background border border-border p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider bg-muted px-2 py-0.5 rounded font-sans">
            Emergency Case File
          </span>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground mt-1.5 font-heading">
            Request for {request.recipientName}
          </h1>
        </div>
        <div>
          <span
            className={`px-3 py-1 border rounded-full text-xs font-bold capitalize font-sans ${
              request.donationStatus === "pending"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : request.donationStatus === "inprogress"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : request.donationStatus === "done"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-stone-50 text-stone-600 border-stone-200"
            }`}
          >
            Status: {request.donationStatus}
          </span>
        </div>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden divide-y divide-border/60">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/10">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 shrink-0">
              <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase font-sans">
                Required Blood Group
              </p>
              <h3 className="text-xl font-black text-rose-700 font-heading">
                {request.bloodGroup}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 shrink-0">
              <Hospital className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase font-sans">
                Medical Hospital Destination
              </p>
              <h3 className="text-sm font-bold text-foreground line-clamp-1 font-heading">
                {request.hospitalName}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5 font-heading">
            <Calendar className="w-4 h-4" /> Date & Timeline Parameters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-border p-3 rounded-xl flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground opacity-60" />
              <div>
                <p className="text-[10px] text-muted-foreground font-sans">
                  Donation Date
                </p>
                <p className="text-sm font-semibold text-foreground font-sans">
                  {request.donationDate}
                </p>
              </div>
            </div>
            <div className="border border-border p-3 rounded-xl flex items-center gap-3">
              <Clock className="w-4 h-4 text-muted-foreground opacity-60" />
              <div>
                <p className="text-[10px] text-muted-foreground font-sans">
                  Expected Time
                </p>
                <p className="text-sm font-semibold text-foreground font-sans">
                  {request.donationTime}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5 font-heading">
            <MapPin className="w-4 h-4" /> Geographic Target Address
          </h3>
          <div className="space-y-1 bg-muted/30 p-3.5 rounded-xl border border-border/40 text-sm">
            <p className="font-semibold text-foreground flex items-center gap-1 font-sans">
              {request.recipientUpazila}, {request.recipientDistrict}
            </p>
            <p className="text-xs text-muted-foreground pl-0 mt-1 flex items-start gap-1 font-sans">
              <span className="font-medium text-foreground shrink-0">
                Full Address:
              </span>{" "}
              {request.fullAddress}
            </p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase font-sans">
              Posted By
            </p>
            <p className="text-sm font-semibold text-foreground mt-0.5 font-sans">
              {request.requesterName}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase font-sans">
              Contact Email
            </p>
            <p className="text-sm font-semibold text-muted-foreground mt-0.5 truncate font-sans">
              {request.requesterEmail}
            </p>
          </div>
        </div>

        {request.requestMessage && (
          <div className="p-6 space-y-2">
            <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5 font-heading">
              <MessageSquare className="w-4 h-4" /> Message / Case Details
            </h3>
            <p className="text-xs text-muted-foreground bg-muted/40 p-4 border border-border/60 rounded-xl leading-relaxed italic font-body">
              &ldquo;{request.requestMessage}&rdquo;
            </p>
          </div>
        )}

        <div className="p-6 bg-muted/20 flex justify-end">
          {request.donationStatus === "pending" ? (
            <DonationConfirmModal requestId={request._id} user={user} />
          ) : (
            <div className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 border border-border bg-background px-4 py-2 rounded-xl font-sans">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              This request is currently being handled by{" "}
              <span className="text-foreground font-semibold">
                {request.donorName || "another volunteer"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
