"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, MapPin, Heart, X, Filter } from "lucide-react";
import { upazilas, districtsList } from "@/lib/geoData";

export default function DonationRequestsFilters({
  initialSearch = "",
  initialDistrict = "",
  initialUpazila = "",
  initialBloodGroup = "",
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for filters
  const [search, setSearch] = useState(initialSearch);
  const [district, setDistrict] = useState(initialDistrict);
  const [upazila, setUpazila] = useState(initialUpazila);
  const [bloodGroup, setBloodGroup] = useState(initialBloodGroup);

  // Keep local state in sync with URL parameters
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setDistrict(searchParams.get("district") || "");
    setUpazila(searchParams.get("upazila") || "");
    setBloodGroup(searchParams.get("bloodGroup") || "");
  }, [searchParams]);

  // Compute available upazilas based on local district state
  const availableUpazilas = district && upazilas[district] ? upazilas[district] : [];

  // Helper to push queries to router
  const applyFilters = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Reset page to 1 whenever any filter changes
    params.set("page", "1");

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyFilters({ search });
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setDistrict(newDistrict);
    setUpazila(""); // Reset upazila when district changes
    applyFilters({ district: newDistrict, upazila: "" });
  };

  const handleUpazilaChange = (e) => {
    const newUpazila = e.target.value;
    setUpazila(newUpazila);
    applyFilters({ upazila: newUpazila });
  };

  const handleBloodGroupChange = (e) => {
    const newBloodGroup = e.target.value;
    setBloodGroup(newBloodGroup);
    applyFilters({ bloodGroup: newBloodGroup });
  };

  const handleReset = () => {
    setSearch("");
    setDistrict("");
    setUpazila("");
    setBloodGroup("");
    router.push(pathname);
  };

  const hasActiveFilters = search || district || upazila || bloodGroup;

  return (
    <div className="bg-secondary/40 border border-border/60 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-border/40 pb-3">
        <Filter className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-bold tracking-wider text-foreground uppercase font-heading">
          Filter Requests
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Text Search */}
        <form onSubmit={handleSearchSubmit} className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-sans block mb-1">
            Search Keyword
          </label>
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Recipient, hospital, etc..."
              className="w-full bg-background/50 border border-border/80 rounded-xl pl-9 pr-4 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all text-foreground"
            />
          </div>
        </form>

        {/* Blood Group */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-sans block mb-1">
            Blood Group
          </label>
          <div className="relative">
            <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <select
              value={bloodGroup}
              onChange={handleBloodGroupChange}
              className="w-full pl-9 pr-8 py-2 bg-background/50 border border-border/80 rounded-xl outline-none text-xs font-semibold text-foreground focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer appearance-none"
            >
              <option value="">All Blood Groups</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground/60 w-0 h-0" />
          </div>
        </div>

        {/* District */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-sans block mb-1">
            District
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={district}
              onChange={handleDistrictChange}
              className="w-full pl-9 pr-8 py-2 bg-background/50 border border-border/80 rounded-xl outline-none text-xs font-semibold text-foreground focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer appearance-none"
            >
              <option value="">All Districts</option>
              {districtsList.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground/60 w-0 h-0" />
          </div>
        </div>

        {/* Upazila */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-sans block mb-1">
            Upazila
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={upazila}
              onChange={handleUpazilaChange}
              disabled={!district}
              className="w-full pl-9 pr-8 py-2 bg-background/50 border border-border/80 rounded-xl outline-none text-xs font-semibold text-foreground focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed appearance-none"
            >
              <option value="">
                {!district ? "Select District First" : "All Upazilas"}
              </option>
              {availableUpazilas.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground/60 w-0 h-0" />
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center justify-end pt-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-secondary hover:bg-secondary/80 text-foreground border border-border rounded-xl transition-all shadow-sm group"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground group-hover:scale-110 transition-transform" />
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
