import { WelcomeCard } from "@/components/admin/dashboard/WelcomeCard";
import { StatsGrid } from "@/components/admin/dashboard/StatsGrid";
import { QuickActions } from "@/components/admin/dashboard/QuickActions";
import { RecentBookings } from "@/components/admin/dashboard/RecentBookings";
import { RecentEnquiries } from "@/components/admin/dashboard/RecentEnquiries";
import { RecentActivity } from "@/components/admin/dashboard/RecentActivity";
import { WebsiteStatus } from "@/components/admin/dashboard/WebsiteStatus";
import { CmsGrid } from "@/components/admin/dashboard/CmsGrid";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">

      {/* Welcome */}
      <WelcomeCard adminName="Admin" />

      {/* Stats overview */}
      <StatsGrid />

      {/* Quick actions */}
      <QuickActions />

      {/* Recent bookings — full width table */}
      <RecentBookings />

      {/* Two-column: enquiries + activity */}
      <div className="grid gap-8 lg:grid-cols-2">
        <RecentEnquiries />
        <RecentActivity />
      </div>

      {/* Website / service status */}
      <WebsiteStatus />

      {/* CMS module grid — shortcuts to all pages */}
      <CmsGrid />

    </div>
  );
}
