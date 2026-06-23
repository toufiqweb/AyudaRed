import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Unauthorized Access | AyudaRed",
  description: "You do not have permission to view this page.",
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500 ease-out">
        {/* Icon Container */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-rose-100 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity dark:bg-rose-900/20" />
          <div className="relative w-24 h-24 bg-white border-2 border-rose-100 rounded-full flex items-center justify-center shadow-sm dark:bg-background dark:border-rose-900/30">
            <ShieldAlert className="w-12 h-12 text-rose-500 dark:text-rose-400" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3 font-heading">
          403 - Access Denied
        </h1>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed max-w-[300px] font-body">
          You do not have permission to access this page. If you believe this is a mistake, please contact support.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 hover:shadow-primary/40 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-secondary text-foreground font-medium rounded-xl hover:bg-secondary/80 transition-all text-sm"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
