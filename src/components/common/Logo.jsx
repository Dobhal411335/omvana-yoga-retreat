import Link from "next/link";
import { Mountain } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/constants/site";

export function Logo({ tone = "dark", className, showBadge = true }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-3 transition-opacity hover:opacity-80",
        className
      )}
    >
      {showBadge && (
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full",
            tone === "light" ? "bg-primary/50" : "bg-primary"
          )}
        >
          <Mountain
            className={cn(
              "size-4",
              tone === "light" ? "text-surface" : "text-white"
            )}
            aria-hidden="true"
          />
        </div>
      )}
      <span
        className={cn(
          "font-heading text-xl tracking-tight",
          tone === "light" ? "text-surface" : "text-heading"
        )}
      >
        {site.name}
      </span>
    </Link>
  );
}
