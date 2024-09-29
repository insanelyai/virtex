import { connect } from "@/lib/connect";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

connect();
export async function GET() {
  try {
    const events = await Event.find({});

    if (!events) {
      return NextResponse.json({
        message: "No events found",
        status: 404,
      });
    }

    return NextResponse.json(
      {
        events,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "INTERNAL SERVER ERROR",
      status: 500,
    });
  }
}
