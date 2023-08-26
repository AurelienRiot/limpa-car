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
    const orderId = session?.metadata?.orderId;
    const address = session?.customer_details?.address;

    const addressComponents = [
      address?.line1,
      address?.line2,
      address?.city,
      address?.state,
      address?.postal_code,
      address?.country,
    ];
    const addressString = addressComponents
      .filter((c) => c !== null)
      .join(", ");

    const order = await prismadb.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (order) {
      await prismadb.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          // address: addressString,
          name: session?.customer_details?.name || "",
          phone: session?.customer_details?.phone || "",
        },
      });
    } else {
      const subscription = await stripe.subscriptions.retrieve(
        session?.subscription as string
      );

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        {
          limit: 5,
        }
      );
      lineItems.data.forEach((item) => {
        console.log(
          `Item: ${item.description}, Price: ${item.price?.unit_amount}, Quantity: ${item.quantity}`
        );
      });
    }
  }

  return new NextResponse(null, { status: 200 });
}
