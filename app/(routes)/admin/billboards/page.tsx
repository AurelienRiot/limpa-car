import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns";
import { BillboardClient } from "./components/client";

const BillboardPage = async () => {
  const billboards = await prismadb.billboard.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    name: item.label,
    description: item.description,
    createdAt: item.createdAt,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardPage;
