"use client";
import { useState } from "react";
import {
  Heart,
  ArrowRight,
  Activity,
  ShieldCheck,
  Users,
  Droplet,
} from "lucide-react";

export default function CallToAction() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle modern onboarding route
  };

  return (
    <section className="section-container bg-background text-foreground">
      {/* Structural Ambient Background Circles inspired by the orbit design */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* ================= LEFT SIDE: Typographic Copy & Action Entry (As seen in image_489aa4.png) ================= */}
        <div className="lg:col-span-6 text-left space-y-6 max-w-2xl">
          <span className="section-badge bg-muted">
            <Droplet className="w-3.5 h-3.5 fill-current animate-pulse" />
            SaaS Lifecycle Core
          </span>

          <h2 className="section-title text-left lg:text-5xl">
            Optimize critical donor matching lines with smart network analytics
          </h2>

          <p className="section-subtitle text-left max-w-none">
            Discover how our automated emergency dispatch matrix connects
            verified donors, monitors regional inventory dropouts, and brings
            structural clarity to healthcare routing logistics.
          </p>

          {/* Inline Email Lead Onboarding Box */}
          <form
            onSubmit={handleSubmit}
            className="pt-2 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl"
          >
            <div className="relative w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your organization email"
                className="w-full px-4 py-3.5 rounded-xl bg-secondary border border-border/80 focus:border-primary text-sm placeholder:text-gray-500 focus:outline-none transition-all duration-150"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto whitespace-nowrap bg-primary hover:bg-primary/95 text-primary-foreground text-sm font-bold tracking-wide px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-primary/10 active:scale-[0.98] flex items-center justify-center gap-2 shrink-0"
            >
              Start Free Integration
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[11px] text-muted-custom font-medium pl-1">
            No long-term commitments • Fully encrypted, HIPAA-compliant gateway
            pipelines
          </p>
        </div>

        {/* ================= RIGHT SIDE: Floating Telemetry Matrix (Visual translation of image_489aa4.png) ================= */}
        <div className="lg:col-span-6 relative flex items-center justify-center h-[520px] w-full mt-8 lg:mt-0 select-none">
          {/* Concentric Structural Orbit Lines mapping directly to image_489aa4.png loops */}
          <div className="absolute rounded-full border border-border/30 w-[260px] h-[260px] animate-[spin_40s_linear_infinite]" />
          <div className="absolute rounded-full border border-border/20 w-[420px] h-[420px] animate-[spin_60s_linear_infinite]" />
          <div className="absolute rounded-full border border-border/15 w-[560px] h-[560px]" />

          {/* Center Identity Node (Replaces image avatar with clean, interactive brand pulse marker) */}
          <div className="absolute z-20 flex flex-col items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-secondary border-2 border-border p-1.5 shadow-xl flex items-center justify-center group relative">
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-70" />
              <div className="h-full w-full rounded-full bg-muted flex items-center justify-center text-primary border border-border/40">
                <Heart className="w-8 h-8 fill-current" />
              </div>
            </div>
            <div className="mt-3 px-3 py-1 bg-background border border-border text-[11px] font-bold rounded-lg shadow-md flex items-center gap-1">
              <span>Live Tracking</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* Floating Telemetry Element 1: Top Left - Request Volume */}
          <div className="absolute top-6 left-4 bg-secondary border border-border/80 p-4 rounded-xl shadow-lg max-w-[210px] space-y-2 transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-custom uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-primary" />
              Supply Metrics
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-custom">O+ Reserve</span>
                <span className="font-bold text-emerald-500">Optimal</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-custom">A- Reserve</span>
                <span className="font-bold text-primary animate-pulse">
                  Critical
                </span>
              </div>
            </div>
          </div>

          {/* Floating Telemetry Element 2: Top Right - Dynamic Match Rate Progress */}
          <div className="absolute top-12 right-2 bg-secondary border border-border/80 p-4 rounded-xl shadow-lg min-w-[200px] space-y-2 transform hover:-translate-y-1 transition-transform">
            <div className="text-xs font-bold text-muted-custom">
              Crossmatch Engine
            </div>
            <div className="flex items-end justify-between gap-2">
              <span className="text-2xl font-black text-foreground">99.4%</span>
              <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Accuracy
              </span>
            </div>
            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
              <div className="w-[94%] h-full bg-primary rounded-full" />
            </div>
          </div>

          {/* Floating Telemetry Element 3: Middle Right - Live Response Track */}
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 bg-secondary border border-border/80 p-3.5 rounded-xl shadow-lg space-y-2 transform hover:-translate-y-1 transition-transform">
            <div className="text-[11px] font-bold text-muted-custom uppercase">
              Response Curve
            </div>
            <div className="flex items-center gap-1 h-8 items-end">
              <div className="w-2 h-4 bg-muted rounded-xs" />
              <div className="w-2 h-6 bg-muted rounded-xs" />
              <div className="w-2 h-5 bg-muted rounded-xs" />
              <div className="w-2 h-8 bg-primary rounded-xs" />
              <div className="w-2 h-7 bg-primary rounded-xs" />
            </div>
          </div>

          {/* Floating Telemetry Element 4: Bottom Right - Top Networks */}
          <div className="absolute bottom-6 right-8 bg-secondary border border-border/80 p-4 rounded-xl shadow-lg min-w-[210px] space-y-2 transform hover:-translate-y-1 transition-transform">
            <div className="text-xs font-bold text-muted-custom">
              Regional Distribution
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-muted-custom">Sector-A Banks</span>
                <span className="font-bold text-foreground">
                  14 Units dispatched
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-custom">Sector-G Clinics</span>
                <span className="font-bold text-foreground">
                  8 Units dispatched
                </span>
              </div>
            </div>
          </div>

          {/* Floating Telemetry Element 5: Bottom Left - Compliance Check */}
          <div className="absolute bottom-12 left-6 bg-secondary border border-border/80 p-3.5 rounded-xl shadow-lg flex items-center gap-3 transform hover:-translate-y-1 transition-transform">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold text-foreground leading-none">
                DIN Verified
              </p>
              <p className="text-[9px] text-muted-custom mt-0.5 font-medium">
                Batch 100% Secure
              </p>
            </div>
          </div>

          {/* Floating Telemetry Element 6: Center Bottom - Team Operations Badge */}
          <div className="absolute bottom-2 left-1/3 bg-secondary border border-border/80 px-4 py-2.5 rounded-full shadow-md flex items-center gap-2 transform hover:-translate-y-1 transition-transform">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-bold text-muted-custom">
              4,120 Couriers Live
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
