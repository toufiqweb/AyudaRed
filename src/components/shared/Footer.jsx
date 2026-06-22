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
        { name: "How to Donate", href: "#" },
        { name: "Eligibility", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Health Tips", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t border-border w-full transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Top Section: Brand & Link Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-4 pb-12 border-b border-border">
          {/* Brand Presentation Pitch */}
          <div className="col-span-2 md:col-span-3 space-y-4">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-foreground hover:opacity-90 transition font-heading"
            >
              Ayuda<span className="text-primary font-heading">Red</span>
            </Link>
            <p className="text-sm text-foreground/70 max-w-sm leading-relaxed font-body">
              Empowering a life-saving network. We connect generous donors with individuals in urgent need of blood, creating a community of heroes.
            </p>

            {/* Newsletter Mini-Form */}
            <div className="pt-2 max-w-sm">
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground/60 block mb-2 font-sans">
                Stay updated
              </label>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-sm bg-muted/60 border border-border rounded-lg placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition font-sans"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-95 transition font-sans"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Links Grid Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/50 font-heading">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 hover:text-primary transition-colors duration-200 inline-flex items-center group font-sans"
                    >
                      <span className="font-sans">{link.name}</span>
                      {link.href.startsWith("http") && (
                        <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Legal & Social Media Blocks */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright Metadata */}
          <div className="text-xs text-foreground/60 text-center sm:text-left order-2 sm:order-1">
            <p className="font-body">
              © {currentYear} AyudaRed. All rights reserved.
            </p>
            <div className="mt-1 space-x-3">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors font-sans"
              >
                Privacy Policy
              </Link>
              <span className="text-border font-sans">•</span>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors font-sans"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Social Profiles Networking Row */}
          <div className="flex items-center space-x-5 order-1 sm:order-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors p-1 font-sans"
              aria-label="Twitter Profile"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors p-1 font-sans"
              aria-label="GitHub Repository"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors p-1 font-sans"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:support@ayudared.com"
              className="text-foreground/60 hover:text-primary transition-colors p-1 font-sans"
              aria-label="Email Support"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
