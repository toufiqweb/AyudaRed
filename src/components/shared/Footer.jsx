// Required for client-side interactivity
"use client";
import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Centralized footer links configuration
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Search Donors", href: "/search-donors" },
        { name: "Donation Requests", href: "/donation-requests" },
        { name: "Community Funding", href: "/funding" },
        { name: "Top Donors", href: "/top-donors" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "How to Donate", href: "/" },
        { name: "Eligibility", href: "/" },
        { name: "Help Center", href: "/" },
        { name: "Health Tips", href: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/" },
        { name: "Careers", href: "/" },
        { name: "Blog", href: "/" },
        { name: "Contact", href: "/" },
      ],
    },
  ];

  return (
    <footer className="relative bg-background/95 backdrop-blur-xl border-t border-border/40 w-full transition-colors duration-300 overflow-hidden">
      {/* Top subtle gradient highlight line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative z-10">
        {/* Top Section: Brand & Link Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-6 pb-14 border-b border-border/40">
          {/* Brand Presentation Pitch */}
          <div className="col-span-2 md:col-span-3 space-y-5 pr-0 md:pr-10">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground hover:opacity-90 transition font-heading flex items-center gap-1.5"
            >
              Ayuda<span className="text-primary font-heading">Red</span>
            </Link>
            <p className="text-sm text-foreground/60 max-w-sm leading-relaxed font-body">
              Empowering a life-saving network. We connect generous donors with individuals in urgent need of blood, creating a community of heroes.
            </p>

            {/* Newsletter Mini-Form */}
            <div className="pt-3 max-w-sm">
              <label className="text-[11px] font-bold uppercase tracking-widest text-foreground/50 block mb-2 font-body">
                Stay updated
              </label>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2.5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 text-sm bg-secondary/50 border border-border/60 rounded-xl placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition font-sans"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(174,25,25,0.3)] transition-all duration-300 font-sans shrink-0"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Links Grid Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1 space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/90 font-heading">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/60 hover:text-primary hover:translate-x-1 transition-all duration-300 inline-flex items-center group font-sans"
                    >
                      <span className="font-sans">{link.name}</span>
                      {link.href.startsWith("http") && (
                        <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Legal & Social Media Blocks */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright Metadata */}
          <div className="text-xs text-foreground/50 text-center sm:text-left order-2 sm:order-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p className="font-body">
              © {currentYear} AyudaRed. All rights reserved.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors font-sans"
              >
                Privacy Policy
              </Link>
              <span className="text-border font-sans">•</span>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors font-sans"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Social Profiles Networking Row */}
          <div className="flex items-center space-x-3 order-1 sm:order-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-primary bg-secondary/40 hover:bg-primary/10 rounded-full p-2.5 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_10px_rgba(174,25,25,0.2)]"
              aria-label="Twitter Profile"
            >
              <FaXTwitter className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-primary bg-secondary/40 hover:bg-primary/10 rounded-full p-2.5 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_10px_rgba(174,25,25,0.2)]"
              aria-label="GitHub Repository"
            >
              <FaGithub className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-primary bg-secondary/40 hover:bg-primary/10 rounded-full p-2.5 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_10px_rgba(174,25,25,0.2)]"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-[18px] h-[18px]" />
            </a>
            <a
              href="mailto:support@ayudared.com"
              className="text-foreground/50 hover:text-primary bg-secondary/40 hover:bg-primary/10 rounded-full p-2.5 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_10px_rgba(174,25,25,0.2)]"
              aria-label="Email Support"
            >
              <Mail className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
