"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/common/Logo";
import { websiteNavigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <div className="container flex h-20 items-center justify-between px-10">
        <Logo />
        <div className="flex items-center gap-8">

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {websiteNavigation.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-[var(--radius-button)] bg-heading px-6 font-body text-sm text-white transition-colors hover:bg-heading/80"
            >
              Reserve a stay
            </Link>
          </div>
        </div>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-md text-heading transition-colors hover:bg-surface lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-surface px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            {websiteNavigation.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-sm text-foreground hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 inline-flex h-10 items-center justify-center rounded-[var(--radius-button)] bg-heading px-6 font-body text-sm text-white"
              onClick={() => setOpen(false)}
            >
              Reserve a stay
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
