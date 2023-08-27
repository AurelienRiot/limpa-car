import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/strip";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  interface RequestBody {
    itemsWithQuantitiesAndDates: {
      id: string;
      quantity: number;
      dates: Date[];
    }[];
    totalPrice: number;
  }

  try {
    const body = await req.json();
    const { itemsWithQuantitiesAndDates, totalPrice } = body as RequestBody;

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Erreur essayer de vous reconnecter", {
        status: 401,
      });
    }

    if (
      !itemsWithQuantitiesAndDates ||
      itemsWithQuantitiesAndDates.length === 0
    ) {
      return new NextResponse(
        "L'id et la quantité de chaque produit est nécessaire",
        { status: 400 }
      );
    }

    if (!totalPrice) {
      return new NextResponse("Le prix total est nécessaire", { status: 400 });
    }

    if (!session.user.stripeCustomerId) {
      return new NextResponse(
        "L'id du client Stripe est nécessaire, essayez de vous reconnecter",
        {
          status: 400,
        }
      );
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        address: true,
      },
    });

    if (!user) {
      return new NextResponse("L'utilisateur n'existe pas", {
        status: 400,
      });
    }

    const productIds = itemsWithQuantitiesAndDates.map((item) => item.id);
    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const productsWithQuantityAndDates = products.map((product) => {
      return {
        item: product,
        quantity: itemsWithQuantitiesAndDates.find(
          (item) => item.id === product.id
        )?.quantity,
        dates: itemsWithQuantitiesAndDates.find(
          (item) => item.id === product.id
        )?.dates,
      };
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    productsWithQuantityAndDates.forEach((product) => {
      line_items.push({
        quantity: product.quantity,

        price_data: {
          currency: "EUR",

          tax_behavior: "exclusive",
          product_data: {
            tax_code: "txcd_99999999",
            name: product.item.name,
          },
          unit_amount: Math.floor(product.item.priceHT * 100),
        },
      });
    });

    const order = await prismadb.order.create({
      data: {
        isPaid: false,
        totalPrice: Number(totalPrice),
        orderItems: {
          create: productsWithQuantityAndDates.map((item) => ({
            product: {
              connect: {
                id: item.item.id,
              },
            },
            price: Number(item.item.priceHT),
            quantity: Number(item.quantity),
            dates: item.dates,
          })),
        },
        userId: session.user.id,
      },
    });

    const stripeSession = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      automatic_tax: {
        enabled: true,
      },
      customer: session.user.stripeCustomerId,
      customer_update: { name: "auto", address: "auto" },
      billing_address_collection:
        user.address && user.address.length > 0 ? "auto" : "required",
      payment_method_types: ["sepa_debit", "card"],
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard-user?success-order=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart-page?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("[CHECKOUT_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
