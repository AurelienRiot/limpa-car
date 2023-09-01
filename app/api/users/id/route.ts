import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        orders: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            orderItems: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const user = await prismadb.user.deleteMany({
      where: {
        id: session.user.id,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const body = await req.json();
    const { name, phone, line1, line2, city, country, postalCode, state } =
      body;

    if (!name) {
      return new NextResponse("Le nom de l'utilisateur est nécessaire", {
        status: 400,
      });
    }

    const user = await prismadb.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        phone,
      },
    });

    if (line1) {
      await prismadb.address.create({
        data: {
          user: {
            connect: {
              id: session.user.id,
            },
          },
          line1,
          line2,
          city,
          country,
          postalCode,
          state,
        },
      });
    }

    // if (user.stripeCustomerId) {
    //   const customer = await stripe.customers.update(user.stripeCustomerId, {
    //     name: isPro ? raisonSocial : name + " " + surname,
    //     tax_exempt: isPro ? "exempt" : "none",
    //     address: {
    //       line1: fullAdress.line1,
    //       line2: fullAdress.line2,
    //       city: fullAdress.city,
    //       state: fullAdress.state,
    //       postal_code: fullAdress.postal_code,
    //       country: fullAdress.country,
    //     },
    //     preferred_locales: [fullAdress.country ? fullAdress.country : "FR"],
    //     metadata: {
    //       tva: tva,
    //     },
    //   });
    // } else {
    //   return new NextResponse("Erreur, essayer de vous reconnecter", {
    //     status: 400,
    //   });
    // }

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
