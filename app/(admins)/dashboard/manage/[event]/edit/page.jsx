"use client";
import EditEvent from "@/components/Forms/EditEvent";
import { useParams } from "next/navigation";
import React from "react";

export default function page() {
  const params = useParams();
  const eventId = params.event;

  return (
    <main className="max-w-screen-xl w-full mx-auto ">
      <div className="mt-36">
        <EditEvent eventId={eventId} />
      </div>
    </main>
  );
}
