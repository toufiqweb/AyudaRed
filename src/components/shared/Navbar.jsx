// Required for client-side interactivity (useState)
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon,
  User,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useUserClientSession } from "@/lib/core/sessionClient";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  // 1. Call the hook at the TOP LEVEL (Strictly obeying the Rules of Hooks)
  const { user } = useUserClientSession();

  useEffect(() => {
    setMounted(true);

    // Close user dropdown if clicking outside of it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    // Add your logout functionality here
    await authClient.signOut();
    console.log("Logging out...");
  };
  console.log(user?.role);

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

            {/* 2. Guard the UI rendering using 'mounted' to prevent hydration shifts */}
            {mounted && user ? (
              /* User Profile Dropdown Container */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-muted border border-border text-foreground hover:text-primary hover:border-primary transition-all focus:outline-none"
                  aria-label="User menu"
                >
                  {user.image ? (
                    <Image
                      width={32}
                      height={32}
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground truncate">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/${user?.role}`}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors border-t border-border mt-1 text-left"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Call to Action Button */
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 rounded-lg shadow-sm transition-all duration-200 group"
              >
                Get Started
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>

          {/* Mobile Right Actions Bar */}
          <div className="md:hidden flex items-center space-x-2">
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
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-all"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth Management Section */}
            <div className="pt-4 border-t border-border mt-2">
              {mounted && user ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden">
                      {user.image ? (
                        <Image
                          width={32}
                          height={32}
                          src={user.image}
                          alt="User"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/${user?.role}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-all"
                  >
                    <LayoutDashboard className="w-5 h-5 mr-3 text-muted-foreground" />
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-all"
                  >
                    <Settings className="w-5 h-5 mr-3 text-muted-foreground" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-destructive hover:bg-destructive/10 transition-all text-left"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Log out
                  </button>
                </div>
              ) : (
                /* Mobile Call to Action */
                <Link
                  href="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-primary-foreground bg-primary hover:opacity-90 rounded-lg shadow-sm text-center"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
