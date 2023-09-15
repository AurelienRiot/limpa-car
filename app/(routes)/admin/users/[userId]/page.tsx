import prismadb from "@/lib/prismadb";
import { OrderColumn } from "./components/order-column";
import { formatter } from "@/lib/utils";
import { OrderTable } from "./components/order-table";
import ButtonBackward from "@/components/ui/button-backward";

const UserPage = async ({ params }: { params: { userId: string } }) => {
  const user = await prismadb.user.findUnique({
    where: {
      id: params.userId,
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
      address: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    return (
      <>
        <div>Utilisateur introuvable </div>
        <ButtonBackward />
      </>
    );
  }

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
    <div className="flex-col p-8 pt-6">
      <div className="flex-1 mb-8 space-y-4 ">
        <p>
          {" "}
          <strong>Nom :</strong> {user?.name}
        </p>
        <p>
          <strong>Email :</strong> {user?.email}
        </p>
        <p>
          <strong>Téléphone :</strong>{" "}
          {user?.phone ? user.phone : "Non renseigné"}
        </p>
        {user?.address ? (
          <div className="flex flex-col space-y-2">
            <p>
              <strong>Adresse :</strong> {user?.address[0]?.line1}
            </p>
            <p>
              <strong>{"Complément d'adresse"} :</strong>{" "}
              {user?.address[0]?.line2}
            </p>
            <p>
              <strong>Ville :</strong> {user?.address[0]?.city}
            </p>
            <p>
              <strong>Code postal :</strong> {user?.address[0]?.postalCode}
            </p>
            <p>
              <strong>Région :</strong> {user?.address[0]?.state}
            </p>
            <p>
              <strong>Pays :</strong> {user?.address[0]?.country}
            </p>
          </div>
        ) : (
          <p>{"Pas d'adresse"}</p>
        )}
      </div>
      <div>
        <ButtonBackward />
        <OrderTable data={formattedOrders} />
      </div>
    </div>
  );
};

export default UserPage;
