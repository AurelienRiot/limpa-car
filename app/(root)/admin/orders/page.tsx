import prismadb from "@/lib/prismadb";
import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const OrdersPage = async () => {
  const orders = await prismadb.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      address: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    name: order.name,
    phone: order.phone,
    address:
      order.address[0] !== undefined
        ? [
            order.address[0].line1,
            order.address[0].line2,
            order.address[0].city,
            order.address[0].state,
            order.address[0].postalCode,
            order.address[0].country,
          ].join(", ")
        : "",
    products: order.orderItems
      .map((item) => {
        let name = item.product.name;
        if (Number(item.quantity) > 1) {
          name += ` x${item.quantity}`;
        }
        return name;
      })
      .join(", "),

    dates: order.orderItems.flatMap((item) => item.dates.map((date) => date)),

    totalPrice: formatter.format(Number(order.totalPrice)),
    isPaid: order.isPaid ? "oui" : "non",
    createdAt: order.createdAt,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
