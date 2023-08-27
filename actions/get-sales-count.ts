import prismadb from "@/lib/prismadb";

export const getSalesCount = async () => {
  const orderCount = await prismadb.order.count({
    where: {
      isPaid: true,
    },
  });

  return orderCount;
};
