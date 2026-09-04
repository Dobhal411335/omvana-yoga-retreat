"use client";

import React, { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const EnrollNow = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Hide on admin pages and while printing
  const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/package") || pathname?.startsWith("/plan-your-own") || pathname?.startsWith("/contact") || pathname?.startsWith("/rooms");

  if (isAdminPage || !showPopup) return null;

  return (
    <div className="fixed top-1/2 left-0 z-40 -translate-y-1/2 print:hidden">
      <button
        onClick={() => router.push("/plan-your-own")}
        className="flex items-center justify-center rounded-r-2xl bg-foreground px-4 py-3 font-semibold text-white text-sm shadow-lg transition-all cursor-pointer hover:scale-110"
      >
        Enroll Now<ArrowUpRight className="size-4 ml-2" aria-hidden="true" />
      </button>
    </div>
  );
};

export default EnrollNow;
