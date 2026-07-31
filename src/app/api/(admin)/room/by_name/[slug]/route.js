import connectDB from "@/lib/connectDB";
import Room from "@/models/Admin/Room";
import "@/models/Admin/RoomAmenities";
import "@/models/Admin/RoomPrice";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slug } = await params;
    const room = await Room.findOne({ slug })
      .populate("amenities")
      .populate("prices")
      .lean();

    if (!room) {
      return new Response(JSON.stringify({ error: "Room not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(room), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
