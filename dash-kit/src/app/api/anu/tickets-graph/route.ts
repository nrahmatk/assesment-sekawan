import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    return NextResponse.json({
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      data: [65, 59, 80, 81, 56, 55, 40],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
