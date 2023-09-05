import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    if (!params.eventId) {
      return new NextResponse("L est nécessaire", {
        status: 400,
      });
    }

    const events = await prismadb.event.delete({
      where: {
        id: params.eventId,
      },
    });

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.log("[EVENT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
