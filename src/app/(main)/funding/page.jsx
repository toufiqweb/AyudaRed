import Link from "next/link";
import { Calendar, CreditCard } from "lucide-react";
import { getTokenServer } from "@/lib/core/getTokenServer";
import { protectedServerFetch } from "@/lib/core/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Funding | AyudaRed",
  description: "View funding records and support our life-saving campaigns.",
};

export default async function FundingPage() {
  let funds = [];
  let error = null;

  try {
    const token = await getTokenServer();
    if (token) {
      const response = await protectedServerFetch("/api/funding", token);
      if (response && response.success) {
        funds = response.data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch funds:", err);
    error = err.message || "Failed to fetch funds";
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 py-10 md:py-15 lg:py-15 xl:py-20  space-y-8 max-w-[1400px] text-foreground select-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-serif">
            Organization Funding
          </h1>
          <p className="text-sm text-foreground/60 mt-1 font-sans">
            View all funding records and support our cause.
          </p>
        </div>
        <Link
          href="/funding/give"
          className="inline-flex items-center justify-center rounded-xl text-sm font-semibold transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2"
        >
          <CreditCard className="w-4 h-4" />
          Give Fund
        </Link>
      </div>

      <div className="bg-secondary/40 backdrop-blur-md border border-border rounded-2xl shadow-xs overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {error ? (
          <div className="flex justify-center p-12 text-danger font-medium bg-danger/10 border-b border-danger/20">
            {error}
          </div>
        ) : funds.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center border-t border-border/50 border-dashed m-4 rounded-xl">
            <p className="text-foreground/40 font-medium">
              No funding records found yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted border-b border-border text-foreground/80 font-semibold text-[11px] uppercase tracking-wider font-sans">
                <tr>
                  <th className="px-6 py-4">Donor Name</th>
                  <th className="px-6 py-4">Fund Amount</th>
                  <th className="px-6 py-4">Funding Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-foreground/80 font-medium">
                {funds.map((fund) => (
                  <tr
                    key={fund._id}
                    className="hover:bg-muted/50 transition-colors group"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-xs font-bold text-primary shrink-0 uppercase">
                        {fund.donorName ? fund.donorName.charAt(0) : "?"}
                      </div>
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {fund.donorName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-emerald-600 dark:text-emerald-500 font-bold">
                      ${fund.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-foreground/60">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(fund.fundingDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
