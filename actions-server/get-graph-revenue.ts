import prismadb from "@/lib/prismadb";

export type GraphDataProps = {
  month: string;
  totalOrder: number;
};

export const getGraphRevenue = async () => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      isPaid: true,
    },
  });

  const monthlyRevenue: { [key: number]: { totalOrder: number } } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    const revenueForOrder = order.totalPrice;
    monthlyRevenue[month] = {
      totalOrder: parseFloat(
        ((monthlyRevenue[month]?.totalOrder || 0) + revenueForOrder).toFixed(2)
      ),
    };
  }

  const graphData: GraphDataProps[] = [
    { month: "Janvier", totalOrder: 0 },
    { month: "Fevrier", totalOrder: 0 },
    { month: "Mars", totalOrder: 0 },
    { month: "Avril", totalOrder: 0 },
    { month: "Mai", totalOrder: 0 },
    { month: "Juin", totalOrder: 0 },
    { month: "Juillet", totalOrder: 0 },
    { month: "Août", totalOrder: 0 },
    { month: "Septembre", totalOrder: 0 },
    { month: "Octobre", totalOrder: 0 },
    { month: "Novembre", totalOrder: 0 },
    { month: "Decembre", totalOrder: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].totalOrder =
      monthlyRevenue[parseInt(month)].totalOrder;
  }
  return graphData;
};
