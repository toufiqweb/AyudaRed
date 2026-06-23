"use client";

import { ArrowRight, Search, Heart, FileText, Activity, ShieldCheck, Clock, Users } from "lucide-react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useSession } from "@/lib/auth-client";

export default function Banner() {
  const { data: session } = useSession();

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden select-none flex flex-col justify-center items-center pt-24 pb-20">
      {/* 1. Subtle Radial Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none z-0" />

      {/* 2. Extremely Subtle Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden opacity-[0.02] dark:opacity-[0.01]">
        <span className="text-[180px] sm:text-[250px] lg:text-[350px] font-black tracking-tighter text-foreground">
          BLOOD
        </span>
      </div>

      {/* 3. Main Editorial Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center justify-center w-full">
        {/* Pre-heading Badge */}
        <div className="mb-6 text-primary font-bold text-sm sm:text-base tracking-wide uppercase">
          Connecting Communities
        </div>

        {/* Main Huge Headline */}
        <h1 className="text-[48px] sm:text-[76px] lg:text-[96px] font-black tracking-tighter max-w-6xl leading-[1.05] font-heading text-foreground">
          Connecting Life Savers With <br className="hidden lg:inline" /> Those
          Who Need Blood Most
        </h1>

        {/* Supporting Text Paragraph */}
        <p className="mt-8 text-lg sm:text-xl text-foreground/70 font-normal leading-relaxed max-w-[700px] font-body mx-auto">
          Manage blood donation requests, find compatible donors, track
          donations, and support communities through a secure modern platform.
        </p>

        {/* Trust Section Logos Row */}
        <div 
          className="mt-12 w-full max-w-4xl mx-auto overflow-hidden relative py-3"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)'
          }}
        >
          <Marquee speed={40} pauseOnHover={true} play={true}>
            <div className="flex items-center justify-around gap-16 pr-16 text-foreground/80">
              <div className="flex items-center gap-2.5">
                <div className="bg-foreground text-background rounded-full p-1.5">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <span className="text-base sm:text-lg font-bold tracking-tight whitespace-nowrap">
                  Blood Donors
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="bg-foreground text-background rounded-full p-1.5">
                  <FileText className="w-4 h-4 fill-current" />
                </div>
                <span className="text-base sm:text-lg font-bold tracking-tight whitespace-nowrap">
                  Donation Requests
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="bg-foreground text-background rounded-full p-1.5">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-base sm:text-lg font-bold tracking-tight whitespace-nowrap">
                  Lives Saved
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="bg-foreground text-background rounded-full p-1.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-base sm:text-lg font-bold tracking-tight whitespace-nowrap">
                  Verified Platform
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="bg-foreground text-background rounded-full p-1.5">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-base sm:text-lg font-bold tracking-tight whitespace-nowrap">
                  24/7 Emergency Support
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="bg-foreground text-background rounded-full p-1.5">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-base sm:text-lg font-bold tracking-tight whitespace-nowrap">
                  Active Community
                </span>
              </div>
            </div>
          </Marquee>
        </div>

        {/* Action Buttons Layout */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
          {/* Primary Call to Action */}
          <Link
            href={session ? "/dashboard" : "/sign-in"}
            className="group flex items-center justify-center gap-2 w-full sm:w-auto min-w-[220px] bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-full transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] active:scale-[0.98]"
          >
            <span className="text-base tracking-wide">Become a Donor</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary Action */}
          <Link
            href="/search-donors"
            className="flex items-center justify-center gap-2 w-full sm:w-auto min-w-[220px] bg-background hover:bg-muted text-foreground border border-border/80 font-semibold px-8 py-4 rounded-full transition-all active:scale-[0.98] shadow-sm"
          >
            <Search className="w-4 h-4 text-foreground/60" />
            <span className="text-base tracking-wide">Search Donors</span>
          </Link>
        </div>
      </main>

      {/* 4. Interactive Bottom Scroll Indicator */}
      <div className="absolute bottom-8 z-20 hidden sm:block">
        <div className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-border p-1.5 hover:border-foreground/50 transition cursor-pointer">
          <span className="h-2.5 w-1 rounded-full bg-foreground/30 animate-bounce mt-1" />
        </div>
      </div>
    </div>
  );
}
