"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OrderCellAction } from "./order-cell-action";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

export type OrderColumn = {
  id: string;
  isPaid: string;
  totalPrice: string;
  products: string;
  dates: Date[];
  createdAt: Date;
};
export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Produits",
  },
  {
    accessorKey: "totalPrice",
    header: "Prix total",
  },
  {
    accessorKey: "isPaid",
    header: "Payé",
  },
  {
    accessorKey: "dates",
    header: "Dates",
    cell: ({ row }) => (
      <div className="flex md:pl-10">
        {" "}
        {(row.getValue("dates") as Date[])
          .map((date: Date) => format(date, "d MMMM yyyy", { locale: fr }))
          .join(", ")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date de création
          <ArrowUpDown className="flex-shrink-0 w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex md:pl-10">
        {" "}
        {format(row.getValue("createdAt"), "d MMMM yyyy", { locale: fr })}
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <OrderCellAction data={row.original} />,
  },
];
