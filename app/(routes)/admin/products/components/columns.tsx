"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import Link from "next/link";

export type ProductColumn = {
  id: string;
  name: string;
  options: string | null;
  priceHT: string;
  category: string;
  isFeatured: string;
  isArchived: string;
  createdAt: Date;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => (
      <div className="flex">
        {" "}
        <Link href={`/admin/products/${row.original.id}`}>
          {row.getValue("name")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "isArchived",
    header: "Archivé",
  },
  {
    accessorKey: "isFeatured",
    header: "Mise en avant",
  },
  {
    accessorKey: "priceHT",
    header: "Prix",
  },
  {
    accessorKey: "category",
    header: "Categorie",
  },
  {
    accessorKey: "options",
    header: "Options",
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
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
