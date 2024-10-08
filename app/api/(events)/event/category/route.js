import { connect } from "@/lib/connect";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

connect()
export async function POST(request) {
  try {
    const category = await request.json()

    console.log(category)

    const event = await Event.find({category: category})

    

    if(!event){
        return NextResponse.json({
          message: "No events found for this category",
          status: 404,
        });
    }

    return NextResponse.json(
      {
        events: event,
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
