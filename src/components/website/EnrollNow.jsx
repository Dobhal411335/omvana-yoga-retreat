"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

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
    <Button
      type="button"
      className="fixed top-1/2 left-0 z-20 h-8 -translate-y-1/2 rounded bg-red-600 font-bold text-white shadow-lg print:hidden hover:bg-red-700"
      onClick={() => router.push("/plan-your-own")}
    >
      Enroll Now
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </Button>
  );
};

export default EnrollNow;
