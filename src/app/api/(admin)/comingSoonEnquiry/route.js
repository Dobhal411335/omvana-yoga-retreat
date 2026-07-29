import connectDB from "@/lib/connectDB";
import ComingSoonEnquiry from "@/models/ComingSoonEnquiry";
import "@/models/ComingSoon";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    if (!data.section) data.section = "frontend";
    const enquiry = await ComingSoonEnquiry.create(data);
    return new Response(JSON.stringify(enquiry), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url, `http://${req.headers.get('host') || 'localhost'}`);
    const section = url.searchParams.get('section');
    const query = {};
    if (section) {
        query.section = section;
    }
    const enquiries = await ComingSoonEnquiry.find(query)
      .populate("packageId")
      .sort({ createdAt: -1 })
      .lean();
    return new Response(JSON.stringify(enquiries), { status: 200 });
  } catch (error) {
 
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deleted = await ComingSoonEnquiry.findByIdAndDelete(id);
    if (deleted) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, error: "Not found" }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { status: 500 });
  }
}
