"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Bell, ChevronRight, User, Calendar } from "lucide-react";
import dayjs from "dayjs";

/* ── Breadcrumb generation ────────────────────────── */
const LABELS = {
  admin: "Dashboard",
  hero: "Hero",
  about: "About",
  packages: "Retreat Packages",
  gallery: "Gallery",
  testimonials: "Testimonials",
  "contact-info": "Contact",
  enquiries: "Enquiries",
  settings: "Settings",
  login: "Login",
};

function useBreadcrumbs(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [];

  segments.forEach((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = LABELS[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1);
    crumbs.push({ label, href });
  });

  return crumbs;
}

/* ── Header ───────────────────────────────────────── */
export function AdminHeader() {
  const pathname = usePathname();
  const breadcrumbs = useBreadcrumbs(pathname);
  const today = dayjs().format("ddd, D MMM YYYY");

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-surface px-6 lg:px-8">

      {/* Left — Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 font-ui text-sm">
          {breadcrumbs.map((crumb, i) => (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight className="size-3.5 text-muted/50" aria-hidden="true" />
              )}
              {i === breadcrumbs.length - 1 ? (
                <span className="font-medium text-heading">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-muted transition-colors hover:text-heading"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Right — actions */}
      <div className="flex items-center gap-2">

        {/* Date */}
        <div className="hidden items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 md:flex">
          <Calendar className="size-3.5 text-muted" aria-hidden="true" />
          <span className="font-ui text-xs text-muted">{today}</span>
        </div>

        {/* Search (UI only) */}
        <button
          className="flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-background"
          aria-label="Search"
        >
          <Search className="size-4 text-muted" />
        </button>

        {/* Notifications (UI only) */}
        <button
          className="relative flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-background"
          aria-label="Notifications"
        >
          <Bell className="size-4 text-muted" />
          {/* Badge */}
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary" />
        </button>

        {/* Admin profile */}
        <button className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-background">
          <div className="flex size-7 items-center justify-center rounded-full bg-primary/15">
            <User className="size-3.5 text-primary" />
          </div>
          <span className="hidden font-ui text-sm font-medium text-heading md:block">
            Admin
          </span>
        </button>

      </div>
    </header>
  );
}
