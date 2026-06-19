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
} from "lucide-react";
import { useUserClientSession } from "@/lib/core/sessionClient";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const DashboardNavbar = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const profileRef = useRef(null);
  const notifyRef = useRef(null);

  const router = useRouter();

  const { user } = useUserClientSession();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    // Global click listener to close open dropdowns safely
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
    console.log("Logging out from dashboard...");
  };

  // Mock notifications array
  const notifications = [
    {
      id: 1,
      text: "Your monthly sales report is ready to download.",
      time: "5m ago",
      unread: true,
    },
    {
      id: 2,
      text: "New user registration milestone reached!",
      time: "2h ago",
      unread: false,
    },
  ];

  return (
    <header className="bg-background border-b border-border w-full h-16 sticky top-0 z-40 flex items-center px-4 sm:px-6 lg:px-8 justify-between font-sans">
      {/* Left Section: Sidebar Toggle & Search Bar */}
      <div className="flex items-center space-x-4 flex-1 max-w-xl">
        {/* Mobile Sidebar Menu Button */}
        <button
          onClick={onMenuClick}
          type="button"
          className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground md:hidden transition-colors font-sans"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Dashboard Search */}
        <div className="relative w-full hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="search"
            placeholder="Search dashboard, analytics, users..."
            className="w-full pl-9 pr-4 py-1.5 bg-muted/50 border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-sans"
          />
        </div>
      </div>

      {/* Right Section: Action Utilities & User Identity */}
      <div className="flex items-center space-x-4">
        {/* Quick Action Quick Button */}
        <button className="hidden md:inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-primary-foreground bg-primary hover:opacity-90 rounded-md shadow-sm transition-all space-x-1 font-sans">
          <Plus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>

        {/* Help Center Icon */}
        <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors hidden sm:inline-flex font-sans">
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifyRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors relative font-sans"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-1.5 border-b border-border flex justify-between items-center">
                <span className="font-semibold text-sm text-foreground font-heading">
                  Notifications
                </span>
                <button className="text-xs text-primary hover:underline font-sans">
                  Mark all read
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 hover:bg-muted/50 border-b border-border/50 last:border-0 transition-colors cursor-pointer ${n.unread ? "bg-muted/20" : ""}`}
                  >
                    <p className="text-xs text-foreground/90 leading-normal font-body">
                      {n.text}
                    </p>
                    <span className="text-[10px] text-muted-foreground block mt-1 font-sans">
                      {n.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-border hidden sm:block"></div>

        {/* Profile Identity Context Control */}
        {mounted && user && (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all focus:outline-none font-sans"
            >
              <div className="w-8 h-8 rounded-full bg-muted border border-border overflow-hidden shrink-0">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 m-2 text-foreground" />
                )}
              </div>
              <div className="hidden md:flex flex-col text-left text-xs max-w-[100px]">
                <span className="font-medium text-foreground truncate font-sans">
                  {user.name || "Account"}
                </span>
                <span className="text-muted-foreground text-[10px] truncate font-sans">
                  {user.role || "Member"}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 hidden md:block text-muted-foreground" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-background border border-border rounded-lg shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-border md:hidden">
                  <p className="text-sm font-semibold text-foreground truncate font-heading">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate font-body">
                    {user.email}
                  </p>
                </div>

                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted hover:text-primary transition-colors font-sans"
                >
                  <Settings className="w-4 h-4 mr-2.5 text-muted-foreground" />
                  Account Settings
                </Link>
                <Link
                  href="/help"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted hover:text-primary transition-colors font-sans"
                >
                  <HelpCircle className="w-4 h-4 mr-2.5 text-muted-foreground" />
                  Support Forum
                </Link>

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors border-t border-border mt-1 text-left font-sans"
                >
                  <LogOut className="w-4 h-4 mr-2.5" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardNavbar;
