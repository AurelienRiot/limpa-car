"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn, dateFormatter } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { fr } from "date-fns/locale";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import Spinner from "../animations/spinner";
import { Calendar } from "../ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchData: (month: Date) => void;
  users: { id: string; name: string | null; email: string | null }[];
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  description: z.string().min(1, { message: "La description est requise" }),
  user: z.string().optional(),
});

export type EventFormValues = z.infer<typeof formSchema>;

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  users,
  refetchData,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      user: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  const onConfirm = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.post("/api/event", {
        ...data,
        date,
      });
      if (date) refetchData(date);
      router.refresh();
      toast.success("Evenement crée");
      onClose();
    } catch (error) {
      toast.error("Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Ajouter un evenement"
      description="Quelle evenement voulez-vous ajouter ?"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center justify-end w-full pt-6 space-x-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onConfirm)}
            className="w-full space-y-8 "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-48">
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-48">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    disabled={loading}
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {date ? (
                      dateFormatter(new Date(date))
                    ) : (
                      <span>Choisir une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="absolute w-auto p-0">
                  <Calendar
                    mode="single"
                    captionLayout="buttons"
                    selected={date}
                    locale={fr}
                    onSelect={setDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Utilisateur</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={loading}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[300px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? users.find((user) => user.id === field.value)
                                ?.name
                            : "Selectionner un utilisateur"}
                          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Rechercher ..." />
                        <CommandEmpty>Aucun utilisateur trouvé</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            value="Aucun utilisateur"
                            onSelect={() => {
                              form.setValue("user", "");
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                !field.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            Aucun utilisateur
                          </CommandItem>
                          {users.map((user) => (
                            <CommandItem
                              value={
                                user.name
                                  ? user.name
                                  : user.email
                                  ? user.email
                                  : user.id
                              }
                              key={user.id}
                              onSelect={() => {
                                form.setValue("user", user.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  user.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {user.name ? user.name : user.email}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit">
              {!loading ? "Créer l'evenement" : <Spinner size={20} />}
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
