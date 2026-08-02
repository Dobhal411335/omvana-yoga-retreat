"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion } from "framer-motion";

import { Logo } from "@/components/common/Logo";
import TopAdvertisementMarquee from "@/components/admin/pages/TopAdvertisementMarquee";
import { useCompanyBasicInfo } from "@/providers/CompanyBasicInfoProvider";

const ResponsiveNavbar = ({ sections = [] }) => {
  const visibleSections = sections
    .filter((section) => section?.active)
    .sort((left, right) => (left.order || 0) - (right.order || 0));

  return (
    <NavigationMenu.Root className="hidden relative z-[99] isolate lg:flex w-full justify-end">
      <NavigationMenu.List className="relative z-[99] flex items-center justify-center gap-1 rounded-md px-1 py-1">
        <NavigationMenu.Item>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-[14px] text-black transition-colors hover:bg-surface text-nowrap hover:underline"
          >
            Home
          </Link>
        </NavigationMenu.Item>

        {visibleSections.map((section) => {
          const hasSubSections = Array.isArray(section.subSections) && section.subSections.some((item) => item?.active);
          const sortedSubSections = (section.subSections || [])
            .filter((item) => item?.active)
            .sort((left, right) => (left.order || 0) - (right.order || 0));

          if (!hasSubSections) {
            return (
              <NavigationMenu.Item key={section._id || section.title}>
                <Link
                  href={section.url || "#"}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-[14px] text-black transition-colors hover:bg-surface text-nowrap hover:underline"
                >
                  {section.title}
                </Link>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item key={section._id || section.title} className="relative flex justify-center">
              <NavigationMenu.Trigger className="flex items-center gap-2 rounded-md px-4 py-2 text-[14px] text-black transition-colors hover:bg-surface text-nowrap data-[state=open]:bg-surface hover:underline">
                {section.title}
              </NavigationMenu.Trigger>
              <NavigationMenu.Content aschild>
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  className="absolute left-1/2 top-full mt-3 -translate-x-1/2 min-w-[240px] w-max rounded-xl border border-border bg-background p-2 shadow-2xl"
                >
                  <div className="grid gap-1">
                    {sortedSubSections.map((subSection, index) => (
                      <motion.div
                        key={subSection._id || subSection.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.05,
                          duration: 0.2,
                        }}
                      >
                        <Link
                          href={subSection.url || "#"}
                          className="block rounded-md px-4 py-3 text-[14px] text-black hover:bg-primary transition-colors hover:text-white"
                        >
                          {subSection.title}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}

        <NavigationMenu.Item className="ml-2">
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-[#2c2f2c] px-6 py-2.5 text-[15px] font-medium text-white transition-colors hover:opacity-90 text-nowrap"
          >
            Reserve a stay
          </Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const company = useCompanyBasicInfo();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch('/api/navbar-sections');
        if (response.ok) {
          const data = await response.json();
          setSections(data);
        }
      } catch (error) {
        console.error("Failed to fetch navbar sections:", error);
      }
    };
    fetchSections();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <TopAdvertisementMarquee />
      <div className="container flex h-20 items-center justify-between md:px-10 px-2">
        <Logo
          name={company?.companyName}
          imageSrc={company?.mainLogo?.url}
        />
        <div className="flex items-center gap-8">
          <ResponsiveNavbar sections={sections} />
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
            <Link
              href="/"
              className="font-body text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            {sections
              .filter((section) => section?.active)
              .sort((left, right) => (left.order || 0) - (right.order || 0))
              .map((section) => (
                <div key={section._id || section.title}>
                  <Link
                    href={section.url || "#"}
                    className="font-body text-sm font-medium text-foreground hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    {section.title}
                  </Link>
                  {Array.isArray(section.subSections) && section.subSections.length > 0 && (
                    <div className="mt-2 flex flex-col gap-2 pl-4">
                      {section.subSections
                        .filter((sub) => sub?.active)
                        .sort((left, right) => (left.order || 0) - (right.order || 0))
                        .map((sub) => (
                          <Link
                            key={sub._id || sub.title}
                            href={sub.url || "#"}
                            className="font-body text-sm text-foreground hover:text-primary block"
                            onClick={() => setOpen(false)}
                          >
                            {sub.title}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            <Link
              href="/contact"
              className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-[#2c2f2c] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
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
