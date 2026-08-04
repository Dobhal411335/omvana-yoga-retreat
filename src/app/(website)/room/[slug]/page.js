import connectDB from "@/lib/connectDB";
import Room from "@/models/Admin/Room";
import "@/models/Admin/RoomAmenities";
import "@/models/Admin/RoomPrice";
import RoomDetails from "@/components/website/room/RoomDetails.jsx";

function serializeRoom(room) {
  if (!room) return null;
  return JSON.parse(JSON.stringify(room));
}

async function getRoomBySlug(slug) {
  try {
    await connectDB();
    const room = await Room.findOne({ slug })
      .populate("amenities")
      .populate("prices")
      .lean();
    return serializeRoom(room);
  } catch (error) {
    console.error("Failed to fetch room:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  const keywords = Array.isArray(room?.keywords)
    ? room.keywords.filter(Boolean)
    : [];

  return {
    title: room?.titleLine || room?.title || "Room",
    description: room?.heading || "",
    ...(keywords.length > 0 ? { keywords } : {}),
  };
}

export default async function RoomPage({ params }) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);

  if (!room) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <h1 className="font-heading text-3xl text-heading">Room not found</h1>
        <p className="mt-2 font-body text-sm text-muted">
          This room is unavailable or the link may be incorrect.
        </p>
      </div>
    );
  }

  return <RoomDetails data={room} />;
}
