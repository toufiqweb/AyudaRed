"use client";

import { useRef, useEffect } from "react";
import { Users, FileText, Heart, Wallet } from "lucide-react";
import { motion, useInView, animate } from "framer-motion";

// Helper Counter component using framer-motion direct animate function
function Counter({ value, prefix = "", suffix = "" }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const node = nodeRef.current;
    const controls = animate(0, value, {
      duration: 2.0,
      ease: "easeOut",
      onUpdate(latestValue) {
        const rounded = Math.round(latestValue);
        node.textContent = `${prefix}${rounded.toLocaleString()}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [isInView, value, prefix, suffix]);

  return (
    <span ref={nodeRef}>
      {prefix}0{suffix}
    </span>
  );
}

export default function StatsPage() {
  const stats = [
    {
      id: 1,
      label: "Donors",
      value: 24500,
      prefix: "",
      suffix: "+",
      icon: Users,
    },
    {
      id: 2,
      label: "Active Requests",
      value: 3120,
      prefix: "",
      suffix: "+",
      icon: FileText,
    },
    {
      id: 3,
      label: "Successful Donations",
      value: 2890,
      prefix: "",
      suffix: "+",
      icon: Heart,
    },
    {
      id: 4,
      label: "Funds Raised",
      value: 185,
      prefix: "$",
      suffix: "K+",
      icon: Wallet,
    },
  ];

  // Section variants for viewport entrance and staggering children
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.12,
      },
    },
  };

  // Card variants: slide-up + scale entrance, lift + scale + shadow on hover
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.03,
      boxShadow:
        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Icon variants: rotation and scaling on entrance, pulse on hover
  const iconVariants = {
    hidden: { scale: 0.8, rotate: -10 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      className="section-container bg-bg-alternate text-foreground relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={sectionVariants}
    >
      {/* Subtle Floating Ambient Glow behind statistics */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px] pointer-events-none z-0"
        style={{ x: "-50%", y: "-50%" }}
        animate={{
          x: ["-50%", "-40%", "-60%", "-50%"],
          y: ["-50%", "-60%", "-40%", "-50%"],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <div className="mx-auto max-w-7xl text-center relative z-10">
        <div className="section-header">
          <h2 className="section-title">Platform Statistics</h2>
        </div>

        {/* 4-Column Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={cardVariants}
                whileHover="hover"
                className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-secondary border border-border/60 hover:border-border text-left shadow-sm group cursor-pointer"
              >
                {/* Icon Wrapper */}
                <motion.div
                  variants={iconVariants}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-custom group-hover:text-primary transition-colors duration-200"
                >
                  <IconComponent className="w-5 h-5 stroke-[1.75]" />
                </motion.div>

                {/* Metric Content */}
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-none mb-1 font-heading">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-muted-custom font-body">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
