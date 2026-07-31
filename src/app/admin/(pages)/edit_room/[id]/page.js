import EditRoom from "@/components/Admin/pages/EditRoom.jsx";
const EditRoomPage = async ({ params }) => {
  const { id } = await params;
  return <EditRoom roomId={id} />;
};

export default EditRoomPage;
