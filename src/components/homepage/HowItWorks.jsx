"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { UserPlus, FileText, Search, ShieldCheck } from "lucide-react";

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  // Specific durations and delays to simulate random independent movement
  const floatDurations = [4.5, 5.2, 3.8, 4.8];
  const floatDelays = [0, 0.3, 0.15, 0.45];

  // Container variants to coordinate the entrance animation on scroll
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Card slide-up and fade-in entry using spring physics
  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section className="section-container bg-background text-foreground relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl text-center relative z-10">
        
        {/* 1. Header Typography Module */}
        <div className="section-header">
          {/* Decorative Top Accent Block */}
          <div className="flex items-center justify-center gap-1 opacity-60 text-[#dc2626] mb-1">
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
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 relative max-w-6xl mx-auto"
        >
          {/* Vertical dashed line for mobile screens */}
          <div className="absolute top-28 bottom-28 left-[50%] md:left-[56px] w-[2px] md:hidden pointer-events-none z-0 border-l border-dashed border-border opacity-50" />

          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const floatDuration = floatDurations[index];
            const floatDelay = floatDelays[index];

            // Define dynamic floating variants for independent floating nodes
            const circleFloatVariants = {
              float: {
                y: [-6, 6, -6],
                rotate: [-2, 2, -2],
                transition: {
                  duration: floatDuration,
                  delay: floatDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            };

            const shadowFloatVariants = {
              float: {
                scale: [0.85, 1.15, 0.85],
                opacity: [0.15, 0.35, 0.15],
                transition: {
                  duration: floatDuration,
                  delay: floatDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            };

            return (
              <motion.div
                key={step.id}
                variants={cardVariants}
                className="flex flex-col items-center text-center relative group z-10"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Modern Step Indicator Badge */}
                <div className="mb-4 text-xs font-bold text-muted-custom tracking-widest uppercase">
                  STEP {step.id}
                </div>

                {/* Circular Node with AntiGravity Float Effect */}
                <div className="relative flex h-28 w-28 items-center justify-center mb-3">
                  
                  {/* Glowing Shadow beneath the circle (scales opposite to height for anti-gravity realism) */}
                  <motion.div
                    variants={shadowFloatVariants}
                    animate={hoveredIndex === index ? { scale: 1.25, opacity: 0.55 } : "float"}
                    className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-2 bg-[#dc2626]/20 dark:bg-[#dc2626]/30 rounded-full blur-[5px] pointer-events-none z-0"
                  />

                  {/* Main Visual Circle Node */}
                  <motion.div
                    variants={circleFloatVariants}
                    animate={hoveredIndex === index ? { y: 0, rotate: 0, scale: 1.08 } : "float"}
                    className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-secondary border-2 border-dashed border-border group-hover:border-[#dc2626] transition-colors duration-300 shadow-sm z-10 cursor-pointer"
                  >
                    {/* Inner Hover Glow */}
                    <div className="absolute inset-0 rounded-full bg-[#dc2626]/0 group-hover:bg-[#dc2626]/5 transition-colors duration-300" />

                    {/* Graphic Content Inner Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 dark:bg-muted text-foreground/50 group-hover:text-[#dc2626] group-hover:bg-white dark:group-hover:bg-background transition-colors duration-300 shadow-inner">
                      <IconComponent className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </motion.div>
                </div>

                {/* Textual Metadata Layout */}
                <div className="mt-4 space-y-2 max-w-[240px] relative z-10">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-[#dc2626] transition-colors leading-tight font-heading">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-custom font-normal leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Wave Line to next step (horizontal on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-[96px] left-[58%] w-[84%] h-6 pointer-events-none z-0">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 20"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      {/* Base waving connection line */}
                      <motion.path
                        d="M 0 10 Q 50 15 100 10"
                        stroke="var(--border)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        animate={{
                          d: [
                            "M 0 10 Q 50 15 100 10",
                            "M 0 10 Q 50 5 100 10",
                            "M 0 10 Q 50 15 100 10",
                          ],
                        }}
                        transition={{
                          duration: 4.5,
                          delay: index * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      {/* Highlighted active path on hover */}
                      <motion.path
                        d="M 0 10 Q 50 15 100 10"
                        stroke="#dc2626"
                        strokeWidth="1.75"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
