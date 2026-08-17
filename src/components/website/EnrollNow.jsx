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
      className="rounded-md bg-red-600 hover:bg-red-700 text-white px-4 h-13 font-bold shadow-lg sticky bottom-1/2 left-15 transform -translate-x-1/2 z-20 print:hidden"
      onClick={() => router.push("/plan-your-own")}
    >
      Enroll Now
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </Button>
  );
};

export default EnrollNow;