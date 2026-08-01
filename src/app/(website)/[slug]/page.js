import WebPage from "@/components/website/webpage/WebPage";

export default async function ActivityPage({ params }) {
    const { slug } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/create_webpage/by_slug/${encodeURIComponent(slug)}`);
    const data = await res.json();
    if (!data || data.error) return <div>Page Not found</div>;
    return <WebPage data={data} />;
}
