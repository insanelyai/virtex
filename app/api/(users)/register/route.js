import { connect } from "@/lib/connect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    const isUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (isUser && username === isUser.username) {
      return NextResponse.json(
        {
          message: "username already exists",
        },
        { status: 201 }
      );
    } else if (isUser && email === isUser.email) {
      return NextResponse.json(
        {
          message: "email already exists",
        },
        { status: 201 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: payload,
      },
      { status: 200 }
    );

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    response.cookies.set("user", token)

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "INTERNAL SERVER ERROR" }, { status: 500 });
  }
}
