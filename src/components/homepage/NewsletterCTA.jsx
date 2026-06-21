"use client";

import React, { useState } from "react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Action logic for subscription
    setEmail("");
  };

  return (
    <section 
      className="w-full min-h-[460px] flex items-center justify-center relative overflow-hidden bg-background py-16 px-4 transition-colors duration-300 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/cell-wave.png')" }}
    >
      {/* Dark/Light Overlay for better text legibility on top of the wave */}
      <div className="absolute inset-0 bg-background/20 dark:bg-background/40 z-0 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground font-sans tracking-tight leading-tight">
          Want to help <br className="sm:hidden" /> save a life?
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-muted-custom font-medium max-w-lg mx-auto">
          Register to receive alerts for nearby blood donation events.
        </p>

        {/* Form Input Group */}
        <form 
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full max-w-md mx-auto pt-2"
        >
          {/* Email Input */}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john.doe@yourmail.com"
            className="px-4 py-3 sm:py-3.5 bg-secondary border border-border text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-primary sm:rounded-l-lg rounded-t-lg sm:rounded-tr-none flex-grow text-sm transition-all shadow-sm"
          />
          
          {/* Subscribe Button */}
          <button
            type="submit"
            className="px-6 py-3 sm:py-3.5 bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-sm tracking-wide sm:rounded-r-lg rounded-b-lg sm:rounded-bl-none transition-all active:scale-[0.98] shadow-md"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
}
