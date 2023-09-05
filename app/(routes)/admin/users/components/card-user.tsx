"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CardUserProps {
  user: User;
  orderLength: number;
  messagesLength: number;
}

const CardUser: React.FC<CardUserProps> = ({
  user,
  orderLength,
  messagesLength,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);
      await axios.delete(`/api/users/id-admin/${user.id}`);
      router.refresh();
      toast.success("Utilisateur supprimé");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        toast.error(axiosError.response.data as string);
      } else {
        toast.error("Erreur");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />

      <Card>
        <CardHeader>
          <CardTitle>{user.name ? user.name : "Aucun nom renseigné"}</CardTitle>
          <CardDescription>
            <Link href={`/admin/users/${user.id}`}>{user.email}</Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="p-2">Nombre de commandes : {orderLength}</p>
          <p className="p-2">Nombre de messages : {messagesLength}</p>
        </CardContent>
        <CardFooter className="flex flex-col justify-between lg:flex-row gap-y-3 lg:gap-x-2">
          <Button variant="destructive" onClick={() => setOpen(true)}>
            Supprimer
          </Button>
          <Button>
            <Link href={`/admin/users/${user.id}`}>Consulter</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardUser;
