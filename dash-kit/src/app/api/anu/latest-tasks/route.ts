import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    return NextResponse.json([
      { id: 1, name: "Finish ticket update", status: "URGENT" },
      { id: 2, name: "Create new ticket example", status: "NEW" },
      { id: 3, name: "Update ticket report", status: "DEFAULT" },
    ]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
