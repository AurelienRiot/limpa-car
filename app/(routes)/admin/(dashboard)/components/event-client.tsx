"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { EventColumn, columns } from "./event-columns";
import { DataTable } from "@/components/ui/data-table";

interface EventClientProps {
  data: EventColumn[];
}

export const EventClient: React.FC<EventClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => router.push(`/admin/billboards/new`)}
        className="self-start pt-6 pb-6 m-2 sm:ml-2 sm:pt-0 sm:pb-0"
      >
        <Plus className="w-8 h-8 mr-2 sm:h-4 sm:w-4" />
        Ajouter un nouveau
      </Button>
      <Separator />
      <DataTable searchKey="name" columns={columns} initialData={data} />
    </>
  );
};
