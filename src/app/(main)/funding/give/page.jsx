"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, HeartHandshake } from "lucide-react";
import { createCheckoutSessionAction } from "@/lib/actions/funding";

export default function GiveFundPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initPayment = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0 || !donorName) return;

    setLoading(true);
    setError(null);
    try {
      const data = await createCheckoutSessionAction({
        donorName,
        amount: parseFloat(amount)
      });
      
      if (data.url) {
        // Redirect to Stripe Hosted Checkout
        window.location.href = data.url;
      } else {
        setError(data.message || "Failed to initialize payment.");
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || "Network error initializing payment.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-[1400px]">
      <button 
        onClick={() => router.push("/funding")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-foreground mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Funding
      </button>

      <div className="max-w-xl mx-auto bg-secondary/40 backdrop-blur-md border border-border rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shadow-inner">
            <HeartHandshake className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-serif text-foreground tracking-tight">Give Fund</h2>
          <p className="text-sm text-foreground/60 mt-1.5 font-sans">
            Support our organization's efforts. Enter the details below to proceed to secure checkout.
          </p>
        </div>

        <form onSubmit={initPayment} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground/80">Donor Name</label>
            <input
              required
              type="text"
              placeholder="Enter your full name"
              className="w-full h-11 bg-background/50 border border-border rounded-xl px-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground/80">Fund Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/60 font-semibold">$</span>
              <input
                required
                type="number"
                step="0.01"
                min="1"
                placeholder="0.00"
                className="w-full h-11 bg-background/50 border border-border rounded-xl pl-8 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="text-sm font-medium text-danger bg-danger/10 p-3 rounded-lg border border-danger/20">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
