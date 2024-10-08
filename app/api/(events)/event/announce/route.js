import { connect } from "@/lib/connect";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

connect();
export async function POST(request) {
  try {
    const { eventId, title, description } = await request.json();

    const message = {
      title: title,
      description: description,
      createdAt: new Date(),
    };

    // Update the announcement array directly using updateOne
    const updateResult = await Event.updateOne(
      { _id: eventId },
      { $push: { announcement: message } }
    );

    if (updateResult.nModified === 0) {
      return NextResponse.json({ message: "Event not found or not updated" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Announcement created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}
