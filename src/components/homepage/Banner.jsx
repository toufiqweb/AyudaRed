import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";

const Banner = () => {
  return (
    <div className="w-full min-h-[500px] md:h-[600px] bg-background flex items-center relative overflow-hidden transition-colors duration-300">
      {/* Decorative background accent grids or glows */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10 py-12 md:py-0">
        {/* Left Side: Dynamic Copywriting & Call to Actions */}
        <div className="md:col-span-7 space-y-6 text-left">
          {/* Badge alert indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted border border-border rounded-full text-xs font-medium text-foreground/90">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Introducing Bazaro Ecosystem v2.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            The organic space for{" "}
            <span className="text-primary italic font-serif font-normal">
              conscious
            </span>{" "}
            commerce.
          </h1>

          <p className="text-base sm:text-lg text-foreground/80 max-w-xl leading-relaxed">
            Discover a refined marketplace tailored around transparent
            exchanges. Whether you are listing hand-crafted batches or securing
            trusted items, Bazaro bridges the path beautifully.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-primary-foreground bg-primary hover:opacity-95 rounded-xl shadow-md shadow-primary/10 transition-all group text-center"
            >
              Explore Marketplace
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-foreground bg-muted border border-border hover:bg-border/40 rounded-xl transition-all text-center"
            >
              Learn Our Philosophy
            </Link>
          </div>

          {/* Quick trust bullet signals */}
          <div className="flex items-center gap-6 pt-4 border-t border-border/60 max-w-md">
            <div className="flex items-center gap-2 text-xs text-foreground/70">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>Verified Accounts Only</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-foreground/70">
              <ShoppingBag className="w-4 h-4 text-primary shrink-0" />
              <span>Zero-Gas Listing Setup</span>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Context Dual Cards (Buyer vs Seller representation) */}
        <div className="md:col-span-5 relative w-full h-[340px] sm:h-[400px] flex items-center justify-center">
          {/* Seller Interactive Preview Block */}
          <div className="absolute top-4 left-4 w-[75%] bg-muted/90 backdrop-blur border border-border p-5 rounded-2xl shadow-xl rotate-[-4deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-300 group z-20">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">
                Seller Hub
              </span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-1">
              Create Your Atelier
            </h3>
            <p className="text-xs text-foreground/70 leading-normal mb-4">
              List digital assets, unique physical items, or subscription
              options directly into global queries with zero friction.
            </p>
            <div className="h-2 w-full bg-border/40 rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-primary rounded-full animate-pulse" />
            </div>
            <div className="flex justify-between items-center mt-3 text-[10px] font-mono text-foreground/60">
              <span>Active Listings: 14</span>
              <span className="font-bold text-foreground">Top 5% Rated</span>
            </div>
          </div>

          {/* Buyer Interactive Preview Block */}
          <div className="absolute bottom-4 right-4 w-[75%] bg-background border border-border p-5 rounded-2xl shadow-2xl rotate-[6deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-300 group z-10">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold tracking-widest text-foreground/50 uppercase bg-muted px-2 py-0.5 rounded">
                Buyer View
              </span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-1">
              Curate Collections
            </h3>
            <p className="text-xs text-foreground/70 leading-normal mb-3">
              Follow trusted sellers, secure automated bids, and track shipping
              pipelines cleanly in your unified dashboard.
            </p>
            <div className="flex gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px]">
                ✨
              </span>
              <span className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center text-[10px]">
                📦
              </span>
              <span className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center text-[10px]">
                💳
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
