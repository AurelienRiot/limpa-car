"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { TextArea } from "@/components/ui/text-area";
import { Button } from "@/components/ui/button";
import { UserContact } from "../page";
import Spinner from "@/components/animations/spinner";
import axios from "axios";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Le nom est obligatoire" })
    .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" }),
  mail: z
    .string()
    .email({ message: "L'email n'est pas valide" })
    .min(1, { message: "L'email ne peut pas être vide" })
    .max(100, { message: "L'email ne peut pas dépasser 100 caractères" }),
  phone: z
    .string()
    .refine((value) => value === "" || value.length <= 20, {
      message: "Le numéro de téléphone ne peut pas dépasser 20 caractères",
    })
    .refine((value) => value === "" || /^\+?[0-9] ?(\d ?){1,14}$/.test(value), {
      message: "Le numéro de téléphone n'est pas valide",
    }),
  subject: z
    .string()
    .min(1, { message: "Le sujet ne peut pas être vide" })
    .max(100, { message: "Le sujet ne peut pas dépasser 100 caractères" }),
  message: z
    .string()
    .min(1, { message: "Le message ne peut pas être vide" })
    .max(1000, { message: "Le message ne peut pas dépasser 1000 caractères" }),
});

type ContactFormValues = z.infer<typeof formSchema>;

export const ContactForm = ({
  userContact,
  userId,
}: {
  userContact: UserContact;
  userId: string | undefined;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const action = "Envoyer";

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: userContact,
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setLoading(true);
      await axios.post(`/api/contacts`, { ...data, userId });
      router.refresh();
      router.push(`/`);
      // await new Promise((r) => setTimeout(r, 5000));
      toast.success("Message envoyé");
    } catch (error) {
      toast.error("Erreur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Formulaire de Contact"
          description="Demande d'information"
        />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Nom/Prénom ou nom d'entreprise :"}</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="exemple@mail.com"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="06 29 19 29 10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sujet</FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Renseignement/Devis"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <div className="flex items-start gap-x-4">
                      <TextArea
                        disabled={loading}
                        placeholder="..."
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="w-[90px]">
            {!loading ? action : <Spinner size={20} />}
          </Button>
        </form>
      </Form>
    </>
  );
};
