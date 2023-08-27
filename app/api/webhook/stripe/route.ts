import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/strip";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOKS_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Eror: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const name = session?.customer_details?.name || "";
    const phone = session?.customer_details?.phone || "";
    const orderId = session?.metadata?.orderId || "";
    const address = session?.customer_details?.address;

    const order = await prismadb.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (order) {
      const uptdateOrder = await prismadb.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          name,
          phone,
        },
      });

      await prismadb.user.update({
        where: {
          id: order.userId,
        },
        data: {
          name,
          phone,
        },
      });

      if (address?.line1) {
        await prismadb.address.create({
          data: {
            line1: address?.line1 || "",
            line2: address?.line2 || "",
            city: address?.city || "",
            state: address?.state || "",
            postalCode: address?.postal_code || "",
            country: address?.country || "",
            order: {
              connect: {
                id: orderId,
              },
            },
            user: {
              connect: {
                id: order.userId,
              },
            },
          },
        });
      }

      const orderItems = await prismadb.orderItem.findMany({
        where: {
          orderId: order?.id,
          dates: { isEmpty: false },
        },
        include: {
          product: true,
        },
      });

      const events = orderItems.flatMap((item) =>
        item.dates.flatMap((date) => ({
          dateOfEvent: date,
          userId: uptdateOrder?.userId ?? "",
          name: uptdateOrder?.name ?? "",
          description: item.product.name + " " + item.product.options,
        }))
      );

      await prismadb.event.createMany({
        data: events,
      });
    }
  }

  return new NextResponse(null, { status: 200 });
}
