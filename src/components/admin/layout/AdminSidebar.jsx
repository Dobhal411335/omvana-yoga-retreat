"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Globe,
  Package,
  Images,
  Star,
  ShieldCheck,
  UserCircle,
  LogOut,
  Mountain,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Building2,
  Navigation,
  Share2,
  FileStack,
  Inbox,
  PackageSearch,
  ImagePlus,
  MessageCirclePlus,
  CheckSquare,
  FilePlus,
  FileSearch,
  Users,
  UserCog,
  MenuIcon,
  Boxes,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────
   Navigation data
   Each "section" has a header + sub-items.
   Sections auto-open when a child is active.
───────────────────────────────────────────────────── */
const sections = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    items: [
      { label: "Company Basic Info", href: "/admin/company_basic_information", icon: Building2 },
      { label: "Manage Navbar", href: "/admin/navbar_section", icon: Navigation },
      { label: "Social Media Post", href: "/admin/insta_fb_post", icon: Share2 },
      { label: "Manage Webpages", href: "/admin/create_webpage", icon: FileStack },
      { label: "Room Enquiry Page", href: "/admin/room_enquiries", icon: Inbox },
      { label: "Package Enquiry", href: "/admin/enquiries/packages", icon: PackageSearch },
    ],
  },
  {
    id: "manage_banners",
    label: "Manage Banners",
    icon: ImageIcon,
    items: [
      { label: "Top Advertisment Banner", href: "/admin/top_advertisment_banner", icon: ImageIcon },
      { label: "Promotional Banner", href: "/admin/promotional_banner", icon: ImageIcon },
      { label: "Manage Banner", href: "/admin/change_banner_image", icon: ImageIcon },
      { label: "Featured Offered Banner", href: "/admin/featured_offered_banner", icon: ImageIcon },
      { label: "Offer Details", href: "/admin/offer_details", icon: ImageIcon },
      { label: "Manage Featured Product", href: "/admin/manage_featured_packages", icon: ImageIcon },
      { label: "Category Advertisment", href: "/admin/category_advertisment", icon: ImageIcon },
      { label: "PopUp Banner", href: "/admin/popup_banner", icon: ImageIcon },
      { label: "Consultancy Banner", href: "/admin/consultancy_banner", icon: ImageIcon },
      { label: "Banner Section 1st", href: "/admin/banner_section_1st", icon: ImageIcon },
      { label: "Banner Section 2nd", href: "/admin/banner_section_2nd", icon: ImageIcon },
      { label: "Banner Section 3rd", href: "/admin/banner_section_3rd", icon: ImageIcon },
    ],
  },
  {
    id: "sub-dashboard",
    label: "Sub-Dashboard",
    icon: LayoutDashboard,
    items: [
      {
        label: "Manage Menu Section",
        href: "/admin/manage_menu",
        icon: MenuIcon,
      },
      {
        label: "Manage Sub Menu Section",
        href: "/admin/manage_sub_menu",
        icon: MenuIcon,
      },
      {
        label: "Manage Packages",
        href: "/admin/manage_packages_category",
        icon: Boxes,
      },
      {
        label: "Manage Rooms",
        href: "/admin/manage_rooms",
        icon: Boxes,
      },
    ],
  },

  {
    id: "Manage Reviews",
    label: "Manage Reviews",
    icon: Package,
    items: [
      { label: "Create Testimonials", href: "/admin/create_testimonials", icon: Package }, 
      { label: "Approve or Reject Reviews", href: "/admin/manage_reviews", icon: Package },
    ],
  },
];

/* ─────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────── */
function sectionContainsActive(section, pathname) {
  return section.items.some((item) => pathname.startsWith(item.href));
}

/* ─────────────────────────────────────────────────────
   Sub-item link
───────────────────────────────────────────────────── */
function SubItem({ label, href, Icon, isActive }) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] transition-all duration-150",
        isActive
          ? "bg-primary/15 text-white"
          : "text-white/45 hover:bg-white/5 hover:text-white/75",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon
        className={cn(
          "size-3.5 shrink-0 transition-colors",
          isActive ? "text-primary" : "text-white/30 group-hover:text-white/60",
        )}
      />
      <span className="truncate leading-none py-px">{label}</span>
      {isActive && (
        <span className="ml-auto size-1.5 shrink-0 rounded-full bg-primary" />
      )}
    </Link>
  );
}

/* ─────────────────────────────────────────────────────
   Section accordion
───────────────────────────────────────────────────── */
function SectionAccordion({ section, pathname, collapsed }) {
  const active = sectionContainsActive(section, pathname);
  const [open, setOpen] = useState(active);

  /* re-open if navigation lands in this section */
  useEffect(() => {
    if (active) setOpen(true);
  }, [active]);

  const SectionIcon = section.icon;

  if (collapsed) {
    return (
      <div className="mb-1">
        <button
          title={section.label}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex w-full items-center justify-center rounded-xl p-3.75 transition-all duration-300",
            active ? "bg-primary/20 text-primary" : "text-white/40 hover:bg-white/5 hover:text-white/70",
          )}
        >
          <SectionIcon className="size-5 shrink-0" />
        </button>
      </div>
    );
  }

  return (
    <div className="mb-1">
      {/* ── Section header (acts like the orange button in reference) ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all duration-150",
          active
            ? "bg-primary/20 text-white"
            : "text-white/60 hover:bg-white/5 hover:text-white",
        )}
      >
        <SectionIcon
          className={cn(
            "size-4.25 shrink-0",
            active ? "text-primary" : "text-white/40",
          )}
        />
        <span className="flex-1 truncate font-ui text-[15px] font-semibold tracking-wide">
          {section.label}
        </span>
        {open
          ? <ChevronUp className="size-3.5 shrink-0 text-white/30" />
          : <ChevronDown className="size-3.5 shrink-0 text-white/30" />}
      </button>

      {/* ── Sub-items ── */}
      {open && (
        <div className="ml-5 mt-1 flex flex-col gap-1 border-l border-white/8 pl-2.5">
          {section.items.map((item) => (
            <SubItem
              key={item.href}
              label={item.label}
              href={item.href}
              Icon={item.icon}
              isActive={pathname.startsWith(item.href)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Main sidebar
───────────────────────────────────────────────────── */
export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

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
        "relative flex h-screen flex-col bg-footer transition-all duration-300 selection:bg-primary/30 selection:text-white",
        collapsed ? "w-16" : "w-75",
      )}
    >
      {/* ── Brand ── */}
      <div
        className={cn(
          "flex items-center border-b border-white/6 px-4 py-4",
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
              Retreat CMS
            </p>
          </div>
        )}
      </div>

      {/* ── Admin profile strip ── */}
      {!collapsed && (
        <div className="flex items-center gap-3 border-b border-white/6 px-4 py-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15">
            <UserCircle className="size-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-ui text-[13px] font-medium text-white/80">
              Welcome, Omvana Admin
            </p>
            <p className="truncate font-ui text-[11px] text-white/80">
              care.@omvana.in
            </p>
          </div>
        </div>
      )}

      {/* ── Accordion navigation ── */}
      <nav
        className="flex-1 overflow-y-auto px-2.5 py-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        aria-label="Admin navigation"
      >
        {/* Dashboard quick-link (always visible) */}
        <Link
          href="/admin"
          title={collapsed ? "Dashboard" : undefined}
          className={cn(
            "mb-3 flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all duration-150",
            pathname === "/admin"
              ? "bg-primary/20 text-white"
              : "text-white/50 hover:bg-white/5 hover:text-white/80",
            collapsed && "justify-center",
          )}
          aria-current={pathname === "/admin" ? "page" : undefined}
        >
          <Globe
            className={cn(
              "size-4.25 shrink-0",
              pathname === "/admin" ? "text-primary" : "text-white/40",
            )}
          />
          {!collapsed && (
            <span className="font-ui text-[13px] font-semibold tracking-wide">
              Dashboard Home
            </span>
          )}
        </Link>

        {/* Accordion sections */}
        {sections.map((section) => (
          <SectionAccordion
            key={section.id}
            section={section}
            pathname={pathname}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* ── Footer: Logout ── */}
      <div className="border-t border-white/6 px-2.5 py-3">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          title={collapsed ? "User Logout" : undefined}
          className={cn(
            "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-150",
            "text-white/40 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50",
            collapsed && "justify-center px-2",
          )}
        >
          <LogOut className="size-[17px] shrink-0" />
          {!collapsed && (
            <span className="font-ui text-[13px] font-semibold tracking-wide">
              {loggingOut ? "Signing out…" : "User Logout"}
            </span>
          )}
        </button>
      </div>

      {/* ── Collapse toggle ── */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-16 z-10 flex size-6 items-center justify-center rounded-full border border-white/10 bg-footer text-white/40 shadow-md transition-colors hover:text-white/70"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed
          ? <ChevronRight className="size-3.5" />
          : <ChevronLeft className="size-3.5" />}
      </button>
    </aside>
  );
}
