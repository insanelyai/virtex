import { connect } from "@/lib/connect";
import Event from "@/models/Event";
import User from "@/models/User";
import { NextResponse } from "next/server";

connect();
export async function POST(request) {
  try {
    const { id } = await request.json();

   
      const user = id && await User.findById({ _id: id });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      const eventIds = user.rsvpEvents;

      const events = await Event.find({ _id: { $in: eventIds } });

      return NextResponse.json(
        {
          id: id,
          events: events,
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
