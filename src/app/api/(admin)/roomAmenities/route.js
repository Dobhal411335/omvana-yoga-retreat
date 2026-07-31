import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Room from "@/models/Admin/Room";
import RoomAmenities from "@/models/Admin/RoomAmenities";

function json(success, message, data = null, status = 200) {
  return NextResponse.json({ success, message, data }, { status });
}

export async function GET() {
  try {
    await connectDB();
    const amenities = await RoomAmenities.find({}).sort({ label: 1 }).lean();
    return NextResponse.json(amenities, { status: 200 });
  } catch (error) {
    return json(false, error.message || "Failed to fetch amenities.", null, 500);
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const roomId = body?.roomId;
    const checkedLabels = Array.isArray(body?.checkedLabels)
      ? body.checkedLabels.map((label) => String(label).trim()).filter(Boolean)
      : [];

    if (!roomId) {
      return json(false, "Room id is required.", null, 400);
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return json(false, "Room not found.", null, 404);
    }

    const amenities = await RoomAmenities.find({
      label: { $in: checkedLabels },
    }).select("_id");

    room.amenities = amenities.map((item) => item._id);
    await room.save();

    const populated = await Room.findById(roomId).populate("amenities").lean();
    return json(true, "Amenities saved.", populated, 200);
  } catch (error) {
    return json(false, error.message || "Failed to save amenities.", null, 500);
  }
}
