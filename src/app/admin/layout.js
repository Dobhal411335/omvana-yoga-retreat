export const metadata = {
  title: {
    default: "Omvana Retreat CMS",
    template: "%s | Omvana Retreat CMS",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }) {
  return <>{children}</>;
}
