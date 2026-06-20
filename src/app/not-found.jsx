import {
  Heart,
  FileQuestion,
  ArrowLeft,
  Home,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] w-full bg-background px-4 text-center font-sans select-none">
      <div className="max-w-md space-y-6 flex flex-col items-center">
        {/* Structural Vector Indicator Cluster */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Background Structural Ambient Shade */}
          <span className="absolute inline-flex h-24 w-24 rounded-full bg-secondary animate-pulse duration-1000" />

          {/* Primary Alert Context Vector Node */}
          <div className="relative bg-background border border-border/80 p-6 rounded-2xl shadow-xl shadow-foreground/5 z-10">
            <FileQuestion className="w-12 h-12 text-secondary-foreground/40 animate-bounce duration-1000" />
          </div>

          {/* Core Branding Sub-Node Overlay */}
          <div className="absolute bottom-2 right-2 bg-secondary border border-border p-2 rounded-xl shadow-md z-20">
            <Heart className="w-4 h-4 text-primary fill-primary" />
          </div>
        </div>

        {/* Messaging Logs Panel */}
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter text-foreground font-heading">
            404
          </h1>
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center justify-center gap-1.5 font-sans">
            <AlertCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Page Not Found</span>
          </h2>
          <p className="text-xs text-secondary-foreground/60 max-w-sm mx-auto leading-relaxed font-medium font-body">
            We couldn&apos;t locate the route or the explicit database entry you
            were querying. The resource might be archived, purged, or the system
            link integrity is broken.
          </p>
        </div>

        {/* Platform Core Navigation Pipeline */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          {/* Primary Action Element: Dashboard Directory Redirection */}
          <Link
            href="/dashboard/donation-requests"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Return to Dashboard</span>
          </Link>

          {/* Secondary Action Element: Platform Root Directory Redirection */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-secondary/40 hover:bg-secondary text-xs font-bold uppercase tracking-wider text-foreground transition-all active:scale-[0.98]"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home Base</span>
          </Link>
        </div>

        {/* Platform Copyright Identity Context */}
        <p className="text-[10px] uppercase tracking-widest text-secondary-foreground/40 font-bold pt-6 font-sans">
          Lifeline Network © 2026
        </p>
      </div>
    </div>
  );
}
