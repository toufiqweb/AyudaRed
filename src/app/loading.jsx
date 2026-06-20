import { Heart, Droplets, Activity } from "lucide-react";

export default function BloodDonationLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full bg-background px-4 font-sans select-none">
      <div className="relative flex flex-col items-center justify-center max-w-sm text-center space-y-6">
        {/* Animated Vector Manifest Layer */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Background Ambient Pulses */}
          <span className="absolute inline-flex h-20 w-20 rounded-full bg-primary/10 animate-ping" />
          <span className="absolute inline-flex h-16 w-16 rounded-full bg-primary/20 animate-pulse" />

          {/* Core Target Vector Asset */}
          <div className="relative bg-secondary border border-border p-4 rounded-xl shadow-md shadow-primary/5 z-10 animate-bounce">
            <Droplets className="w-10 h-10 text-primary fill-primary" />
          </div>

          {/* Sub-Node Vector Asset Overlay */}
          <div className="absolute top-1 right-1 bg-background border border-border p-1.5 rounded-xl shadow-sm z-20 animate-pulse">
            <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
          </div>
        </div>

        {/* Messaging & Execution Progress Manifest */}
        <div className="space-y-3 w-full">
          <h2 className="text-base font-extrabold tracking-tight text-foreground flex items-center justify-center gap-2 font-heading uppercase">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span>Connecting Lifelines</span>
          </h2>

          <p className="text-xs text-secondary-foreground/60 max-w-[260px] mx-auto leading-relaxed font-medium font-body">
            Fetching the nearest blood donors and live request directories...
          </p>

          {/* Platform Linear Pulse Matrix */}
          <div className="w-40 h-1 bg-secondary border border-border/40 rounded-full mx-auto overflow-hidden">
            <div className="h-full w-full bg-primary rounded-full animate-pulse" />
          </div>
        </div>

        {/* Global Slogan Subtext Footer */}
        <p className="text-[10px] uppercase tracking-widest text-secondary-foreground/40 font-bold pt-4 font-sans">
          &ldquo;Every drop counts, every second matters&rdquo;
        </p>
      </div>
    </div>
  );
}
