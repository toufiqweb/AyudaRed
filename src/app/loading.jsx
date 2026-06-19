import { Heart, Droplets } from "lucide-react";

export default function BloodDonationLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full bg-background px-4">
      <div className="relative flex flex-col items-center justify-center max-w-sm text-center space-y-6">
        {/* ব্লাড ড্রপলেট ও হার্ট অ্যানিমেশন */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* ব্যাকগ্রাউন্ড রিফেল/পিং ইফেক্ট */}
          <span className="absolute inline-flex h-20 w-20 rounded-full bg-rose-500/10 animate-ping" />
          <span className="absolute inline-flex h-16 w-16 rounded-full bg-rose-500/20 animate-pulse" />

          {/* মেইন ব্লাড ড্রপ */}
          <div className="relative bg-rose-50 border-2 border-rose-100 p-4 rounded-full shadow-md shadow-rose-500/5 z-10 animate-bounce">
            <Droplets className="w-10 h-10 text-rose-600 fill-rose-600" />
          </div>

          {/* ছোট্ট হার্ট আইকন */}
          <div className="absolute top-1 right-1 bg-white border border-border p-1.5 rounded-full shadow-sm z-20 animate-pulse">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>

        {/* টেক্সট এবং প্রোগ্রেস বার */}
        <div className="space-y-3 w-full">
          <h2 className="text-base font-bold tracking-tight text-foreground flex items-center justify-center gap-1.5">
            Connecting Lifelines 🩸
          </h2>

          <p className="text-xs text-muted-foreground max-w-[250px] mx-auto leading-relaxed font-medium">
            Fetching the nearest blood donors and live request directories...
          </p>

          {/* Next.js ফ্রেন্ডলি রিফ্রেশিং পালস বার */}
          <div className="w-40 h-1 bg-muted rounded-full mx-auto overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-rose-500 to-red-600 rounded-full animate-pulse" />
          </div>
        </div>

        {/* নিচের স্লোগান */}
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold pt-4 select-none">
          &ldquo;Every drop counts, every second matters&rdquo;
        </p>
      </div>
    </div>
  );
}
