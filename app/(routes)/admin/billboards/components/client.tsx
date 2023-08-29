"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <Heading
          title={`Panneaux d'affichage (${data.length})`}
          description="Gérer les panneaux d'affichage"
        />
        <Button
          onClick={() => router.push(`/admin/billboards/new`)}
          className="pt-6 pb-6 m-2 sm:ml-2 sm:pt-0 sm:pb-0"
        >
          <Plus className="w-8 h-8 mr-2 sm:h-4 sm:w-4" />
          Ajouter un nouveau
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} initialData={data} />
    </>
  );
};
