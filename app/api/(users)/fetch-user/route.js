import { gettoken } from "@/lib/gettoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = await gettoken(request);

    if (!token) {
      return NextResponse.json(
        {
          message: "User not authenticated",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        payload: token,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
