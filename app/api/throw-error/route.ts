import { NextRequest, NextResponse } from "next/server";

// pages/api/throwError.ts
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  if (!params) {
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
  return NextResponse.json("ok");
}
