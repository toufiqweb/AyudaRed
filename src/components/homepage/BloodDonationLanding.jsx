"use client";

import React from "react";
import Image from "next/image";
import { Check, Globe, Droplet, HeartPulse, ClipboardCheck } from "lucide-react";

export default function BloodDonationLanding() {
  return (
    <div className="w-full bg-background text-foreground font-sans transition-colors duration-300">
      
      {/* ================= 1. ABOUT US SPLIT SECTION ================= */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typographic Details */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-primary font-bold text-xs uppercase tracking-widest block">
              About Us
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] font-heading">
              Together We Can Make World More Health & Better
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Every drop of blood is a beacon of hope for someone in critical need. By donating blood, you become a lifesaver, supporting patients undergoing surgeries, cancer treatments, and emergency care. Join our community of voluntary donors today and make a real difference.
            </p>
            
            {/* Checklist */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Voluntary Donors</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Safe Transfusions</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Emergency Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Community Camps</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Free Health Screening</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Quick Matching</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="pt-4">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
                Sign Up
              </button>
            </div>
          </div>
          
          {/* Right Column: Donor Image */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-2xl shadow-xl border border-border/50">
              <Image
                src="/donor.jpg"
                alt="Woman smiling while donating blood"
                fill
                priority
                className="object-cover"
                sizes="(max-w-768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. THE OVERLAPPING FEATURES BAR ================= */}
      <section className="relative max-w-7xl mx-auto px-4 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Side: Wide White Card */}
          <div className="lg:col-span-8 bg-secondary border border-border shadow-xl rounded-2xl p-6 md:p-8 flex flex-col justify-center transition-colors duration-300">
            <h3 className="text-xl md:text-2xl font-black text-foreground font-heading">
              Our Lifesaving Services
            </h3>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              We connect blood donors with hospitals, clinics, and individuals in urgent need. Our platforms ensure real-time coordination, rigorous testing protocols, and safe storage conditions for all donations.
            </p>
          </div>

          {/* Right Side: Smaller Crimson Card */}
          <div className="lg:col-span-4 bg-primary text-primary-foreground shadow-xl rounded-2xl p-6 md:p-8 flex flex-col justify-center border border-primary/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 shrink-0">
                <Globe className="w-6 h-6 text-white animate-[pulse_3s_infinite]" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold font-heading">
                  Certified Care
                </h3>
                <p className="mt-1 text-white/80 text-xs md:text-sm leading-relaxed font-sans">
                  Our professional medical team ensures a fully sterile, safe, and comfortable donation process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. THREE FEATURE CARDS ON CRIMSON BG ================= */}
      <section className="bg-primary dark:bg-primary/80 pt-24 md:pt-32 pb-24 px-4 transition-colors duration-300 relative -mt-16 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-4">
            
            {/* Card 1: Blood Banking */}
            <div className="bg-secondary border border-border dark:border-border/20 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-all">
                <Droplet className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h4 className="mt-6 text-xl font-black text-foreground font-heading">
                Blood Banking
              </h4>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed flex-grow">
                Advanced cooling and storage facilities ensure that blood components like plasma and platelets remain fully viable for patients.
              </p>
              <a href="#" className="mt-6 text-primary font-bold text-sm tracking-wider uppercase inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn More
                <span className="text-lg leading-none">&rarr;</span>
              </a>
            </div>

            {/* Card 2: Health Check */}
            <div className="bg-secondary border border-border dark:border-border/20 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-all">
                <HeartPulse className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h4 className="mt-6 text-xl font-black text-foreground font-heading">
                Health Check
              </h4>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed flex-grow">
                Receive a free mini-physical checkup including blood pressure, hemoglobin, and vital sign checks before donating.
              </p>
              <a href="#" className="mt-6 text-primary font-bold text-sm tracking-wider uppercase inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn More
                <span className="text-lg leading-none">&rarr;</span>
              </a>
            </div>

            {/* Card 3: Blood Tests */}
            <div className="bg-secondary border border-border dark:border-border/20 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-all">
                <ClipboardCheck className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h4 className="mt-6 text-xl font-black text-foreground font-heading">
                Blood Tests
              </h4>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed flex-grow">
                Rigorous testing and blood typing protocols ensure all transfusions are fully matched and completely safe for patients.
              </p>
              <a href="#" className="mt-6 text-primary font-bold text-sm tracking-wider uppercase inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn More
                <span className="text-lg leading-none">&rarr;</span>
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
