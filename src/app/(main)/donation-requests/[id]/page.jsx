import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  Hospital,
  MessageSquare,
  CheckCircle2,
  User,
  Mail,
  ShieldCheck,
  AlertCircle,
  Activity,
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
      <div className="max-w-md mx-auto p-5 mt-16 text-center bg-danger/10 border border-danger/20 rounded-2xl font-sans">
        <p className="text-sm text-danger font-semibold">
          {error || "Request not found"}
        </p>
      </div>
    );
  }

  const statusStyles = {
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    inprogress: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    done: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    cancelled: "bg-muted text-secondary-foreground/60 border-border",
  };

  const activeStatusClass =
    statusStyles[request.donationStatus] || statusStyles.cancelled;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-background text-foreground transition-colors duration-200 min-h-screen space-y-8">
      {/* TOP MAIN HEADER BOARD */}
      <div className="bg-secondary/20 border border-border p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-md font-sans tracking-widest flex items-center gap-1">
              <Activity className="w-3 h-3" /> Live File Manifest
            </span>
            <span className="text-[10px] font-bold uppercase text-secondary-foreground/50 bg-secondary border border-border px-2.5 py-0.5 rounded-md font-sans tracking-widest">
              ID: {id?.toString().slice(-6).toUpperCase() || "N/A"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading">
            Emergency Record for {request.recipientName}
          </h1>
          <p className="text-xs text-secondary-foreground/60 font-medium font-body max-w-xl">
            This workspace showcases immediate blood logistical targets. Verify
            details below before initiating a commitment dispatch protocol.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`px-4 py-1.5 border rounded-xl text-xs font-bold uppercase tracking-wider font-sans ${activeStatusClass}`}
          >
            System Status: {request.donationStatus}
          </span>
        </div>
      </div>

      {/* CORE UTILITY GRID SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT COLUMN: VITAL METRICS & LOGISTICS */}
        <div className="lg:col-span-2 space-y-6">
          {/* CRITICAL INFOGRAPHIC HERO ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-secondary/40 border border-border p-6 rounded-2xl shadow-sm flex items-center gap-5 transition-all hover:bg-secondary/50">
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary shrink-0">
                <Heart className="w-8 h-8 fill-primary text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-secondary-foreground/40 uppercase font-sans">
                  Required Blood Type
                </p>
                <h3 className="text-3xl font-black text-primary font-heading mt-0.5">
                  {request.bloodGroup}
                </h3>
              </div>
            </div>

            <div className="bg-secondary/40 border border-border p-6 rounded-2xl shadow-sm flex items-center gap-5 transition-all hover:bg-secondary/50">
              <div className="p-4 bg-primary/5 border border-border rounded-xl text-foreground shrink-0">
                <Hospital className="w-8 h-8 opacity-80" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold tracking-widest text-secondary-foreground/40 uppercase font-sans">
                  Medical Facility Unit
                </p>
                <h3
                  className="text-base font-bold text-foreground truncate font-heading mt-1"
                  title={request.hospitalName}
                >
                  {request.hospitalName}
                </h3>
              </div>
            </div>
          </div>

          {/* TIMELINE & GEOGRAPHIC TRACKING MAP BLOCK */}
          <div className="bg-secondary/10 border border-border rounded-2xl shadow-sm overflow-hidden divide-y divide-border/60">
            {/* Parameters Block */}
            <div className="p-6 space-y-4">
              <h3 className="text-xs font-bold tracking-wider text-secondary-foreground/50 uppercase flex items-center gap-2 font-heading">
                <Calendar className="w-4 h-4 text-primary" /> Timeline Manifest
                Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-background border border-border p-4 rounded-xl flex items-center gap-3.5">
                  <Calendar className="w-4 h-4 text-secondary-foreground/40" />
                  <div>
                    <p className="text-[10px] text-secondary-foreground/40 font-bold uppercase tracking-wider font-sans">
                      Target Donation Date
                    </p>
                    <p className="text-sm font-bold text-foreground font-sans mt-0.5">
                      {request.donationDate}
                    </p>
                  </div>
                </div>
                <div className="bg-background border border-border p-4 rounded-xl flex items-center gap-3.5">
                  <Clock className="w-4 h-4 text-secondary-foreground/40" />
                  <div>
                    <p className="text-[10px] text-secondary-foreground/40 font-bold uppercase tracking-wider font-sans">
                      Expected Delivery Time
                    </p>
                    <p className="text-sm font-bold text-foreground font-sans mt-0.5">
                      {request.donationTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Geography Block */}
            <div className="p-6 space-y-4">
              <h3 className="text-xs font-bold tracking-wider text-secondary-foreground/50 uppercase flex items-center gap-2 font-heading">
                <MapPin className="w-4 h-4 text-primary" /> Logistical
                Distribution Zone
              </h3>
              <div className="bg-background border border-border p-5 rounded-xl space-y-3">
                <div>
                  <p className="text-[10px] text-secondary-foreground/40 font-bold uppercase tracking-wider font-sans">
                    Region Hub
                  </p>
                  <p className="font-bold text-base text-foreground font-sans mt-0.5">
                    {request.recipientUpazila}, {request.recipientDistrict}
                  </p>
                </div>
                <div className="pt-2 border-t border-border/40">
                  <p className="text-[10px] text-secondary-foreground/40 font-bold uppercase tracking-wider font-sans">
                    Full Descriptors Line
                  </p>
                  <p className="text-xs font-medium text-secondary-foreground/80 font-sans mt-1 leading-relaxed">
                    {request.fullAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Message Block */}
            {request.requestMessage && (
              <div className="p-6 space-y-3">
                <h3 className="text-xs font-bold tracking-wider text-secondary-foreground/50 uppercase flex items-center gap-2 font-heading">
                  <MessageSquare className="w-4 h-4 text-primary" /> Patient
                  Diagnosis Context Brief
                </h3>
                <div className="text-xs text-secondary-foreground/80 bg-background border border-border/80 p-5 rounded-xl leading-relaxed font-body relative">
                  <span className="text-3xl text-primary/20 absolute top-2 left-2 pointer-events-none font-serif">
                    &ldquo;
                  </span>
                  <p className="pl-4 italic font-medium">
                    {request.requestMessage}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: DISPATCH SIDEBAR, CONTACTS & STATIC POLICIES */}
        <div className="space-y-6">
          {/* USER CONTACT CARD */}
          <div className="bg-secondary/30 border border-border p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-secondary-foreground/50 uppercase font-heading border-b border-border/40 pb-2">
              File Requester Node
            </h3>
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background border border-border rounded-lg text-secondary-foreground/60">
                  <User className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[9px] text-secondary-foreground/40 font-bold uppercase tracking-wider font-sans">
                    Operator Label
                  </p>
                  <p className="text-xs font-bold text-foreground truncate font-sans">
                    {request.requesterName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background border border-border rounded-lg text-secondary-foreground/60">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[9px] text-secondary-foreground/40 font-bold uppercase tracking-wider font-sans">
                    Communications Route
                  </p>
                  <p className="text-xs font-medium text-secondary-foreground/70 truncate font-sans">
                    {request.requesterEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PREMIUM STATIC INFO AREA 1: COMPLIANCE STRATEGY */}
          <div className="bg-secondary/10 border border-border p-6 rounded-2xl shadow-sm space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-secondary-foreground/70 uppercase flex items-center gap-2 font-heading">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Platform
              Safety Compliance
            </h4>
            <ul className="text-[11px] space-y-2.5 text-secondary-foreground/60 font-body list-none pl-0">
              <li className="flex gap-2 items-start">
                <span className="text-primary font-bold">▪</span>
                Ensure a rigorous 90-day diagnostic window interval separation
                has elapsed since your prior cellular donation process.
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-primary font-bold">▪</span>
                Maintain standard caloric and systemic hydration parameters
                before reporting to the scheduled medical destination.
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-primary font-bold">▪</span>
                Always ensure a physical state identification badge is brought
                forward for credential verification at the facility desk.
              </li>
            </ul>
          </div>

          {/* PREMIUM STATIC INFO AREA 2: DISCLAIMER MATRIX */}
          <div className="bg-secondary/10 border border-border p-6 rounded-2xl shadow-sm space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-secondary-foreground/70 uppercase flex items-center gap-2 font-heading">
              <AlertCircle className="w-4 h-4 text-primary" /> Operational
              Disclaimer
            </h4>
            <p className="text-[11px] text-secondary-foreground/50 leading-relaxed font-body">
              This system operates purely as an infrastructure communications
              bridge interface. Platform management is structurally absolved
              from clinical operational updates, medical liabilities, or
              scheduling anomalies.
            </p>
          </div>

          {/* DISPATCH ACTION CAPTURE CONTAINER */}
          <div className="bg-secondary/30 border border-primary/20 p-5 rounded-2xl shadow-sm bg-gradient-to-b from-secondary/30 to-primary/5">
            {request.donationStatus === "pending" ? (
              <div className="space-y-3">
                <p className="text-[11px] text-secondary-foreground/60 font-medium font-sans text-center">
                  This deployment file remains unclaimed. Ready for fulfillment
                  operations?
                </p>
                <DonationConfirmModal requestId={request._id} user={user} />
              </div>
            ) : (
              <div className="text-xs text-secondary-foreground/70 font-medium flex items-start gap-3 border border-border bg-background p-4 rounded-xl font-sans leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-foreground uppercase tracking-wider text-[9px] text-secondary-foreground/40 mb-0.5">
                    Allocation Notice
                  </span>
                  This request token is locked and currently being handled by{" "}
                  <span className="text-primary font-semibold">
                    {request.donorName || "another volunteer operator"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
