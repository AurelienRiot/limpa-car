"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./event-cell-action";
import Link from "next/link";

export type EventColumn = {
  id: string;
  name: string;
  description: string;
  dateOfEvent: Date;
};

export const columns: ColumnDef<EventColumn>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => (
      <div className="flex ">
        {" "}
        <Link href={`/admin/users/${row.original.id}`}>
          {row.getValue("name")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "description",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
