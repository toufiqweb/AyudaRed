// Required for client-side interactivity (useState)
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { getUserClientSession } from "@/lib/core/sessionClient";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const user = getUserClientSession();
  console.log(user);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Centralized navigation array to keep code clean and maintainable
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border w-full sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="shrink-0 flex items-center">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-foreground hover:opacity-90 transition"
            >
              Baz<span className="text-primary">aro</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}

            {/* Call to Action Button */}
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 rounded-lg shadow-sm transition-all duration-200 group"
            >
              Get Started
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Hamburger Menu Icon (Mobile Only) */}
          <div className="md:hidden flex items-center space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/80 hover:text-primary hover:bg-muted focus:outline-none transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle main menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 animate-in fade-in zoom-in-75 duration-150" />
              ) : (
                <Menu className="h-6 w-6 animate-in fade-in zoom-in-75 duration-150" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border animate-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} // Closes menu when a link is clicked
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-all"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Call to Action */}
            <div className="pt-4 border-t border-border mt-2">
              <Link
                href="/sign-up"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-primary-foreground bg-primary hover:opacity-90 rounded-lg shadow-sm text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
