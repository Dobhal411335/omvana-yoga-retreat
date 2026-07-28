/*
 * Admin root layout — minimal pass-through.
 *
 * The login page lives directly under /admin/login and needs no sidebar.
 * The dashboard layout lives inside the (dashboard) route group and provides
 * the sidebar + header shell.
 *
 * This layout is intentionally bare so the login page renders without chrome.
 */
export default function AdminRootLayout({ children }) {
  return <>{children}</>;
}
