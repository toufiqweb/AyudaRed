import {
  Search,
  CalendarDays,
  LayoutDashboard,
  Activity,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

export default function FeatureGrid() {
  const features = [
    {
      id: 1,
      title: "Smart Donor Match",
      description:
        "Filter verified donors instantly by blood group, geolocation proximity, and availability windows.",
      icon: Search,
    },
    {
      id: 2,
      title: "Urgent Request Management",
      description:
        "Broadcast emergency requests across networks instantly to coordinate swift medical responses.",
      icon: CalendarDays,
    },
    {
      id: 3,
      title: "Centralized Live Telemetry",
      description:
        "Monitor ongoing blood drives, fulfillment statistics, and real-time hospital network requirements.",
      icon: LayoutDashboard,
    },
    {
      id: 4,
      title: "Cold Chain Tracking",
      description:
        "Log dynamic status logs from initial donor check-ins right up to final hospital bank distribution.",
      icon: Activity,
    },
    {
      id: 5,
      title: "Secure Health Verification",
      description:
        "Protect sensitive medical records and user information with fully encrypted compliance layers.",
      icon: ShieldCheck,
    },
    {
      id: 6,
      title: "Sustained Impact Support",
      description:
        "Empower non-profits and clinical centers through transparent operational funding networks.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="section-container bg-background text-foreground">
      <div className="mx-auto max-w-6xl">
        {/* 1. Centered Header Stack Aligned with image_48ad88.png */}
        <div className="section-header">
          <span className="section-badge">
            Platform Capabilities
          </span>
          <h2 className="section-title">
            Advancing the lifecycle of safe blood donation
          </h2>
          <p className="section-subtitle">
            In critical medical scenarios where minutes matter, our system
            bridges communication gaps between voluntary donors and clinical
            coordinators smoothly.
          </p>
        </div>

        {/* 2. Frameless Clean Text Grid (3-Column Layout from image_48ad88.png) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 text-center">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="flex flex-col items-center space-y-4 group"
              >
                {/* Minimalist Micro Icon Marker wrapper */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary border border-border/80 text-muted-custom group-hover:text-primary group-hover:border-primary/40 transition-all duration-200 shadow-xs">
                  <IconComponent className="w-4 h-4 stroke-[1.5]" />
                </div>

                {/* Content Layout Element block */}
                <div className="space-y-2">
                  <h3 className="card-title group-hover:text-primary transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="card-description max-w-xs mx-auto">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
