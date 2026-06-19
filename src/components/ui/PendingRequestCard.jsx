import Link from "next/link";
import { Calendar, Clock, Eye, Heart, MapPin } from "lucide-react";

const PendingRequestCard = ({ request }) => {
  return (
    <div className="bg-secondary border border-border/50 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-border transition-all duration-200 flex flex-col justify-between group relative overflow-hidden text-left font-sans">
      {/* 1. Top Right Blood Group Badge Layer */}
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-muted border border-border text-foreground shadow-sm font-sans">
          <Heart className="w-3.5 h-3.5 fill-primary text-primary animate-[pulse_2.5s_infinite_ease-in-out]" />
          {request.bloodGroup}
        </span>
      </div>

      {/* 2. Card Content Blocks */}
      <div className="space-y-4">
        {/* Recipient Details */}
        <div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground/80 block font-sans">
            Recipient
          </span>
          <h3 className="text-base font-bold text-foreground mt-0.5 truncate pr-20 group-hover:text-primary transition-colors">
            {request.recipientName}
          </h3>
        </div>

        {/* Location Mechanics */}
        <div className="space-y-3 text-xs font-sans">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-semibold text-foreground line-clamp-1 font-sans">
                {request.hospitalName}
              </p>
              <p className="text-muted-foreground/70 text-[11px] line-clamp-1 font-sans">
                {request.recipientUpazila}, {request.recipientDistrict}
              </p>
            </div>
          </div>

          {/* Date & Time Metadata Grid Panel */}
          <div className="grid grid-cols-2 gap-3 bg-muted border border-border/40 p-3 rounded-xl">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-wide font-sans">
                Date
              </p>
              <p className="font-bold text-foreground flex items-center gap-1.5 text-[11px] font-sans">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
                {request.donationDate}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-wide font-sans">
                Time
              </p>
              <p className="font-bold text-foreground flex items-center gap-1.5 text-[11px] font-sans">
                <Clock className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
                {request.donationTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Action Trigger Footer Link */}
      <div className="mt-5 pt-4 border-t border-border/40">
        <Link
          href={`/donation-requests/${request._id}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-muted hover:bg-primary text-foreground hover:text-primary-foreground font-bold text-xs py-3 px-4 rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20 font-sans"
        >
          <Eye className="w-4 h-4" />
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PendingRequestCard;
