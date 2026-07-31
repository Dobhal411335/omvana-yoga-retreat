import { Cormorant_Garamond, Inter, Manrope } from "next/font/google";
import { ToasterProvider } from "@/providers/ToasterProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const ui = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
});

export const metadata = {
  metadataBase: new URL("https://omvanayoga.com"),
  title: {
    default:
      "Omvana Yoga Retreat — Find your stillness where the Ganga sings",
    template: "%s | Omvana Yoga Retreat",
  },
  description:
    "Omvana is a quiet sanctuary in the Himalayan foothills of Tapovan, Rishikesh — built for travellers who want to slow down, sit with themselves, and return softer than they came. Experience yoga, meditation, temple walks, and Ganga Aarti in a calm spiritual habitat by the sacred Ganges.",
  keywords:
    "Omvana Yoga Retreat, Yoga retreat in Rishikesh, Meditation retreat Rishikesh, Tapovan yoga, Ganga Aarti, Himalayan foothills, Spiritual retreat India, Yoga and meditation, Rishikesh, Uttarakhand, India",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title:
      "Omvana Yoga Retreat — Find your stillness where the Ganga sings",
    description:
      "A quiet sanctuary in the Himalayan foothills. Yoga, meditation, temple walks, and Ganga Aarti — built for travellers who want to return softer than they came.",
    images: ["/logo.png"],
    url: "https://omvanayoga.com",
    siteName: "Omvana Yoga Retreat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Omvana Yoga Retreat — Find your stillness where the Ganga sings",
    description:
      "Omvana is a quiet sanctuary in the Himalayan foothills of Tapovan, Rishikesh — built for travellers who want to slow down, sit with themselves, and return softer than they came. Experience yoga, meditation, temple walks, and Ganga Aarti in a calm spiritual habitat by the sacred Ganges.",
    images: ["/logo.png"],
  },
  authors: [{ name: "Omvana Yoga Retreat" }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} ${ui.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ToasterProvider />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
