import {
  Heart,
  Search,
  DollarSign,
  Users,
  Activity,
  ArrowRight,
} from "lucide-react";

export default function FundingSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Community Funding Program
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-heading font-bold text-foreground">
            Powering Lifesaving Blood Donations
          </h2>

          <p className="mt-6 text-base md:text-lg text-gray-400 font-body leading-relaxed">
            Every contribution helps us connect donors, support emergency
            requests, improve healthcare accessibility, and save more lives
            across communities.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-secondary/60 backdrop-blur-xl p-7">
            <DollarSign className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-3xl font-bold text-foreground">$128K+</h3>
            <p className="mt-2 text-sm text-gray-400">
              Funds raised to support blood donation campaigns.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-secondary/60 backdrop-blur-xl p-7">
            <Users className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-3xl font-bold text-foreground">12,500+</h3>
            <p className="mt-2 text-sm text-gray-400">
              Registered donors actively helping communities.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-secondary/60 backdrop-blur-xl p-7">
            <Activity className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-3xl font-bold text-foreground">8,900+</h3>
            <p className="mt-2 text-sm text-gray-400">
              Successful donation requests completed.
            </p>
          </div>
        </div>

        {/* Progress Card */}
        <div className="mt-8 rounded-3xl border border-border bg-secondary/70 backdrop-blur-xl p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-heading font-semibold text-foreground">
                Monthly Funding Goal
              </h3>

              <p className="mt-2 text-gray-400">
                Help us reach this month's target and expand emergency blood
                support services nationwide.
              </p>
            </div>

            <div className="min-w-[250px]">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-gray-400">Raised $38,400</span>

                <span className="text-sm font-medium text-primary">76%</span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[76%] rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:scale-[1.02]">
            <Heart className="h-4 w-4 fill-current" />
            Support the Mission
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition-all hover:bg-muted">
            <Search className="h-4 w-4" />
            Explore Campaigns
          </button>
        </div>

        {/* Trust Line */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Trusted by hospitals, volunteers, donors, and healthcare
            organizations across the country.
          </p>
        </div>
      </div>
    </section>
  );
}
