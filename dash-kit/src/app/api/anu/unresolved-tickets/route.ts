import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    return NextResponse.json([
      { id: 1, name: 'Waiting on Feature Request', count: 4238 },
      { id: 2, name: 'Awaiting Customer Response', count: 1005 },
      { id: 3, name: 'Awaiting Developer Fix', count: 914 },
      { id: 4, name: 'Pending', count: 281 },
    ]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
