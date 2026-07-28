import { Navbar } from "@/components/website/Navbar";
import { Footer } from "@/components/website/Footer";

export default function WebsiteLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
