import {
  Package,
  Images,
  Star,
  MessageSquare,
  AlertCircle,
  Globe,
  Upload,
  HardDrive,
} from "lucide-react";
import { StatCard } from "@/components/admin/common/StatCard";

const stats = [
  {
    icon: Package,
    title: "Total Packages",
    value: "3",
    description: "Active retreat offerings",
    trend: { direction: "neutral", value: "No change" },
  },
  {
    icon: Images,
    title: "Gallery Images",
    value: "0",
    description: "Uploaded media assets",
    trend: null,
  },
  {
    icon: Star,
    title: "Testimonials",
    value: "0",
    description: "Published guest reviews",
    trend: null,
  },
  {
    icon: MessageSquare,
    title: "Total Enquiries",
    value: "0",
    description: "All contact requests",
    trend: null,
  },
  {
    icon: AlertCircle,
    title: "Unread Enquiries",
    value: "0",
    description: "Awaiting your response",
    iconBg: "bg-warning/8",
    iconColor: "text-warning",
    trend: null,
  },
  {
    icon: Globe,
    title: "Published Pages",
    value: "5",
    description: "Home, Plan, Gallery, Contact, About",
    trend: { direction: "up", value: "+1" },
  },
  {
    icon: Upload,
    title: "Recent Uploads",
    value: "0",
    description: "In the last 30 days",
    trend: null,
  },
  {
    icon: HardDrive,
    title: "Storage Used",
    value: "0 MB",
    description: "Cloudinary media storage",
    trend: null,
  },
];

export function StatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
