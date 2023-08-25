import prismadb from "@/lib/prismadb";

const GetUser = async (id: string) => {
  const user = await prismadb.user.findUnique({
    where: {
      id: id,
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
