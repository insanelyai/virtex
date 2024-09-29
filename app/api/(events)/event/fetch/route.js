import { connect } from "@/lib/connect";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

connect();
export async function POST(request) {
  try {
    const id = await request.json();
    
    const event = await Event.findById({ _id: id });

    if (!event) {
      return NextResponse.json(
        {
          message: "Event not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "INTERNAL SERVER ERROR",
      },
      { status: 500 }
    );
  }
}
