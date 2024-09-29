import { connect } from "@/lib/connect";
import Event from "@/models/Event";
import User from "@/models/User";
import { NextResponse } from "next/server";

connect()
export async function POST(request) {
  try {
    const { eventId, userId } = await request.json();

    // Check if the event exists and if the user is already attending
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Check if the user is already registered for the event
    if (event.attendees.includes(userId)) {
      return NextResponse.json(
        { message: "User already registered for the event" },
        { status: 400 }
      );
    }

    // Check if the user exists and if they've already RSVP'd to the event
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.rsvpEvents.includes(eventId)) {
      return NextResponse.json(
        { message: "User has already RSVP'd to this event" },
        { status: 400 }
      );
    }

    // Update event attendees and user RSVP events
    event.attendees.push(userId);
    user.rsvpEvents.push(eventId);

    await event.save();
    await user.save();

    // Send a notification to the event organizer about the new RSVP (if needed)

    return NextResponse.json(
      { message: "User successfully added to the event" },
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
