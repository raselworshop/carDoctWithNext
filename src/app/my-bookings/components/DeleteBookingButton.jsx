"use client";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

export default function DeleteBookingButton({ id }) {
  const router = useRouter();
  const handleDelete = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/service/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    console.log(data);
    router.refresh();
  };
  return (
    <>
      <MdDelete
        onClick={() => handleDelete(id)}
        className="h-8 w-8 font-bold"
      />
    </>
  );
}