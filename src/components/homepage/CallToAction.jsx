"use client";
import { useState, useEffect, useRef } from "react";
import {
  Heart,
  ArrowRight,
  Activity,
  ShieldCheck,
  Users,
  Droplet,
  Bell,
  Thermometer,
  HeartHandshake,
  TrendingUp,
  Globe,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

// Continuous organic bezier paths representing the radiating Heart-to-Card vessels
const PATH_1 = "M 260,260 C 210,210 140,110 90,80";     // Heart to Supply Metrics (Top Left)
const PATH_2 = "M 260,260 C 310,210 380,110 430,80";     // Heart to Crossmatch Engine (Top Right)
const PATH_3 = "M 260,260 C 320,240 380,250 440,260";    // Heart to Response Curve (Middle Right)
const PATH_4 = "M 260,260 C 320,300 380,350 430,410";    // Heart to Regional Dist. (Bottom Right)
const PATH_5 = "M 260,260 C 200,280 140,340 90,410";     // Heart to DIN Verified (Bottom Left)
const PATH_6 = "M 260,260 C 250,330 270,410 260,485";    // Heart to Couriers Live (Bottom Center)

export default function CallToAction() {
  const [email, setEmail] = useState("");
  const [isStrongPump, setIsStrongPump] = useState(false);
  const [isCirculating, setIsCirculating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle onboarding route
  };

  // Trigger circulation start after connection line drawing finishes (10s total: staggered delay 0.2s - 0.8s + 9.0s draw)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCirculating(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Periodic strong pump trigger loop (every 40 seconds, triggers an 8s strong pump surge, active only after circulation begins)
  useEffect(() => {
    if (!isCirculating) return;

    const interval = setInterval(() => {
      setIsStrongPump(true);
      setTimeout(() => {
        setIsStrongPump(false);
      }, 8000);
    }, 40000);

    return () => clearInterval(interval);
  }, [isCirculating]);

  // Viewport entrance animation variants
  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const leftContentVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const rightPanelVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Card hover settings - locked completely in place with border & shadow enhancements
  const cardHoverSettings = {
    boxShadow: "var(--card-shadow-hover)",
    borderColor: "var(--card-border-hover)",
    backgroundColor: "var(--card-bg-hover)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  };



  const cardShimmerTransition = (pulseDelay, cycleDuration) => ({
    duration: 2.0,
    repeat: Infinity,
    repeatDelay: cycleDuration - 2.0,
    ease: "easeInOut",
    delay: pulseDelay
  });

  const features = [
    {
      id: 1,
      title: "Smart Donor Match",
      description: "Filter verified donors instantly by blood group, geolocation proximity, and availability windows.",
      icon: Users,
    },
    {
      id: 2,
      title: "Urgent Requests",
      description: "Broadcast emergency requests across networks instantly to coordinate swift medical responses.",
      icon: Bell,
    },
    {
      id: 3,
      title: "Live Telemetry",
      description: "Monitor real-time blood stock levels, demand spikes, and fulfillment metrics.",
      icon: Activity,
    },
    {
      id: 4,
      title: "Cold Chain Tracking",
      description: "Log dynamic status logs from initial donor check-ins right up to final hospital bank distribution.",
      icon: Thermometer,
    },
    {
      id: 5,
      title: "Secure Health Logs",
      description: "Protect sensitive medical records and user information with fully encrypted compliance layers.",
      icon: ShieldCheck,
    },
    {
      id: 6,
      title: "Impact Support",
      description: "Empower non-profits and clinical centers through transparent operational funding networks.",
      icon: HeartHandshake,
    },
    {
      id: 7,
      title: "Predictive Analytics",
      description: "Forecast seasonal demand spikes and optimize inventory distribution across clinical hubs.",
      icon: TrendingUp,
    },
    {
      id: 8,
      title: "Global Registry",
      description: "Connect with a verified, nationwide network of active donors, centers, and medical institutions.",
      icon: Globe,
    },
  ];

  return (
    <motion.section 
      className="section-container bg-background text-foreground relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {/* Structural Ambient Background Circles */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* ================= LEFT SIDE: Typographic Copy & Action Entry ================= */}
        <motion.div 
          variants={leftContentVariants}
          className="lg:col-span-6 text-left space-y-6 max-w-2xl"
        >
          <span className="text-primary font-bold text-xs uppercase tracking-widest block">
            Smart Analytics
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] font-heading">
            Smart Analytics <br />
            Blood Donations
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Discover how our automated emergency dispatch matrix connects verified donors, monitors regional inventory dropouts, and brings structural clarity to healthcare routing logistics.
          </p>

          <div className="pt-4">
            <button className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-sm px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] inline-flex items-center gap-2">
              Smart Analytics
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* ================= RIGHT SIDE: Stripe-Style Circulatory Network Panel ================= */}
        <motion.div 
          variants={rightPanelVariants}
          className="lg:col-span-6 flex items-center justify-center mt-8 lg:mt-0 select-none"
        >
          {/* Responsive aspect-square container */}
          <div className="relative w-full max-w-[520px] aspect-square flex items-center justify-center overflow-hidden">
            
            {/* Concentric Background Circles Animating Slow Scale and Opacity */}
            <motion.div 
              className="absolute rounded-full border border-border/25 w-[260px] h-[260px] pointer-events-none transition-colors duration-300"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute rounded-full border border-border/15 w-[420px] h-[420px] pointer-events-none transition-colors duration-300"
              animate={{
                scale: [1, 1.03, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute rounded-full border border-border/10 w-[560px] h-[560px] pointer-events-none transition-colors duration-300"
              animate={{
                scale: [1, 1.015, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 26,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* SVG CIRCULATORY NETWORK (Cards render above these lines due to relative DOM z-index layouts) */}
            <svg
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
              viewBox="0 0 520 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="blood-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* White Guide Lines (Blueprint style, fades out once connection completes) */}
              <motion.path
                d={PATH_1}
                stroke="var(--vessel-blueprint)"
                strokeWidth="1.2"
                fill="none"
                animate={{ opacity: isCirculating ? 0 : 0.3 }}
                transition={{ duration: 1.5 }}
              />
              <motion.path
                d={PATH_2}
                stroke="var(--vessel-blueprint)"
                strokeWidth="1.2"
                fill="none"
                animate={{ opacity: isCirculating ? 0 : 0.3 }}
                transition={{ duration: 1.5 }}
              />
              <motion.path
                d={PATH_3}
                stroke="var(--vessel-blueprint)"
                strokeWidth="1.2"
                fill="none"
                animate={{ opacity: isCirculating ? 0 : 0.3 }}
                transition={{ duration: 1.5 }}
              />
              <motion.path
                d={PATH_4}
                stroke="var(--vessel-blueprint)"
                strokeWidth="1.2"
                fill="none"
                animate={{ opacity: isCirculating ? 0 : 0.3 }}
                transition={{ duration: 1.5 }}
              />
              <motion.path
                d={PATH_5}
                stroke="var(--vessel-blueprint)"
                strokeWidth="1.2"
                fill="none"
                animate={{ opacity: isCirculating ? 0 : 0.3 }}
                transition={{ duration: 1.5 }}
              />
              <motion.path
                d={PATH_6}
                stroke="var(--vessel-blueprint)"
                strokeWidth="1.2"
                fill="none"
                animate={{ opacity: isCirculating ? 0 : 0.3 }}
                transition={{ duration: 1.5 }}
              />

              {/* Base Artery Connection Paths (Dual-stroke for realistic 3D blood vessel depth, draws from center outwards on mount) */}
              {/* Path 1 */}
              <motion.path
                d={PATH_1}
                stroke="#8B0000"
                strokeWidth="5.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.25 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 9.0, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.path
                d={PATH_1}
                stroke="#660000"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.85 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 9.0, ease: "easeInOut", delay: 0.2 }}
              />

              {/* Path 2 */}
              <motion.path
                d={PATH_2}
                stroke="#8B0000"
                strokeWidth="5.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.25 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 9.0, ease: "easeInOut", delay: 0.4 }}
              />
              <motion.path
                d={PATH_2}
                stroke="#660000"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.85 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 9.0, ease: "easeInOut", delay: 0.4 }}
              />

              {/* Path 3 */}
              <motion.path
                d={PATH_3}
                stroke="#8B0000"
                strokeWidth="5.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.25 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 9.0, ease: "easeInOut", delay: 0.6 }}
              />
              <motion.path
                d={PATH_3}
                stroke="#660000"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.85 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 9.0, ease: "easeInOut", delay: 0.6 }}
              />

              {/* Path 4 */}
              <motion.path
                d={PATH_4}
                stroke="#8B0000"
                strokeWidth="5.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.25 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 9.0, ease: "easeInOut", delay: 0.8 }}
              />
              <motion.path
                d={PATH_4}
                stroke="#660000"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.85 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 9.0, ease: "easeInOut", delay: 0.8 }}
              />

              {/* Path 5 */}
              <motion.path
                d={PATH_5}
                stroke="#8B0000"
                strokeWidth="5.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.25 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 9.0, ease: "easeInOut", delay: 0.3 }}
              />
              <motion.path
                d={PATH_5}
                stroke="#660000"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.85 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 9.0, ease: "easeInOut", delay: 0.3 }}
              />

              {/* Path 6 */}
              <motion.path
                d={PATH_6}
                stroke="#8B0000"
                strokeWidth="5.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.25 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 9.0, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.path
                d={PATH_6}
                stroke="#660000"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.85 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 9.0, ease: "easeInOut", delay: 0.5 }}
              />

              {/* ACTIVE PULSE WAVES (Only active after the network is fully connected - premium slower linear speed) */}
              {isCirculating && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.0 }}
                >
                  {/* PATH 1 (Top Left) - Streak 1 */}
                  <motion.path
                    d={PATH_1}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 4.5 : 3.0}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.45 : 0.3}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [240, -10] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 0 }}
                    style={{ strokeDasharray: "60 190" }}
                  />
                  <motion.path
                    d={PATH_1}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 2.8 : 1.6}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.95 : 0.65}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [250, 0] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 0 }}
                    style={{ strokeDasharray: "40 210" }}
                  />
                  {/* PATH 1 (Top Left) - Streak 2 */}
                  <motion.path
                    d={PATH_1}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 4.5 : 3.0}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.45 : 0.3}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [240, -10] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 18.0 }}
                    style={{ strokeDasharray: "60 190" }}
                  />
                  <motion.path
                    d={PATH_1}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 2.8 : 1.6}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.95 : 0.65}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [250, 0] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 18.0 }}
                    style={{ strokeDasharray: "40 210" }}
                  />

                  {/* PATH 2 (Top Right) - Streak 1 */}
                  <motion.path
                    d={PATH_2}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 4.5 : 3.0}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.45 : 0.3}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [240, -10] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 0 }}
                    style={{ strokeDasharray: "60 190" }}
                  />
                  <motion.path
                    d={PATH_2}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 2.8 : 1.6}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.95 : 0.65}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [250, 0] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 0 }}
                    style={{ strokeDasharray: "40 210" }}
                  />
                  {/* PATH 2 (Top Right) - Streak 2 */}
                  <motion.path
                    d={PATH_2}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 4.5 : 3.0}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.45 : 0.3}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [240, -10] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 18.0 }}
                    style={{ strokeDasharray: "60 190" }}
                  />
                  <motion.path
                    d={PATH_2}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 2.8 : 1.6}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.95 : 0.65}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [250, 0] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 18.0 }}
                    style={{ strokeDasharray: "40 210" }}
                  />

                  {/* PATH 3 (Middle Right) - Streak 1 */}
                  <motion.path
                    d={PATH_3}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 4.5 : 3.0}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.45 : 0.3}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [170, -10] }}
                    transition={{ duration: 30.0, repeat: Infinity, ease: "linear", delay: 0 }}
                    style={{ strokeDasharray: "50 130" }}
                  />
                  <motion.path
                    d={PATH_3}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 2.8 : 1.6}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.95 : 0.65}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [180, 0] }}
                    transition={{ duration: 30.0, repeat: Infinity, ease: "linear", delay: 0 }}
                    style={{ strokeDasharray: "30 150" }}
                  />
                  {/* PATH 3 (Middle Right) - Streak 2 */}
                  <motion.path
                    d={PATH_3}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 4.5 : 3.0}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.45 : 0.3}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [170, -10] }}
                    transition={{ duration: 30.0, repeat: Infinity, ease: "linear", delay: 15.0 }}
                    style={{ strokeDasharray: "50 130" }}
                  />
                  <motion.path
                    d={PATH_3}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 2.8 : 1.6}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.95 : 0.65}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [180, 0] }}
                    transition={{ duration: 30.0, repeat: Infinity, ease: "linear", delay: 15.0 }}
                    style={{ strokeDasharray: "30 150" }}
                  />

                  {/* PATH 4 (Bottom Right) - Streak 1 */}
                  <motion.path
                    d={PATH_4}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 4.5 : 3.0}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.45 : 0.3}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [230, -10] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 0 }}
                    style={{ strokeDasharray: "60 180" }}
                  />
                  <motion.path
                    d={PATH_4}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 2.8 : 1.6}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.95 : 0.65}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [240, 0] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 0 }}
                    style={{ strokeDasharray: "40 200" }}
                  />
                  {/* PATH 4 (Bottom Right) - Streak 2 */}
                  <motion.path
                    d={PATH_4}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 4.5 : 3.0}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.45 : 0.3}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [230, -10] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 18.0 }}
                    style={{ strokeDasharray: "60 180" }}
                  />
                  <motion.path
                    d={PATH_4}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 2.8 : 1.6}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.95 : 0.65}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [240, 0] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 18.0 }}
                    style={{ strokeDasharray: "40 200" }}
                  />

                  {/* PATH 5 (Bottom Left) - Streak 1 */}
                  <motion.path
                    d={PATH_5}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 4.5 : 3.0}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.45 : 0.3}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [230, -10] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 0 }}
                    style={{ strokeDasharray: "60 180" }}
                  />
                  <motion.path
                    d={PATH_5}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 2.8 : 1.6}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.95 : 0.65}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [240, 0] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 0 }}
                    style={{ strokeDasharray: "40 200" }}
                  />
                  {/* PATH 5 (Bottom Left) - Streak 2 */}
                  <motion.path
                    d={PATH_5}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 4.5 : 3.0}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.45 : 0.3}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [230, -10] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 18.0 }}
                    style={{ strokeDasharray: "60 180" }}
                  />
                  <motion.path
                    d={PATH_5}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 2.8 : 1.6}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.95 : 0.65}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [240, 0] }}
                    transition={{ duration: 36.0, repeat: Infinity, ease: "linear", delay: 18.0 }}
                    style={{ strokeDasharray: "40 200" }}
                  />

                  {/* PATH 6 (Bottom Center) - Streak 1 */}
                  <motion.path
                    d={PATH_6}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 4.5 : 3.0}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.45 : 0.3}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [225, -10] }}
                    transition={{ duration: 32.0, repeat: Infinity, ease: "linear", delay: 0 }}
                    style={{ strokeDasharray: "60 175" }}
                  />
                  <motion.path
                    d={PATH_6}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 2.8 : 1.6}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.95 : 0.65}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [235, 0] }}
                    transition={{ duration: 32.0, repeat: Infinity, ease: "linear", delay: 0 }}
                    style={{ strokeDasharray: "40 195" }}
                  />
                  {/* PATH 6 (Bottom Center) - Streak 2 */}
                  <motion.path
                    d={PATH_6}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 4.5 : 3.0}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.45 : 0.3}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [225, -10] }}
                    transition={{ duration: 32.0, repeat: Infinity, ease: "linear", delay: 16.0 }}
                    style={{ strokeDasharray: "60 175" }}
                  />
                  <motion.path
                    d={PATH_6}
                    stroke="#FF7385"
                    strokeWidth={isStrongPump ? 2.8 : 1.6}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isStrongPump ? 0.95 : 0.65}
                    filter="url(#blood-glow)"
                    animate={{ strokeDashoffset: [235, 0] }}
                    transition={{ duration: 32.0, repeat: Infinity, ease: "linear", delay: 16.0 }}
                    style={{ strokeDasharray: "40 195" }}
                  />
                </motion.g>
              )}
            </svg>

            {/* CENTER HUB IDENTITY NODE (Fixed center blood bag node, always elevated above SVG lines) */}
            <div className="absolute z-20 flex flex-col items-center justify-center">
              
              {/* Stationary Blood Bag container with subtle soft glow */}
              <div className="h-32 w-24 bg-secondary/80 border-2 border-border/80 rounded-2xl shadow-2xl flex items-center justify-center relative backdrop-blur-md transition-colors duration-300">
                
                {/* Center Radial Glow Pulse (synced with pump, very soft and inside the bag) */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-primary/10 blur-sm pointer-events-none z-0"
                  animate={{
                    opacity: isStrongPump ? [0.1, 0.35, 0.1] : [0.1, 0.2, 0.1]
                  }}
                  transition={{
                    duration: 5.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />

                {/* Realistic SVG Blood Bag representation inside the container */}
                <svg
                  className="h-full w-full p-2 relative z-10"
                  viewBox="0 0 80 110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer Plastic Bag silhouette */}
                  <path 
                    d="M 20,8 C 20,4 24,4 28,4 L 52,4 C 56,4 60,4 60,8 L 66,92 C 66,102 52,102 40,102 C 28,102 14,102 14,92 Z" 
                    fill="rgba(30, 30, 35, 0.4)" 
                    stroke="rgba(255, 255, 255, 0.25)" 
                    strokeWidth="1.5" 
                  />

                  {/* Top hanger slot */}
                  <rect x="35" y="10" width="10" height="4" rx="2" fill="rgba(0, 0, 0, 0.4)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
                  
                  {/* Inner Breathing/Pumping Blood liquid */}
                  <motion.path
                    d="M 16,36 C 28,34 52,34 64,36 L 65,90 C 65,99 52,99 40,99 C 28,99 15,99 15,90 Z"
                    fill="url(#blood-gradient)"
                    animate={{
                      d: isStrongPump
                        ? [
                            "M 16,38 C 28,35 52,35 64,38 L 65,90 C 65,99 52,99 40,99 C 28,99 15,99 15,90 Z",
                            "M 16,33 C 28,36 52,36 64,33 L 65,90 C 65,99 52,99 40,99 C 28,99 15,99 15,90 Z",
                            "M 16,38 C 28,35 52,35 64,38 L 65,90 C 65,99 52,99 40,99 C 28,99 15,99 15,90 Z"
                          ]
                        : [
                            "M 16,36 C 28,34 52,34 64,36 L 65,90 C 65,99 52,99 40,99 C 28,99 15,99 15,90 Z",
                            "M 16,34 C 28,35 52,35 64,34 L 65,90 C 65,99 52,99 40,99 C 28,99 15,99 15,90 Z",
                            "M 16,36 C 28,34 52,34 64,36 L 65,90 C 65,99 52,99 40,99 C 28,99 15,99 15,90 Z"
                          ]
                    }}
                    transition={{
                      duration: 5.6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* White label sticker card */}
                  <rect x="25" y="42" width="30" height="42" rx="1.5" fill="rgba(255, 255, 255, 0.9)" />
                  
                  {/* Blood Group text */}
                  <text x="40" y="55" fill="#8B0000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">O+</text>
                  
                  {/* Barcode lines representation */}
                  <line x1="30" y1="62" x2="30" y2="72" stroke="#111" strokeWidth="1" />
                  <line x1="33" y1="62" x2="33" y2="72" stroke="#111" strokeWidth="0.5" />
                  <line x1="35" y1="62" x2="35" y2="72" stroke="#111" strokeWidth="1.5" />
                  <line x1="38" y1="62" x2="38" y2="72" stroke="#111" strokeWidth="0.5" />
                  <line x1="41" y1="62" x2="41" y2="72" stroke="#111" strokeWidth="1" />
                  <line x1="44" y1="62" x2="44" y2="72" stroke="#111" strokeWidth="0.5" />
                  <line x1="46" y1="62" x2="46" y2="72" stroke="#111" strokeWidth="2.0" />
                  <line x1="50" y1="62" x2="50" y2="72" stroke="#111" strokeWidth="0.7" />

                  {/* Volume text */}
                  <text x="40" y="79" fill="#111" fontSize="4.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">450 ML</text>
                  
                  {/* Subtext */}
                  <text x="40" y="94" fill="rgba(255, 255, 255, 0.8)" fontSize="4" textAnchor="middle" fontFamily="sans-serif">DONATION</text>
                  
                  {/* Bottom tube connections */}
                  <rect x="30" y="102" width="6" height="4" rx="0.5" fill="rgba(255, 255, 255, 0.2)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
                  <rect x="44" y="102" width="6" height="4" rx="0.5" fill="rgba(255, 255, 255, 0.2)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
                  
                  {/* Defs for gradient */}
                  <defs>
                    <linearGradient id="blood-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C1121F" />
                      <stop offset="100%" stopColor="#660000" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="mt-3 px-3 py-1 bg-background border border-border text-[11px] font-bold rounded-lg shadow-md flex items-center gap-1 transition-colors duration-300">
                <span>Active Supply</span>
                <motion.span 
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* FIXED RADIAL FLOATING & HOVER CARDS (Z-index 10 keeps them above connection lines, completely stationary) */}
            
            {/* Card 1: Supply Metrics (Top Left) */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10"
              style={{ left: "17.3%", top: "15.4%" }}
            >
              <motion.div
                whileHover={cardHoverSettings}
                className={`bg-secondary border border-border/80 p-4 rounded-xl shadow-lg w-[170px] space-y-2 transform-gpu cursor-pointer relative overflow-hidden transition-all duration-300 ${
                  isCirculating ? "card-pulsing" : ""
                }`}
                style={{
                  animationDuration: "18.0s",
                  animationDelay: "36.0s",
                }}
              >
                {/* Soft red shimmer overlay */}
                {isCirculating && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
                    style={{
                      background: "radial-gradient(circle at center, rgba(139, 0, 0, 0.12) 0%, transparent 85%)",
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={cardShimmerTransition(36.0, 18.0)}
                  />
                )}
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-custom uppercase tracking-wider relative z-10">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  Supply Metrics
                </div>
                <div className="space-y-1 relative z-10">
                  <div className="flex justify-between text-[11px] gap-2">
                    <span className="text-muted-custom">O+ Res.</span>
                    <span className="font-bold text-emerald-500">Optimal</span>
                  </div>
                  <div className="flex justify-between text-[11px] gap-2">
                    <span className="text-muted-custom">A- Res.</span>
                    <span className="font-bold text-primary animate-pulse">
                      Critical
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 2: Crossmatch Engine (Top Right) */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10"
              style={{ left: "82.7%", top: "15.4%" }}
            >
              <motion.div
                whileHover={cardHoverSettings}
                className={`bg-secondary border border-border/80 p-4 rounded-xl shadow-lg w-[170px] space-y-2 transform-gpu cursor-pointer relative overflow-hidden transition-all duration-300 ${
                  isCirculating ? "card-pulsing" : ""
                }`}
                style={{
                  animationDuration: "18.0s",
                  animationDelay: "36.0s",
                }}
              >
                {/* Soft red shimmer overlay */}
                {isCirculating && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
                    style={{
                      background: "radial-gradient(circle at center, rgba(139, 0, 0, 0.12) 0%, transparent 85%)",
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={cardShimmerTransition(36.0, 18.0)}
                  />
                )}
                <div className="text-xs font-bold text-muted-custom relative z-10">
                  Crossmatch Engine
                </div>
                <div className="flex items-end justify-between gap-1.5 relative z-10">
                  <span className="text-xl font-black text-foreground">99.4%</span>
                  <span className="text-[9px] text-emerald-500 font-bold bg-emerald-500/10 px-1 py-0.5 rounded">
                    Accuracy
                  </span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden relative z-10">
                  <div className="w-[94%] h-full bg-primary rounded-full" />
                </div>
              </motion.div>
            </div>

            {/* Card 3: Response Curve (Middle Right) */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10"
              style={{ left: "84.6%", top: "50%" }}
            >
              <motion.div
                whileHover={cardHoverSettings}
                className={`bg-secondary border border-border/80 p-3.5 rounded-xl shadow-lg w-[150px] space-y-2 transform-gpu cursor-pointer relative overflow-hidden transition-all duration-300 ${
                  isCirculating ? "card-pulsing" : ""
                }`}
                style={{
                  animationDuration: "15.0s",
                  animationDelay: "30.0s",
                }}
              >
                {/* Soft red shimmer overlay */}
                {isCirculating && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
                    style={{
                      background: "radial-gradient(circle at center, rgba(139, 0, 0, 0.12) 0%, transparent 85%)",
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={cardShimmerTransition(30.0, 15.0)}
                  />
                )}
                <div className="text-[11px] font-bold text-muted-custom uppercase relative z-10">
                  Response Curve
                </div>
                <div className="flex items-center gap-1 h-8 items-end justify-center relative z-10">
                  <div className="w-2 h-4 bg-muted rounded-xs" />
                  <div className="w-2 h-6 bg-muted rounded-xs" />
                  <div className="w-2 h-5 bg-muted rounded-xs" />
                  <div className="w-2 h-8 bg-primary rounded-xs" />
                  <div className="w-2 h-7 bg-primary rounded-xs" />
                </div>
              </motion.div>
            </div>

            {/* Card 4: Regional Distribution (Bottom Right) */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10"
              style={{ left: "82.7%", top: "78.8%" }}
            >
              <motion.div
                whileHover={cardHoverSettings}
                className={`bg-secondary border border-border/80 p-4 rounded-xl shadow-lg w-[170px] space-y-2 transform-gpu cursor-pointer relative overflow-hidden transition-all duration-300 ${
                  isCirculating ? "card-pulsing" : ""
                }`}
                style={{
                  animationDuration: "18.0s",
                  animationDelay: "36.0s",
                }}
              >
                {/* Soft red shimmer overlay */}
                {isCirculating && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
                    style={{
                      background: "radial-gradient(circle at center, rgba(139, 0, 0, 0.12) 0%, transparent 85%)",
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={cardShimmerTransition(36.0, 18.0)}
                  />
                )}
                <div className="text-xs font-bold text-muted-custom relative z-10">
                  Regional Dist.
                </div>
                <div className="space-y-1 text-[10px] relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-custom">Sector-A</span>
                    <span className="font-bold text-foreground whitespace-nowrap">
                      14 Units
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-custom">Sector-G</span>
                    <span className="font-bold text-foreground whitespace-nowrap">
                      8 Units
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 5: DIN Verified (Bottom Left) */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10"
              style={{ left: "17.3%", top: "78.8%" }}
            >
              <motion.div
                whileHover={cardHoverSettings}
                className={`bg-secondary border border-border/80 p-3.5 rounded-xl shadow-lg w-[150px] flex items-center gap-3 transform-gpu cursor-pointer relative overflow-hidden transition-all duration-300 ${
                  isCirculating ? "card-pulsing" : ""
                }`}
                style={{
                  animationDuration: "18.0s",
                  animationDelay: "36.0s",
                }}
              >
                {/* Soft red shimmer overlay */}
                {isCirculating && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
                    style={{
                      background: "radial-gradient(circle at center, rgba(139, 0, 0, 0.12) 0%, transparent 85%)",
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={cardShimmerTransition(36.0, 18.0)}
                  />
                )}
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0 relative z-10">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left relative z-10">
                  <p className="text-[11px] font-bold text-foreground leading-none">
                    DIN Verified
                  </p>
                  <p className="text-[9px] text-muted-custom mt-0.5 font-medium whitespace-nowrap">
                    100% Secure
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Card 6: Couriers Live (Bottom Center) */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10"
              style={{ left: "50%", top: "93.3%" }}
            >
              <motion.div
                whileHover={cardHoverSettings}
                className={`bg-secondary border border-border/80 px-4 py-2.5 rounded-full shadow-md w-[135px] flex items-center gap-2 transform-gpu cursor-pointer justify-center relative overflow-hidden transition-all duration-300 ${
                  isCirculating ? "card-pulsing" : ""
                }`}
                style={{
                  animationDuration: "16.0s",
                  animationDelay: "32.0s",
                }}
              >
                {/* Soft red shimmer overlay */}
                {isCirculating && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-full overflow-hidden"
                    style={{
                      background: "radial-gradient(circle at center, rgba(139, 0, 0, 0.12) 0%, transparent 85%)",
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={cardShimmerTransition(32.0, 16.0)}
                  />
                )}
                <Users className="w-3.5 h-3.5 text-primary shrink-0 relative z-10" />
                <span className="text-[10px] font-bold text-muted-custom whitespace-nowrap relative z-10">
                  4,120 Live
                </span>
              </motion.div>
            </div>

            </div>
          </motion.div>
        </div>

        {/* ================= 2. BOTTOM 8-CARD FEATURES GRID ================= */}
        <div className="mx-auto max-w-7xl mt-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-border/40 pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="bg-secondary border border-border/80 dark:border-border/20 rounded-2xl p-6 flex flex-col items-center text-center shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  {/* Icon Container with Light Pink Background */}
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-colors duration-200">
                    <IconComponent className="w-6 h-6 stroke-[1.5]" />
                  </div>

                  {/* Feature Title */}
                  <h3 className="mt-4 text-base font-bold text-foreground font-heading">
                    {feature.title}
                  </h3>

                  {/* Feature Description */}
                  <p className="mt-2 text-muted-foreground text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>
    );
}
