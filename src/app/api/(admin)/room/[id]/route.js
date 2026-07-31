import connectDB from "@/lib/connectDB";
import Room from "@/models/Admin/Room";
import "@/models/Admin/RoomAmenities";
import "@/models/Admin/RoomPrice";

export async function GET(req, { params }) {
  const { id } = await params;
  if (!id) {
    return new Response(JSON.stringify({ error: "Room ID is required" }), {
      status: 400,
    });
  }
  try {
    await connectDB();
    const room = await Room.findById(id)
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

export async function PUT(req, { params }) {
  const { id } = await params;
  if (!id) {
    return new Response(JSON.stringify({ error: "Room ID is required" }), {
      status: 400,
    });
  }
  try {
    await connectDB();
    const body = await req.json();
    const updated = await Room.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return new Response(JSON.stringify({ error: "Room not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  if (!id) {
    return new Response(JSON.stringify({ error: "Room ID is required" }), {
      status: 400,
    });
  }
  try {
    await connectDB();
    const deleted = await Room.findByIdAndDelete(id);
    if (!deleted) {
      return new Response(JSON.stringify({ error: "Room not found" }), {
        status: 404,
      });
    }
    return new Response(
      JSON.stringify({ message: "Room deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
