import { Cormorant_Garamond, Inter, Manrope } from "next/font/google";
import { ToasterProvider } from "@/providers/ToasterProvider";
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
  title: "Omvana Retreat CMS",
  description: "Foundation for the Omvana Retreat website and CMS.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} ${ui.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
