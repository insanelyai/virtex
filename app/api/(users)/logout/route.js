import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = request.cookies.get("user")?.value;

    if (!token) {
      return false;
    }

    const response = NextResponse.json(
      {
        message: "Logged out successfully",
      },
      { status: 200 }
    );
    
    // Clear the cookie properly
    response.cookies.set("user", "", { expires: new Date(0) });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
