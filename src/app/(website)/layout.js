
import { Navbar } from "@/components/website/Navbar";
import { Footer } from "@/components/website/Footer";
import { GoogleTrackingTag } from "@/components/website/GoogleTrackingTag";
import { CompanyBasicInfoProvider } from "@/providers/CompanyBasicInfoProvider";
import { getCompanyBasicInfo } from "@/services/companyBasicInfo.service";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
export default async function WebsiteLayout({ children }) {

  const companyBasicInfo = await getCompanyBasicInfo();
  return (
    <CompanyBasicInfoProvider value={companyBasicInfo}>
      <GoogleTrackingTag html={companyBasicInfo?.googleTrackingTag} />
      <div className="relativeflex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
 
    </CompanyBasicInfoProvider>
  );
}
