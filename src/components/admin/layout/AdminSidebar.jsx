"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Info,
  Package,
  Images,
  Star,
  Mail,
  MessageSquare,
  Settings,
  LogOut,
  Mountain,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Icon map ─────────────────────────────────────── */
const ICONS = {
  LayoutDashboard,
  Layers,
  Info,
  Package,
  Images,
  Star,
  Mail,
  MessageSquare,
  Settings,
};

/* ── Navigation data ─────────────────────────────── */
const navGroups = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
    ],
  },
  {
    group: "Website",
    items: [
      { label: "Hero", href: "/admin/hero", icon: "Layers" },
      { label: "About", href: "/admin/about", icon: "Info" },
      { label: "Retreat Packages", href: "/admin/packages", icon: "Package" },
      { label: "Gallery", href: "/admin/gallery", icon: "Images" },
      { label: "Testimonials", href: "/admin/testimonials", icon: "Star" },
      { label: "Contact", href: "/admin/contact-info", icon: "Mail" },
    ],
  },
  {
    group: "Operations",
    items: [
      { label: "Enquiries", href: "/admin/enquiries", icon: "MessageSquare" },
    ],
  },
];

/* ── Single nav item ─────────────────────────────── */
function NavItem({ label, href, iconKey, collapsed, isActive }) {
  const Icon = ICONS[iconKey] ?? LayoutDashboard;

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-150",
        isActive
          ? "bg-primary/15 text-white"
          : "text-white/50 hover:bg-white/5 hover:text-white/80",
        collapsed && "justify-center px-2",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon
        className={cn(
          "shrink-0 transition-colors",
          "size-[18px]",
          isActive ? "text-primary" : "text-white/40 group-hover:text-white/70",
        )}
      />
      {!collapsed && (
        <span className="truncate font-body text-sm leading-none">
          {label}
        </span>
      )}
      {/* Active indicator */}
      {isActive && !collapsed && (
        <span className="ml-auto size-1.5 shrink-0 rounded-full bg-primary" />
      )}
    </Link>
  );
}

/* ── Group label ─────────────────────────────────── */
function GroupLabel({ label, collapsed }) {
  if (collapsed) {
    return <div className="my-2 h-px bg-white/5" />;
  }
  return (
    <p className="mb-1.5 mt-5 px-3 font-ui text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25 first:mt-0">
      {label}
    </p>
  );
}

/* ── Main sidebar ────────────────────────────────── */
export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  function isActive(href) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col bg-footer transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64",
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center border-b border-white/6 px-4 py-5",
          collapsed ? "justify-center" : "gap-3",
        )}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
          <Mountain className="size-4 text-primary" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate font-heading text-sm font-semibold text-white">
              Omvana
            </p>
            <p className="font-ui text-[10px] uppercase tracking-widest text-white/30">
              CMS
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-4" aria-label="Admin navigation">
        {navGroups.map((group) => (
          <div key={group.group}>
            <GroupLabel label={group.group} collapsed={collapsed} />
            {group.items.map((item) => (
              <NavItem
                key={item.href}
                label={item.label}
                href={item.href}
                iconKey={item.icon}
                collapsed={collapsed}
                isActive={isActive(item.href)}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-white/6 px-2.5 py-3">
        <NavItem
          label="Settings"
          href="/admin/settings"
          iconKey="Settings"
          collapsed={collapsed}
          isActive={isActive("/admin/settings")}
        />
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className={cn(
            "group mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-150",
            "text-white/40 hover:bg-white/5 hover:text-red-400 disabled:opacity-50",
            collapsed && "justify-center px-2",
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="size-[18px] shrink-0" />
          {!collapsed && (
            <span className="font-body text-sm">
              {loggingOut ? "Signing out…" : "Logout"}
            </span>
          )}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-[72px] z-10 flex size-6 items-center justify-center rounded-full border border-white/10 bg-footer text-white/40 shadow-md transition-colors hover:text-white/70"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="size-3.5" />
        ) : (
          <ChevronLeft className="size-3.5" />
        )}
      </button>
    </aside>
  );
}
