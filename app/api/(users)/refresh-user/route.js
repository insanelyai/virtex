import { connect } from "@/lib/connect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const id  = await request.json();

    const user = await User.findById({ _id: id }).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    console.log(user);
    return NextResponse.json(
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          rsvpEvents: user.rsvpEvents,
        },
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
