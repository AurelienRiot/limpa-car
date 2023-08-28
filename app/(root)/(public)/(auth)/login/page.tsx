"use client";

import Spinner from "@/components/animations/spinner";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "L'email doit être un email valide" })
    .min(1, { message: "L'email ne peut pas être vide" })
    .max(100, { message: "L'email ne peut pas dépasser 100 caractères" }),
});

type EmailFormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const callbackUrl = useSearchParams().get("callbackUrl") || "/dashboard-user";
  const [loading, setLoading] = useState(false);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: EmailFormValues) => {
    setLoading(true);
    const authentifier = await signIn("email", {
      email: data.email,
      redirect: false,
      callbackUrl: "/",
    });
    if (authentifier?.error) {
      toast.error("Erreur veuillez réessayer");
    } else {
      toast.success("Vérifiez votre boite mail");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-screen h-sccreen bg-slate-100 dark:bg-slate-900">
      <div className="px-8 pt-12 pb-8 space-y-12 sm:shadow-xl sm:bg-white sm:dark:bg-black rounded-xl">
        <h1 className="text-2xl font-semibold"> Se connecter</h1>
        <Button
          onClick={() => {
            signIn("google", {
              callbackUrl,
            });
          }}
        >
          Se connecter avec Google
        </Button>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => onSubmit(form.getValues()))}>
            <div className="grid w-full  items-center gap-1.5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="flex items-start gap-x-4">
                        <Input
                          type="email"
                          autoCapitalize="off"
                          disabled={loading}
                          placeholder="exemple@email.com"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {!loading ? "Se connecter avec l'email" : <Spinner size={20} />}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
