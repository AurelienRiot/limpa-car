import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";

const GetUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return null;
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
      address: {
        orderBy: {
          createdAt: "desc",
        },
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return user;
};

export default GetUser;
