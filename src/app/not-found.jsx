import { Heart, FileQuestion, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] w-full bg-background px-4 text-center">
      <div className="max-w-md space-y-6 flex flex-col items-center">
        {/* ইলাস্ট্রেশন/আইকন জোন */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* ব্যাকগ্রাউন্ড পালস শেড */}
          <span className="absolute inline-flex h-24 w-24 rounded-full bg-muted animate-pulse duration-1000" />

          {/* মেইন ৪MD/হার্টব্রেক আইকন */}
          <div className="relative bg-background border border-border p-6 rounded-3xl shadow-xl shadow-foreground/5 z-10">
            <FileQuestion className="w-12 h-12 text-muted-foreground animate-bounce duration-1000" />
          </div>

          {/* ছোট্ট ব্লাড ড্রপলেট/হার্ট আইকন যা রিলেটেবল ফিল দিবে */}
          <div className="absolute bottom-2 right-2 bg-rose-50 border border-rose-100 p-2 rounded-full shadow-md z-20">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
        </div>

        {/* টেক্সট মেসেজ */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            404
          </h1>
          <h2 className="text-lg font-bold text-foreground">
            Page Not Found 🩸
          </h2>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed font-medium">
            We couldn&apos;t find the page or the specific blood donation request you
            were looking for. It might have been deleted, completed, or the link
            is broken.
          </p>
        </div>

        {/* নেভিগেশন অ্যাকশন বাটনসমূহ */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          {/* আগের পেজে ফিরে যাওয়ার বাটন */}
          <Link
            href="/dashboard/donation-requests"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-600 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full hover:bg-rose-700 transition shadow-sm focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" /> Go back to Dashboard
          </Link>

          {/* হোমপেজে যাওয়ার বাটন */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border bg-muted/40 hover:bg-muted text-xs sm:text-sm font-semibold text-slate-600 transition"
          >
            <Home className="w-4 h-4" /> Home Page
          </Link>
        </div>

        {/* ফুটার মেসেজ */}
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-bold pt-6 select-none">
          Lifeline Network © 2026
        </p>
      </div>
    </div>
  );
}
