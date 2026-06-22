import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function FundingSuccessPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-[1400px] flex items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full bg-secondary/40 backdrop-blur-md border border-border rounded-2xl p-8 sm:p-10 shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold font-serif text-foreground tracking-tight mb-2">
          Contribution Successful!
        </h2>
        <p className="text-sm text-foreground/70 font-sans mb-8 leading-relaxed">
          Thank you for supporting the platform. Your funding record is being securely verified and saved. It will appear on the funding board shortly.
        </p>

        <Link 
          href="/funding"
          className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back To Funding
        </Link>
      </div>
    </div>
  );
}
