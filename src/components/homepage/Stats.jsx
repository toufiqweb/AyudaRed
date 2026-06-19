import { Users, FileText, Heart, Wallet } from "lucide-react";

export default function StatsPage() {
  const stats = [
    {
      id: 1,
      label: "Donors",
      value: "24,500+",
      icon: Users,
    },
    {
      id: 2,
      label: "Active Requests",
      value: "3,120+",
      icon: FileText,
    },
    {
      id: 3,
      label: "Successful Donations",
      value: "2,890+",
      icon: Heart,
    },
    {
      id: 4,
      label: "Funds Raised",
      value: "$185K+",
      icon: Wallet,
    },
  ];

  return (
    <section className="dark bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8 w-full transition-colors duration-300">
      <div className="mx-auto max-w-7xl text-center">
        {/* Section Title matching image_499322.png */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-10 text-foreground font-heading">
          Platform Statistics
        </h2>

        {/* 4-Column Grid Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex items-center gap-4 p-5 rounded-2xl bg-secondary border border-border/60 hover:border-border transition-all duration-200 text-left shadow-sm group"
              >
                {/* Icon Wrapper Wrapper */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-gray-400 group-hover:text-primary transition-colors">
                  <IconComponent className="w-5 h-5 stroke-[1.75]" />
                </div>

                {/* Metric Content */}
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-none mb-1 font-heading">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-gray-400 font-body">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
