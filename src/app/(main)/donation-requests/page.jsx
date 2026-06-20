import { Heart, AlertCircle, LayoutGrid } from "lucide-react";
import { getPendingDonationRequests } from "@/lib/api/requests";
import PendingRequestCard from "@/components/ui/PendingRequestCard";
import RefreshButton from "@/components/ui/RefreshButton";
import UrlPagination from "@/components/ui/UrlPagination";
import DonationRequestsFilters from "@/components/ui/DonationRequestsFilters";

export const dynamic = "force-dynamic";

export default async function DonationRequestsPage({ searchParams }) {
  // searchParams is a promise in Next.js 15+
  const params = await searchParams;
  const currentPage = parseInt(params?.page || "1", 10);
  const itemsPerPage = 9;

  const search = params?.search || "";
  const district = params?.district || "";
  const upazila = params?.upazila || "";
  const bloodGroup = params?.bloodGroup || "";

  let requests = [];
  let totalPages = 1;
  let totalRequests = 0;
  let error = "";

  try {
    const data = await getPendingDonationRequests(currentPage, itemsPerPage, {
      search,
      district,
      upazila,
      bloodGroup,
    });
    if (data.success) {
      requests = data.requests || [];
      totalPages = data.pagination?.totalPages || 1;
      totalRequests = data.pagination?.totalRequests || 0;
    }
  } catch (err) {
    error = err.message || "Something went wrong fetching live feed.";
  }

  return (
    <div className="dark bg-background text-foreground py-10 md:py-15 lg:py-15 xl:py-20 min-h-screen w-full transition-colors duration-300">
      <div className="space-y-8 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen flex flex-col justify-between">
        <div className="space-y-8">
          {/* Modern SaaS Header Utility Bar Structure */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border/60">
            <div className="space-y-1 text-left">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
                Active Donation Requests
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground font-body">
                Urgent requests requiring emergency routing. Step forward to
                review details.
              </p>
            </div>

            {/* Quick Action / Real-time Status Badge Group */}
            <div className="flex items-center gap-3 self-start md:self-center">
              {requests.length > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-muted border border-border text-muted-foreground font-sans">
                  <LayoutGrid className="w-3.5 h-3.5 text-primary" />
                  {totalRequests} Requests Live
                </span>
              )}
              <RefreshButton />
            </div>
          </div>

          {/* Donation Requests Filters Panel */}
          <DonationRequestsFilters
            initialSearch={search}
            initialDistrict={district}
            initialUpazila={upazila}
            initialBloodGroup={bloodGroup}
          />

          {/* Clean SaaS Centered Error Handling Alert */}
          {error && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center gap-2 max-w-xl mx-auto text-left font-sans">
              <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
              <p className="text-sm font-medium text-destructive">{error}</p>
            </div>
          )}

          {/* Main High-Fidelity Cards Display Grid */}
          {!error && requests.length === 0 ? (
            /* Clean Empty Slate Design */
            <div className="flex flex-col items-center justify-center py-28 text-center bg-secondary border border-dashed border-border/80 rounded-2xl max-w-md mx-auto px-6 font-sans">
              <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-4 border border-border/40">
                <Heart className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1 font-heading">
                No Pending Requests Found
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs font-body">
                All platform requests have been matched or successfully
                completed. Check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((request) => (
                <div
                  key={request._id}
                  className="transition-all duration-200 hover:-translate-y-0.5"
                >
                  <PendingRequestCard request={request} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Streamlined Custom Theme Pagination Control wrapper */}
        {requests.length > 0 && totalPages > 1 && (
          <div className="mt-12 pt-6 border-t border-border/40 flex justify-center w-full">
            <UrlPagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        )}
      </div>
    </div>
  );
}
