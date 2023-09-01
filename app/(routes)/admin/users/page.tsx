import prismadb from "@/lib/prismadb";
import UserClient from "./components/client";

const UserPage = async () => {
  const users = await prismadb.user.findMany({
    include: {
      messages: true,
      orders: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const orderLengths = users.map((user) => {
    return user.orders.length;
  });

  const messagesLengths = users.map((user) => {
    return user.messages.length;
  });

  const formatedUsers = users.map((user) => {
    return {
      ...user,
      orders: [],
      messages: [],
    };
  });

  return (
    <div>
      <UserClient
        users={formatedUsers}
        orderLengths={orderLengths}
        messagesLengths={messagesLengths}
      />
    </div>
  );
};

export default UserPage;
