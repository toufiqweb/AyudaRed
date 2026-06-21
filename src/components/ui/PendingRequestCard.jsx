import Link from "next/link";
import {
  Calendar,
  Clock,
  Eye,
  MapPin,
  ArrowUpRight,
  Droplet,
} from "lucide-react";

const PendingRequestCard = ({ request }) => {
  return (
    <div className="bg-secondary border border-border/80 dark:border-white/[0.08] hover:border-primary/30 rounded-2xl p-5 flex flex-col justify-between group relative overflow-hidden text-left font-sans shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(178,30,30,0.08)] dark:hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),_0_15px_40px_rgba(174,25,25,0.12)] hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 select-none">
      
      {/* Background Subtle Gradient Glow on Hover */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/12 transition-all duration-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* 1. Top Right Blood Group Capsule (Visual Hero) */}
      <div className="absolute top-4 right-4 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-md shadow-xs group-hover:border-primary/50 transition-all duration-300">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-white shadow-inner animate-[pulse_2s_infinite]">
            <Droplet className="w-3 h-3 fill-current stroke-[2.5]" />
          </div>
          <span className="text-sm font-black text-foreground tracking-wider pr-1">
            {request.bloodGroup}
          </span>
        </div>
      </div>

      {/* 2. Card Content Blocks */}
      <div className="space-y-5 relative z-10">
        {/* Recipient Details */}
        <div className="space-y-1">
          <span className="text-[9px] font-bold tracking-widest uppercase text-muted-custom block font-sans">
            Recipient Manifest
          </span>
          <h3 className="text-lg font-black text-foreground truncate pr-24 group-hover:text-primary transition-colors font-heading tracking-tight">
            {request.recipientName}
          </h3>
        </div>

        {/* Location & Stats Info Grid */}
        <div className="space-y-4 text-xs font-sans">
          
          {/* Location Block */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-primary/10 border border-primary/15 rounded-xl text-primary shrink-0 shadow-xs">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="space-y-0.5 overflow-hidden">
              <p className="font-bold text-foreground line-clamp-1 font-sans text-xs">
                {request.hospitalName}
              </p>
              <p className="text-muted-custom text-[11px] line-clamp-1 font-sans font-medium">
                {request.recipientUpazila}, {request.recipientDistrict}
              </p>
            </div>
          </div>

          {/* Date & Time Metadata Panel */}
          <div className="grid grid-cols-2 gap-4 bg-background border border-border/85 p-3.5 rounded-2xl relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)]">
            <div className="space-y-1 text-left">
              <p className="text-[9px] font-bold text-muted-custom uppercase tracking-widest font-sans">
                Target Date
              </p>
              <p className="font-bold text-foreground/90 flex items-center gap-2 text-[11px] font-sans">
                <Calendar className="w-3.5 h-3.5 text-muted-custom shrink-0" />
                {request.donationDate}
              </p>
            </div>

            {/* Vertical Divider line */}
            <div className="absolute left-1/2 top-3 bottom-3 w-[1px] bg-border pointer-events-none" />

            <div className="space-y-1 text-left pl-3">
              <p className="text-[9px] font-bold text-muted-custom uppercase tracking-widest font-sans">
                Timeline
              </p>
              <p className="font-bold text-foreground/90 flex items-center gap-2 text-[11px] font-sans">
                <Clock className="w-3.5 h-3.5 text-muted-custom shrink-0" />
                {request.donationTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Action Trigger Footer Link */}
      <div className="mt-6 pt-5 border-t border-border/60 relative z-10">
        <Link
          href={`/donation-requests/${request._id}`}
          className="w-full relative overflow-hidden inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary text-primary-foreground border border-primary/20 shadow-sm hover:shadow-md hover:shadow-primary/10 font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 font-sans group/btn select-none"
        >
          {/* Shine Sweep Overlay */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
          
          <Eye className="w-4 h-4 transition-transform group-hover/btn:scale-110 relative z-10" />
          <span className="relative z-10">View Details</span>
          <ArrowUpRight className="w-4 h-4 translate-x-[-4px] opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300 relative z-10" />
        </Link>
      </div>
    </div>
  );
};

export default PendingRequestCard;
