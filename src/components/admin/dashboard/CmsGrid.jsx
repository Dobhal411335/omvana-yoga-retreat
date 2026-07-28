import Link from "next/link";
import { Layers, Info, Package, Images, Star, Mail, MessageSquare, Settings } from "lucide-react";
import { DashboardCard } from "@/components/admin/common/DashboardCard";

const modules = [
  {
    title: "Hero",
    description: "Edit homepage hero headline, sub-heading and call to action.",
    href: "/admin/hero",
    icon: Layers,
  },
  {
    title: "About",
    description: "Update the about section and retreat philosophy.",
    href: "/admin/about",
    icon: Info,
  },
  {
    title: "Packages",
    description: "Manage Day Sojourn, Week of Stillness, and custom retreats.",
    href: "/admin/packages",
    icon: Package,
  },
  {
    title: "Gallery",
    description: "Upload, organise and remove gallery images.",
    href: "/admin/gallery",
    icon: Images,
  },
  {
    title: "Testimonials",
    description: "Add and publish guest reviews and ratings.",
    href: "/admin/testimonials",
    icon: Star,
  },
  {
    title: "Contact",
    description: "Update phone, email, address and map details.",
    href: "/admin/contact-info",
    icon: Mail,
  },
  {
    title: "Enquiries",
    description: "View and respond to visitor messages.",
    href: "/admin/enquiries",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    description: "Configure site title, SEO, social links and more.",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function CmsGrid() {
  return (
    <DashboardCard
      title="CMS Modules"
      description="All content management shortcuts"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((mod) => (
          <Link
            key={mod.href}
            href={mod.href}
            className="group flex flex-col gap-3 rounded-xl border border-border/60 p-5 transition-all hover:border-primary/30 hover:bg-primary/3"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/8 transition-colors group-hover:bg-primary/12">
              <mod.icon className="size-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-ui text-sm font-semibold text-heading group-hover:text-primary">
                {mod.title}
              </p>
              <p className="mt-1 font-body text-xs leading-relaxed text-muted">
                {mod.description}
              </p>
            </div>
            <span className="mt-auto font-ui text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Open →
            </span>
          </Link>
        ))}
      </div>
    </DashboardCard>
  );
}
