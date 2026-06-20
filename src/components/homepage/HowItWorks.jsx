import { UserPlus, FileText, Search, ShieldCheck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Register Account",
      description:
        "Join as a donor or recipient by completing your medical profile securely.",
      icon: UserPlus,
    },
    {
      id: 2,
      title: "Post Request",
      description:
        "Create an urgent blood request detailing required group, hospital, and timing.",
      icon: FileText,
    },
    {
      id: 3,
      title: "Smart Matching",
      description:
        "Our platform instantly matches and alerts nearby compatible donors.",
      icon: Search,
    },
    {
      id: 4,
      title: "Save a Life",
      description:
        "Coordinate the donation seamlessly and track fulfillment status in real-time.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="section-container bg-background text-foreground">
      <div className="mx-auto max-w-7xl text-center">
        {/* 1. Header Typography Module */}
        <div className="section-header">
          {/* Decorative Top Accent Block */}
          <div className="flex items-center justify-center gap-1 opacity-50 text-primary mb-1">
            <span className="text-xs">✦</span>
            <span className="text-sm">✦</span>
            <span className="text-xs">✦</span>
          </div>

          <h2 className="section-title">
            How Our Platform Works
          </h2>
          <p className="section-subtitle">
            Connecting life savers with those in critical need through an
            automated, highly efficient step-by-step donation ecosystem.
          </p>
        </div>

        {/* 2. Process Nodes Flow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className="flex flex-col items-center text-center relative group z-10"
              >
                {/* Modern Step Indicator Badge */}
                <div className="mb-3 text-xs font-bold text-muted-custom tracking-widest">
                  STEP {step.id}
                </div>

                {/* Main Visual Circle Node */}
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-secondary border-2 border-dashed border-border group-hover:border-primary group-hover:scale-105 transition-all duration-300 shadow-sm bg-radial from-secondary to-muted/30">
                  {/* Outer Glow Ring Aura on Hover */}
                  <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />

                  {/* Graphic Content Inner Pill */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-foreground/50 group-hover:text-primary group-hover:bg-background transition-colors duration-200 shadow-inner">
                    <IconComponent className="w-6 h-6 stroke-[1.5]" />
                  </div>
                </div>

                {/* 3. Textual Component Meta Layout */}
                <div className="mt-6 space-y-2 max-w-[240px]">
                  <h3 className="card-title group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="card-description">
                    {step.description}
                  </p>
                </div>

                {/* 4. Connected Wave Loop Path */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-14 left-[65%] w-[70%] h-6 pointer-events-none z-0 opacity-40">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 20"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d={
                          index % 2 === 0
                            ? "M0,2 Q50,20 100,2"
                            : "M0,18 Q50,0 100,18"
                        }
                        stroke="var(--border)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="group-hover:stroke-primary transition-colors"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
