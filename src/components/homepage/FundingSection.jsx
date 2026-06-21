"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FundingSection() {
  const progressPercent = 65.8;
  const currentFunds = 3952;
  const targetFunds = 6000;

  return (
    <section className="section-container bg-background text-foreground py-20 px-4 transition-colors duration-300">
      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Split Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Progress Info */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-primary font-bold text-xs uppercase tracking-widest block">
              Fundraising
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight font-heading">
              Fundraising Progress
            </h2>

            {/* Target values */}
            <div className="text-3xl sm:text-4xl font-extrabold font-sans text-foreground">
              <span className="text-primary">$ </span>
              <span>{currentFunds.toLocaleString()}</span>
              <span className="text-muted-foreground/50 mx-2 text-2xl">/</span>
              <span className="text-muted-foreground text-2xl font-semibold">${targetFunds.toLocaleString()}</span>
            </div>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            </p>

            {/* Progress bar + Action Button Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-4">
              
              {/* Progress Bar Container */}
              <div className="flex-grow space-y-2">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="text-foreground/80">Donation Funded</span>
                  <span className="text-primary">{progressPercent}%</span>
                </div>
                
                {/* Horizontal Progress Bar */}
                <div className="h-4 w-full bg-secondary border border-border/80 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-primary rounded-full relative overflow-hidden"
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${progressPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  >
                    {/* Glossy shine element inside bar */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </motion.div>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 flex items-end">
                <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap">
                  <Heart className="w-4 h-4 fill-current" />
                  Donate Now
                </button>
              </div>

            </div>

            {/* Subtext */}
            <p className="text-xs text-muted-custom font-medium">
              * Learn more details about our transparency guidelines and partner hospital network.
            </p>
          </div>

          {/* Right Column: Visual Thermometer */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[360px]">
            
            {/* Thermometer assembly wrapper */}
            <div className="relative flex flex-col items-center" style={{ height: "340px", width: "200px" }}>
              
              {/* Thermometer Tube / Stem */}
              <div className="w-7 h-60 bg-slate-100 dark:bg-zinc-800/80 border-2 border-slate-200 dark:border-zinc-700/80 rounded-full relative flex flex-col justify-end p-[2.5px] shadow-inner z-10">
                
                {/* Temperature Tic marks */}
                <div className="absolute inset-y-4 right-1 flex flex-col justify-between text-[8px] text-muted-foreground/30 pr-0.5 select-none pointer-events-none">
                  <span>—</span>
                  <span>—</span>
                  <span>—</span>
                  <span>—</span>
                  <span>—</span>
                  <span>—</span>
                </div>

                {/* Tube fill container */}
                <div className="relative w-full h-full rounded-full overflow-hidden flex flex-col justify-end">
                  {/* Rising liquid column */}
                  <motion.div
                    className="w-full bg-primary rounded-t-full"
                    initial={{ height: "0%" }}
                    whileInView={{ height: `${progressPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
                  />
                </div>

                {/* Pointer line & tooltip box */}
                <motion.div 
                  className="absolute left-[26px] flex items-center z-30"
                  style={{ bottom: `calc(${progressPercent}% - 6px)` }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 2.0 }}
                >
                  {/* Connecting horizontal line */}
                  <div className="w-8 h-[2px] bg-primary" />
                  
                  {/* Tooltip Card */}
                  <div className="ml-2 bg-secondary border border-border shadow-lg rounded-xl px-4 py-2.5 text-left relative backdrop-blur-sm transition-colors duration-300">
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block leading-none">
                      Funds Received
                    </span>
                    <span className="text-sm font-extrabold text-foreground mt-1.5 block leading-none">
                      ${currentFunds.toLocaleString()}
                    </span>
                  </div>
                </motion.div>

              </div>

              {/* Thermometer Bulb at bottom */}
              <div className="w-16 h-16 bg-slate-100 dark:bg-zinc-800/80 border-2 border-slate-200 dark:border-zinc-700/80 rounded-full absolute bottom-4 shadow-md flex items-center justify-center z-20">
                <div className="w-12 h-12 bg-primary rounded-full shadow-inner relative">
                  {/* Glossy highlight on bulb */}
                  <div className="absolute top-1 left-2.5 w-3.5 h-3.5 bg-white/20 rounded-full blur-[0.5px]" />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
