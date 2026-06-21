// Required for client-side interactivity
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  Users,
  Settings,
  X,
  Droplet,
  Shield,
  HeartHandshake,
  Calendar,
  User,
  CreditCard,
} from "lucide-react";
import { useUserClientSession } from "@/lib/core/sessionClient";

const DashboardSidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { user } = useUserClientSession();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // 1. Define base links shared across all authenticated roles
  const sharedLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // 2. Define role-specific navigation menus
  const roleLinks = {
    donor: [
      {
        name: "Create Request",
        href: "/dashboard/create-donation-request",
        icon: PlusCircle,
      },
      {
        name: "My Donation Requests",
        href: "/dashboard/my-donation-requests",
        icon: ClipboardList,
      },
    ],
    volunteer: [
      {
        name: "Donation Requests",
        href: "/dashboard/all-blood-donation-request",
        icon: HeartHandshake,
      },
      {
        name: "Manage Camps",
        href: "/dashboard/volunteer/camps",
        icon: Calendar,
      },
      {
        name: "Donor Directory",
        href: "/dashboard/volunteer/donors",
        icon: Users,
      },
    ],
    admin: [
      {
        name: "Manage Users",
        href: "/dashboard/all-users",
        icon: Users,
      },
      {
        name: "Donation Requests",
        href: "/dashboard/all-blood-donation-request",
        icon: Droplet,
      },
      {
        name: "System Logs",
        href: "/dashboard/admin/logs",
        icon: Shield,
      },
    ],
  };

  // Safely grab the current user's links or default to empty array
  const currentUserRole = user?.role?.toLowerCase() || "donor";
  const currentRoleLinks = roleLinks[currentUserRole] || [];

  // Helper component to render single links cleanly
  const NavLink = ({ item }) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;

    return (
      <Link
        href={item.href}
        onClick={onClose} // Closes mobile drawer automatically on click
        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group relative font-sans ${
          isActive
            ? "bg-primary/10 text-primary font-semibold"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <Icon
          className={`w-4 h-4 mr-3 shrink-0 ${
            isActive
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          }`}
        />
        {item.name}
        {isActive && (
          <span className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary" />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Sidebar Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Main Sidebar Wrapper Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-background border-r border-border flex flex-col h-screen transition-transform duration-300 ease-in-out font-sans lg:translate-x-0 lg:sticky lg:z-30 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header Section */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-border shrink-0">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground flex items-center gap-1.5 font-heading"
          >
            <Droplet className="w-5 h-5 text-primary fill-primary" />
            <span>
              Ayuda<span className="text-primary font-heading">Red</span>
            </span>
          </Link>
          {/* Close drawer icon button (Mobile only) */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-md lg:hidden text-muted-foreground hover:bg-muted hover:text-foreground transition-colors font-sans"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Navigation Links Loop */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
          {/* Main Shared Section */}
          <div className="space-y-1.5">
            <p className="px-3 text-[11px] font-bold tracking-wider text-muted-foreground uppercase font-body">
              Core
            </p>
            {sharedLinks.map((link) => (
              <NavLink key={link.name} item={link} />
            ))}
          </div>

          {/* Role-Specific Workspaces Section */}
          {mounted && user && (
            <div className="space-y-1.5">
              <p className="px-3 text-[11px] font-bold tracking-wider text-primary uppercase flex items-center font-body">
                <span>{currentUserRole} Portal</span>
              </p>
              {currentRoleLinks.map((link) => (
                <NavLink key={link.name} item={link} />
              ))}
            </div>
          )}
        </div>

        {/* Optional Sidebar Footer contextual card */}
        {mounted && user && (
          <div className="p-4 border-t border-border bg-muted/30 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-xs font-semibold text-primary uppercase font-sans">
                {user.role?.slice(0, 2) || "US"}
              </div>
              <div className="truncate text-xs">
                <p className="font-semibold text-foreground truncate font-body">
                  {user.name}
                </p>
                <p className="text-[10px] text-muted-foreground capitalize font-body">
                  {currentUserRole} Account
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default DashboardSidebar;
