import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import { stripe } from "@/lib/strip";

const secret = process.env.NEXTAUTH_SECRET_STORE;

const corsHeaders = {
  "Access-Control-Allow-Origin": `${process.env.FRONTEND_STORE_URL}`,
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS, PATCH, PUT",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
// GET
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { encoded } = body;

    if (!encoded) {
      return new NextResponse("unauthorized", {
        status: 401,
        headers: corsHeaders,
      });
    }

    const token = await decode({ token: encoded, secret: secret as string });

    if (!token) {
      return new NextResponse("unauthorized", {
        status: 401,
        headers: corsHeaders,
      });
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: token.id as string,
      },
      include: {
        subscriptionOrder: {
          include: {
            subscriptionItem: {
              include: {
                subscription: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
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

    return NextResponse.json(user, { headers: corsHeaders });
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}

//DELETE
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { encoded } = body;

    if (!encoded) {
      return new NextResponse("unauthorized", {
        status: 401,
        headers: corsHeaders,
      });
    }

    const token = await decode({ token: encoded, secret: secret as string });

    if (!token) {
      return new NextResponse("unauthorized", {
        status: 401,
        headers: corsHeaders,
      });
    }

    const user = await prismadb.user.deleteMany({
      where: {
        id: token.id as string,
      },
    });

    return NextResponse.json(user, { headers: corsHeaders });
  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new NextResponse("Internal error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, surname, phone, adresse, tva, raisonSocial, isPro, encoded } =
      body;

    if (!encoded) {
      return new NextResponse("unauthorized", {
        status: 401,
        headers: corsHeaders,
      });
    }

    const token = await decode({ token: encoded, secret: secret as string });

    if (!token) {
      return new NextResponse("unauthorized", {
        status: 401,
        headers: corsHeaders,
      });
    }

    if (!name) {
      return new NextResponse("Le nom de l'utilisateur est nécessaire", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const user = await prismadb.user.update({
      where: {
        id: token.id as string,
      },
      data: {
        name,
        surname,
        phone,
        adresse,
        tva,
        raisonSocial,
        isPro,
      },
    });
    const fullAdress = JSON.parse(adresse);

    if (user.stripeCustomerId) {
      const customer = await stripe.customers.update(user.stripeCustomerId, {
        name: isPro ? raisonSocial : name + " " + surname,
        tax_exempt: isPro ? "exempt" : "none",
        address: {
          line1: fullAdress.line1,
          line2: fullAdress.line2,
          city: fullAdress.city,
          state: fullAdress.state,
          postal_code: fullAdress.postal_code,
          country: fullAdress.country,
        },
        preferred_locales: [fullAdress.country ? fullAdress.country : "FR"],
        metadata: {
          tva: tva,
        },
      });
    } else {
      return new NextResponse("Erreur, essayer de vous reconnecter", {
        status: 400,
        headers: corsHeaders,
      });
    }

    return NextResponse.json(user, { headers: corsHeaders });
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}
