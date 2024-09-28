import { connect } from "@/lib/connect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const isUser = await User.findOne({email: email});

    if (!isUser) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    const validPassword = await bcrypt.compare(password, isUser.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 201 }
      );
    }

    const payload = {
      id: isUser.id,
      username: isUser.username,
      email: isUser.email,
      rsvpEvents: isUser.rsvpEvents,
      role: isUser.role,
    };

    const response = NextResponse.json(
      {
        message: "User authenticated successfully",
        user: payload,
      },
      { status: 200 }
    );

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    response.cookies.set("user", token);

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}
