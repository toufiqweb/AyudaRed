import { Heart, Search } from "lucide-react";

export default function FundingSection() {
  return (
    <section className="dark bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8 w-full transition-colors duration-300 relative flex items-center justify-center">
      {/* 1. Subtle Accent Background Glow / Radial Effect mimicking the faint back-lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* 2. Main Centered Content Container */}
      <div className="mx-auto max-w-3xl text-center relative z-10 flex flex-col items-center">
        {/* Component Title matching image_4986fe.png */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground font-heading">
          Funding Section
        </h2>

        {/* Descriptive Supporting Text */}
        <p className="mt-4 text-sm sm:text-base text-gray-400 font-normal leading-relaxed max-w-2xl font-body">
          Manage blood donation requests, find compatible donors, track
          donations, and support communities platforms.
        </p>

        {/* 3. Inverted Theme Action Button Group */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Primary Solid/Inverted CTA Button */}
          <button className="group flex items-center justify-center gap-2 w-full sm:w-auto min-w-[170px] bg-foreground text-background font-semibold px-6 py-3 rounded-xl transition-all hover:opacity-90 active:scale-[0.98] shadow-md">
            <Heart className="w-4 h-4 fill-current text-primary" />
            <span className="text-sm tracking-wide">Become a Donor</span>
          </button>

          {/* Secondary Outline / Dark Button Setup */}
          <button className="flex items-center justify-center gap-2 w-full sm:w-auto min-w-[170px] bg-secondary hover:bg-muted text-secondary-foreground border border-border/80 font-semibold px-6 py-3 rounded-xl transition-all active:scale-[0.98]">
            <Search className="w-4 h-4 text-gray-400" />
            <span className="text-sm tracking-wide">Search Donors</span>
          </button>
        </div>
      </div>
    </section>
  );
}
