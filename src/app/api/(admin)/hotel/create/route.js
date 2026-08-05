import connectDB from "@/lib/connectDB";
import Hotel from "@/models/Admin/Hotel";
import Room from "@/models/Admin/Room";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { hotelId, rooms } = body;

    if (!hotelId || !Array.isArray(rooms)) {
      return new Response(
        JSON.stringify({ error: "Missing hotelId or rooms array" }),
        { status: 400 }
      );
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return new Response(
        JSON.stringify({ error: "Hotel not found" }),
        { status: 404 }
      );
    }

    const createdRooms = [];

    // Create each room and attach hotelId
    for (const roomData of rooms) {
      const {
        title,
        code,
        slug,
        titleLine,
        keywords,
        paragraph,
        mainPhoto,
        relatedPhotos,
        singleOccupancyPrice,
        doubleOccupancyPrice,
        amenities
      } = roomData;

      const room = await Room.create({
        title,
        code: code || slug || Math.random().toString(36).substring(7),
        slug: slug || Math.random().toString(36).substring(7),
        titleLine,
        keywords,
        paragraph,
        mainPhoto,
        relatedPhotos,
        singleOccupancyPrice,
        doubleOccupancyPrice,
        amenities,
        hotelId
      });

      createdRooms.push(room._id);
    }

    // Add room references to the hotel
    hotel.rooms.push(...createdRooms);
    await hotel.save();

    return new Response(JSON.stringify({ message: "Rooms created successfully", rooms: createdRooms }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const hotelId = searchParams.get("hotelId");

    if (!hotelId) {
      return new Response(
        JSON.stringify({ error: "Missing hotelId parameter" }),
        { status: 400 }
      );
    }

    const hotel = await Hotel.findById(hotelId).populate("rooms");
    
    if (!hotel) {
      return new Response(
        JSON.stringify({ error: "Hotel not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ hotel }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
