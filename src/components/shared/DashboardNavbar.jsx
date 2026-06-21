// Required for client-side interactivity
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Menu,
  HelpCircle,
  Plus,
  Sun,
  Moon,
} from "lucide-react";
import { useUserClientSession } from "@/lib/core/sessionClient";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const DashboardNavbar = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const profileRef = useRef(null);
  const notifyRef = useRef(null);

  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user } = useUserClientSession();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  // Mock notifications matching the clean application architecture
  const notifications = [
    {
      id: 1,
      text: "Your monthly logistical data audit is finalized and ready for export.",
      time: "5m ago",
      unread: true,
    },
    {
      id: 2,
      text: "System milestone achieved: 100% active allocation target cleared.",
      time: "2h ago",
      unread: false,
    },
  ];

  return (
    <header className="bg-background border-b border-border/80 w-full h-16 sticky top-0 z-40 flex items-center px-4 sm:px-6 lg:px-8 justify-between font-sans backdrop-blur-md bg-background/95">
      {/* Left Section: Sidebar Toggle & Expanded Search Node */}
      <div className="flex items-center space-x-4 flex-1 max-w-xl">
        {/* Mobile Menu Trigger */}
        <button
          onClick={onMenuClick}
          type="button"
          className="p-2 -ml-2 rounded-xl text-secondary-foreground/60 hover:bg-secondary hover:text-foreground lg:hidden transition-all active:scale-95"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Dashboard Search Matrix */}
        <div className="relative w-full hidden sm:block group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-foreground/40 group-focus-within:text-primary transition-colors">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="search"
            placeholder="Search platform index, analytics, logs..."
            className="w-full pl-9 pr-4 py-1.5 bg-secondary/40 border border-border/60 rounded-xl text-xs font-medium placeholder:text-secondary-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:bg-background transition-all font-sans"
          />
        </div>
      </div>

      {/* Right Section: Core Utility Triggers & Profile Pipeline */}
      <div className="flex items-center space-x-3.5">
        {/* Quick Action Deployment Button */}
        <button className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-all active:scale-[0.98] space-x-1.5 font-sans">
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>New Project</span>
        </button>

        {/* Theme Toggle Switch */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl text-secondary-foreground/60 hover:bg-secondary hover:text-foreground transition-all active:scale-95 font-sans border border-transparent hover:border-border/40"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        )}

        {/* Help / Support Nexus */}
        <button className="p-2 rounded-xl text-secondary-foreground/60 hover:bg-secondary hover:text-foreground transition-all active:scale-95 hidden sm:inline-flex font-sans border border-transparent hover:border-border/40">
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Notification Bell Center */}
        <div className="relative" ref={notifyRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-xl text-secondary-foreground/60 hover:bg-secondary hover:text-foreground transition-all active:scale-95 relative font-sans border border-transparent hover:border-border/40"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background animate-pulse" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2.5 w-80 bg-background border border-border rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-border/60 flex justify-between items-center bg-secondary/20">
                <span className="font-extrabold text-xs tracking-tight text-foreground font-heading uppercase tracking-wider">
                  Notifications
                </span>
                <button className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline font-sans">
                  Clear All
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-border/40">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3.5 hover:bg-secondary/40 transition-colors cursor-pointer relative ${n.unread ? "bg-primary/[0.02]" : ""}`}
                  >
                    {n.unread && (
                      <div className="absolute left-1.5 top-4 w-1 h-1 rounded-full bg-primary" />
                    )}
                    <p className="text-xs font-medium text-foreground/90 leading-relaxed font-body">
                      {n.text}
                    </p>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-secondary-foreground/40 block mt-1.5 font-sans">
                      {n.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Structural Divider Element */}
        <div className="h-4 w-px bg-border/80 hidden sm:block" />

        {/* Profile Identity Workspace */}
        {mounted && user && (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2.5 p-1 rounded-xl text-secondary-foreground/60 hover:bg-secondary hover:text-foreground transition-all focus:outline-none font-sans border border-transparent hover:border-border/40"
            >
              <div className="w-7 h-7 rounded-full bg-secondary border border-border/80 overflow-hidden shrink-0 flex items-center justify-center">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User Identity"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-3.5 h-3.5 text-foreground" />
                )}
              </div>
              <div className="hidden md:flex flex-col text-left text-xs max-w-[110px]">
                <span className="font-bold text-foreground truncate font-sans tracking-tight leading-none mb-0.5">
                  {user.name || "Account Node"}
                </span>
                <span className="text-secondary-foreground/40 text-[9px] font-bold uppercase tracking-wider truncate font-sans leading-none">
                  {user.role || "Operator"}
                </span>
              </div>
              <ChevronDown
                className="w-3.5 h-3.5 hidden md:block text-secondary-foreground/40 transition-transform duration-200"
                style={{ transform: isProfileOpen ? "rotate(180deg)" : "none" }}
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2.5 w-56 bg-background border border-border rounded-2xl shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-border/60 bg-secondary/20 md:hidden">
                  <p className="text-xs font-extrabold text-foreground truncate font-heading tracking-tight">
                    {user.name}
                  </p>
                  <p className="text-[10px] font-medium text-secondary-foreground/50 truncate font-body mt-0.5">
                    {user.email}
                  </p>
                </div>

                <div className="p-1 space-y-0.5">
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center px-3 py-2 text-xs font-semibold text-secondary-foreground/80 hover:bg-secondary hover:text-primary rounded-xl transition-all font-sans"
                  >
                    <Settings className="w-4 h-4 mr-2.5 text-secondary-foreground/40" />
                    Account Settings
                  </Link>
                  <Link
                    href="/help"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center px-3 py-2 text-xs font-semibold text-secondary-foreground/80 hover:bg-secondary hover:text-primary rounded-xl transition-all font-sans"
                  >
                    <HelpCircle className="w-4 h-4 mr-2.5 text-secondary-foreground/40" />
                    Support Nexus
                  </Link>
                </div>

                <div className="p-1 border-t border-border/60 mt-1 bg-secondary/10">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center px-3 py-2 text-xs font-bold uppercase tracking-wider text-destructive hover:bg-destructive/10 rounded-xl transition-all text-left font-sans"
                  >
                    <LogOut className="w-4 h-4 mr-2.5" />
                    Terminate Session
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardNavbar;
