"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, MapPin, Droplet, User, Loader2 } from "lucide-react";
import { upazilas, districtsList } from "@/lib/geoData";
import { searchDonors } from "@/lib/api/users";

export default function SearchDonorsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [donors, setDonors] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Form State
  const [bloodGroup, setBloodGroup] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [availableUpazilas, setAvailableUpazilas] = useState([]);

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    setSelectedUpazila(""); // reset upazila when district changes

    if (districtName && upazilas[districtName]) {
      setAvailableUpazilas(upazilas[districtName]);
    } else {
      setAvailableUpazilas([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const queryParams = new URLSearchParams();
      if (bloodGroup) queryParams.append("bloodGroup", bloodGroup);
      if (selectedDistrict) queryParams.append("district", selectedDistrict);
      if (selectedUpazila) queryParams.append("upazila", selectedUpazila);

      const result = await searchDonors(queryParams.toString());

      setDonors(result.data || []);
    } catch (err) {
      setError(err.message || "Something went wrong while searching donors.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2">
            <Search className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
            Find Blood Donors
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Search our global network of active donors. Filter by blood group,
            district, and upazila to find matching lifesavers near you.
          </p>
        </div>

        {/* Search Form Card */}
        <div className="bg-secondary/40 border border-border/80 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-sm max-w-4xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-end"
          >
            {/* Blood Group */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                Blood Group
              </label>
              <div className="relative">
                <Droplet className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary fill-primary/20 pointer-events-none" />
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full pl-10 pr-10 py-3.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition appearance-none cursor-pointer font-medium"
                >
                  <option value="">Any Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ),
                  )}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* District */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                District
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none" />
                <select
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="w-full pl-10 pr-10 py-3.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition appearance-none cursor-pointer font-medium"
                >
                  <option value="">Any District</option>
                  {districtsList.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Upazila */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                Upazila
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none" />
                <select
                  value={selectedUpazila}
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  disabled={!selectedDistrict || availableUpazilas.length === 0}
                  className="w-full pl-10 pr-10 py-3.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  <option value="">
                    {!selectedDistrict
                      ? "Choose District First"
                      : "Any Upazila"}
                  </option>
                  {availableUpazilas.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-95 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-primary/20 h-[50px]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Search
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {!hasSearched ? (
            <div className="text-center py-16 opacity-60">
              <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-lg font-medium">
                Use the filters above to find donors
              </p>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse opacity-60">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-40 bg-secondary/50 rounded-2xl border border-border"
                ></div>
              ))}
            </div>
          ) : donors.length === 0 ? (
            <div className="text-center py-16 bg-secondary/20 rounded-3xl border border-border border-dashed">
              <Droplet className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
              <h3 className="text-xl font-bold font-heading mb-2">
                No Donors Found
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                We couldn't find any donors matching your criteria. Try
                adjusting your filters to broaden your search.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-lg font-bold font-heading">
                  Search Results{" "}
                  <span className="text-primary ml-2 bg-primary/10 px-3 py-1 rounded-full text-sm">
                    {donors.length} Found
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donors.map((donor) => (
                  <div
                    key={donor._id}
                    className="bg-background border border-border/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition group overflow-hidden relative"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>

                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-border/60 shrink-0">
                        <Image
                          src={
                            donor.avatar ||
                            donor.image ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                          }
                          alt={donor.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0 pt-1">
                        <h3 className="font-bold text-lg truncate text-foreground leading-tight">
                          {donor.name}
                        </h3>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-md shadow-xs w-max">
                          <Droplet className="w-3.5 h-3.5 fill-primary/80" />
                          <span className="text-xs font-black tracking-wide">
                            {donor.bloodGroup}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-foreground/40" />
                        <span className="leading-snug">
                          {donor.upazila}, {donor.district}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
