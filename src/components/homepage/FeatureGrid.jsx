"use client";

import React from "react";
import { Droplet, HeartPulse, Building2 } from "lucide-react";

export default function FeatureGrid() {
  const services = [
    {
      id: 1,
      title: "Blood Donation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
      icon: Droplet,
      linkText: "Learn More",
    },
    {
      id: 2,
      title: "Health Check",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
      icon: HeartPulse,
      linkText: "Learn More",
    },
    {
      id: 3,
      title: "Blood Bank",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
      icon: Building2,
      linkText: "Learn More",
    },
  ];

  return (
    <section className="section-container bg-bg-alternate text-foreground py-20 px-4 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        {/* Centered Header Section */}
        <div className="flex flex-col items-center justify-center text-center space-y-3 mb-16 max-w-3xl mx-auto">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block">
            Best Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight font-heading">
            Best Services
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
          </p>
        </div>

        {/* 3-Column Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white dark:bg-secondary border border-border/80 dark:border-border/20 rounded-2xl p-8 flex flex-col items-center text-center shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                {/* Icon Container with Light Pink Background */}
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-all duration-200">
                  <IconComponent className="w-8 h-8 stroke-[1.5]" />
                </div>

                {/* Service Title */}
                <h3 className="mt-6 text-xl font-black text-foreground font-heading">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Learn More Action Link */}
                <a
                  href="#"
                  className="mt-6 text-primary font-bold text-sm tracking-wider uppercase inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                >
                  {service.linkText}
                  <span className="text-lg leading-none">&rarr;</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
