import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async () => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      isPaid: true,
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    return total + Number(order.totalPrice);
  }, 0);

  return totalRevenue;
};
