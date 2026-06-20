import Link from "next/link";
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const PendingRequestCard = ({ request }) => {
  return (
    <div className="bg-secondary/40 border border-border/60 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden text-left font-sans backdrop-blur-sm">
      {/* Background Subtle Gradient Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* 1. Top Right Blood Group Badge Layer */}
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black bg-primary/10 border border-primary/20 text-primary shadow-sm font-sans tracking-wide">
          <Heart className="w-3.5 h-3.5 fill-current animate-[pulse_2.5s_infinite_ease-in-out]" />
          {request.bloodGroup}
        </span>
      </div>

      {/* 2. Card Content Blocks */}
      <div className="space-y-4 relative z-10">
        {/* Recipient Details */}
        <div className="space-y-1">
          <span className="text-[9px] font-bold tracking-widest uppercase text-secondary-foreground/40 block font-sans">
            Recipient Manifest
          </span>
          <h3 className="text-base font-extrabold text-foreground truncate pr-20 group-hover:text-primary transition-colors font-heading tracking-tight">
            {request.recipientName}
          </h3>
        </div>

        {/* Location Mechanics */}
        <div className="space-y-3 text-xs font-sans">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 bg-background border border-border/80 rounded-lg text-primary shrink-0 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-0.5 overflow-hidden">
              <p className="font-bold text-foreground line-clamp-1 font-sans text-xs">
                {request.hospitalName}
              </p>
              <p className="text-secondary-foreground/60 text-[11px] line-clamp-1 font-sans font-medium">
                {request.recipientUpazila}, {request.recipientDistrict}
              </p>
            </div>
          </div>

          {/* Date & Time Metadata Grid Panel */}
          <div className="grid grid-cols-2 gap-3 bg-background border border-border/60 p-3 rounded-xl">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-secondary-foreground/40 uppercase tracking-widest font-sans">
                Target Date
              </p>
              <p className="font-bold text-foreground flex items-center gap-1.5 text-[11px] font-sans">
                <Calendar className="w-3.5 h-3.5 text-secondary-foreground/40 shrink-0" />
                {request.donationDate}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[9px] font-bold text-secondary-foreground/40 uppercase tracking-widest font-sans">
                Timeline
              </p>
              <p className="font-bold text-foreground flex items-center gap-1.5 text-[11px] font-sans">
                <Clock className="w-3.5 h-3.5 text-secondary-foreground/40 shrink-0" />
                {request.donationTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Action Trigger Footer Link */}
      <div className="mt-5 pt-4 border-t border-border/60 relative z-10">
        <Link
          href={`/donation-requests/${request._id}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-secondary border border-border/80 hover:bg-primary text-foreground hover:text-primary-foreground font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20 font-sans group/btn shadow-sm"
        >
          <Eye className="w-3.5 h-3.5 transition-transform group-hover/btn:scale-110" />
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-150" />
        </Link>
      </div>
    </div>
  );
};

export default PendingRequestCard;
