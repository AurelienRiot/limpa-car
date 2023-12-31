import Link from "next/link";
import GetUser from "@/actions-server/get-user";
import { LogoutButton } from "@/components/auth/auth-button";
import ClientData from "./components/client-data";
import { redirect } from "next/navigation";
import { OrderTable } from "./components/order-table";
import { OrderColumn } from "./components/order-column";
import { formatter } from "@/lib/utils";
import { Settings } from "lucide-react";

const UserDashboard = async () => {
  const user = await GetUser();
  if (!user) redirect("/login");

  const formattedOrders: OrderColumn[] = user?.orders.map((order) => ({
    id: order.id,
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
    totalPrice: formatter.format(Number(order.totalPrice) * 1.2),
    isPaid: order.isPaid ? "oui" : "non",
    createdAt: order.createdAt,
  }));

  return (
    <div className="container mb-4 mt-4 gap-4">
      <div className="mb-4 flex h-auto w-auto flex-col items-center justify-center rounded-md border-2 text-gray-800 shadow-xl dark:text-white">
        <h1 className="text-center text-3xl font-bold">
          {user?.name
            ? user.name
            : "Faite un achat pour avoir accès à votre profile"}
        </h1>
        <div className="text-md flex flex-col items-center justify-center text-gray-800 dark:text-white sm:text-xl">
          <div className="grid grid-cols-2 gap-4">
            <p className="font-bold ">Email:</p>
            <p>{user.email}</p>
            <p className="font-bold">Adresse:</p>

            {user.address[0] ? (
              <p>
                {user.address[0].line1} {user.address[0].postalCode}{" "}
                {user.address[0].city}{" "}
              </p>
            ) : (
              <p>{"Pas d'adresse"}</p>
            )}

            <p className="font-bold">Télephone:</p>
            <p>{user.phone}</p>
          </div>
        </div>
        <Link href="/dashboard-user/settings" className="mt-2 ">
          <Settings className="h-8 w-8 cursor-pointer" />
        </Link>
      </div>
      <LogoutButton />
      <OrderTable data={formattedOrders} />
      <ClientData />
    </div>
  );
};

export default UserDashboard;
