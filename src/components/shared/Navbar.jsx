"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Sun,
  Moon,
  User,
  LayoutDashboard,
  LogOut,
  Settings,
  Droplet,
} from "lucide-react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const { user } = useUserClientSession();

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    console.log("Logging out...");
  };

  // Nav items exactly matching image_47d085.png
  const navLinks = [
    { name: "Donation Requests", href: "/donation-requests" },
    { name: "Search Donors", href: "/search-donor" },
    { name: "Funding", href: "/funding" },
  ];

  return (
    <div className="w-full flex justify-center sticky top-4 sm:top-6 z-50 px-4 pointer-events-none">
      <nav className="pointer-events-auto bg-background/80 backdrop-blur-xl border border-border/40 w-full max-w-7xl rounded-full transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between h-14 sm:h-16 items-center">
            {/* Brand Logo Group */}
            <div className="shrink-0 flex items-center pl-1 sm:pl-2">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition"
              >
                <Droplet className="w-5 h-5 sm:w-6 sm:h-6 text-primary fill-primary shrink-0 transform rotate-180" />
                <span className="font-semibold text-base sm:text-lg tracking-tight font-heading">
                  BloodLink
                </span>
              </Link>
            </div>

            {/* Centered Mid-Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Action Suite Container */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle Toggle Switch */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg text-foreground/70 hover:bg-muted hover:text-foreground transition-colors mr-1"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              )}

              {/* State Split Authentication Rendering Group */}
              {mounted && user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-muted border border-border text-foreground hover:border-primary transition-all focus:outline-none"
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
                      <User className="w-4 h-4" />
                    )}
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-background border border-border/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2 border-b border-border/60 mb-1">
                        <p className="text-xs font-semibold text-foreground truncate font-body">
                          {user.name || "User"}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate font-body">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2 text-xs font-medium text-foreground/80 hover:bg-muted transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2 text-xs font-medium text-foreground/80 hover:bg-muted transition-colors"
                      >
                        <Settings className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center px-4 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors border-t border-border/60 mt-1.5 text-left"
                      >
                        <LogOut className="w-3.5 h-3.5 mr-2" />
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Twin Structural Buttons matching luxury SaaS aesthetic */
                <div className="flex items-center gap-2 pr-1">
                  <Link
                    href="/sign-in"
                    className="px-4 py-1.5 text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-full shadow-md shadow-primary/20 transition-all duration-200"
                  >
                    Join us
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Shell Menu Trigger */}
            <div className="md:hidden flex items-center space-x-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg text-foreground/80 hover:bg-muted transition-colors"
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
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Navigation Blocks */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-4 right-4 bg-background border border-border rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-in slide-in-from-top-4 duration-200 overflow-hidden pointer-events-auto">
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-border/50 mt-3">
                {mounted && user ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 flex items-center space-x-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden">
                        {user.image ? (
                          <Image
                            width={32}
                            height={32}
                            src={user.image}
                            alt="User"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground font-body">
                          {user.name || "User"}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate max-w-[180px] font-body">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-3 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-all"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center px-3 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all text-left"
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 px-3 pt-2">
                    <Link
                      href="/sign-in"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-3 text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl"
                    >
                      Join us
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
