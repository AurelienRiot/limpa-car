"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import ButtonBackward from "@/components/ui/button-backward";
import { signOut } from "next-auth/react";
import AddressAutocomplete from "@/actions/adress-autocompleteFR";
import { UserWithAddresse } from "@/types";

interface UserFormProps {
  initialData: UserWithAddresse;
}

interface Suggestion {
  label: string;
  city: string;
  country: string;
  line1: string;
  postal_code: string;
  state: string;
}

const formSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(0),
  address: z.string().min(0),
});

type UserFormValues = z.infer<typeof formSchema>;

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [suggestions, setSuggestions] = useState([]);

  const [address, setAddress] = useState(initialData.address[0]);
  const [query, setQuery] = useState(
    initialData.address[0].line1 +
      " " +
      initialData.address[0].postalCode +
      " " +
      initialData.address[0].city
  );

  const title = "Modifier le profil";
  const toastMessage = "Profil mise à jour";
  const action = "Enregistrer les modifications";

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name ? initialData.name : "",
      phone: initialData.phone ? initialData.phone : "",
      address: query,
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);

      await axios.patch(`/api/users/id`, {
        name: data.name,
        phone: data.phone,
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        country: address.country,
        postalCode: address.postalCode,
        state: address.state,
      });
      // router.refresh();
      // router.push(`/dashboard-user`);
      toast.success(toastMessage);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        toast.error(axiosError.response.data as string);
      } else {
        toast.error("Erreur.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/users/id`);
      signOut({ callbackUrl: "/" });
      toast.success("Utilisateur supprimé.");
    } catch (error) {
      toast.error("Erreur.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 3) {
      const temp = await AddressAutocomplete(value);
      setSuggestions(temp);
    } else {
      setSuggestions([]);
    }
  };

  const handleOnChangeAddress = async (suggestion: Suggestion) => {
    setQuery(suggestion.label);
    setAddress({
      ...address,
      line1: suggestion.line1,
      city: suggestion.city,
      country: suggestion.country,
      postalCode: suggestion.postal_code,
      state: suggestion.state,
    });
    setSuggestions([]);
  };

  return (
    <div onClick={() => setSuggestions([])}>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex flex-col items-center justify-between gap-4 mb-4 md:flex-row">
        <h2 className="text-3xl font-bold tracking-tight"> {title} </h2>

        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
          className="ml-3"
        >
          Supprimer le compte <Trash className="w-4 h-4 ml-2" />
        </Button>
      </div>
      <Separator />
      <p>{initialData.email}</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numeros de téléphone</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="06 00 00 00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <div className="relative items-start text-sm">
                      <Input
                        disabled={loading}
                        placeholder="1 Rue Sainte-Barbe, Strasbourg, 67000, FR"
                        {...field}
                        value={query}
                        onChange={handleChange}
                      />
                      {address.line1 && (
                        <div className="flex flex-col gap-1 mt-2">
                          <span>
                            <b>{"Adresse:"}</b>{" "}
                            <input
                              className="border-2"
                              type="text"
                              value={address.line1}
                              onChange={(e) =>
                                setAddress({
                                  ...address,
                                  line1: e.currentTarget.value,
                                })
                              }
                            />{" "}
                          </span>
                          <span>
                            <b>{"Complément d'adresse:"}</b>{" "}
                            <input
                              className="border-2"
                              type="text"
                              value={address.line2 ? address.line2 : ""}
                              onChange={(e) =>
                                setAddress({
                                  ...address,
                                  line2: e.currentTarget.value,
                                })
                              }
                            />{" "}
                          </span>
                          <span>
                            {" "}
                            <b>Ville:</b> {address.city}{" "}
                          </span>
                          <span>
                            {" "}
                            <b>Code postal:</b> {address.postalCode}{" "}
                          </span>
                          <span>
                            {" "}
                            <b>Région:</b> {address.state}{" "}
                          </span>
                          {/* <span> <b>Pays:</b> {country} </span> */}
                        </div>
                      )}
                      {suggestions.length > 0 && (
                        <ul className="absolute left-0 z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg top-16 dark:bg-blue-950 ">
                          {suggestions.map(
                            (suggestion: Suggestion, index: number) => (
                              <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-blue-900"
                                onClick={() => {
                                  handleOnChangeAddress(suggestion);
                                }}
                              >
                                {suggestion.label}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto " type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <ButtonBackward
        onClick={() => router.replace("/dashboard-user")}
        className="mt-4"
      />
    </div>
  );
};
