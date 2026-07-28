import { Plus, MessageSquare, Images } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";

const quickActions = [
  { label: "Create Package", href: "/admin/packages/new", icon: Plus },
  { label: "View Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { label: "Upload Gallery Image", href: "/admin/gallery/upload", icon: Images },
];

export function WelcomeCard({ adminName = "Admin" }) {
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  const today = dayjs().format("dddd, D MMMM YYYY");

  return (
    <div className="rounded-[var(--radius-card)] bg-footer px-8 py-7">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="font-ui text-xs uppercase tracking-[0.2em] text-white/35">
            {today}
          </p>
          <h2 className="mt-2 font-heading text-3xl text-white md:text-4xl">
            {greeting},{" "}
            <span className="italic text-primary/80">{adminName}.</span>
          </h2>
          <p className="mt-2 font-body text-sm text-white/45">
            Here&apos;s what&apos;s happening with Omvana today.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {quickActions.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-xl bg-white/8 px-4 py-2.5 font-body text-sm text-white/70 transition-colors hover:bg-white/12 hover:text-white"
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
