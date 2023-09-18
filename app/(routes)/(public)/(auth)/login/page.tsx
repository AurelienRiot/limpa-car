"use client";

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
import { motion } from "framer-motion";

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
  const [success, setSuccess] = useState(false);

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
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="space-y-12 rounded-xl px-2 pb-8 pt-12 sm:bg-white sm:px-8 sm:shadow-xl sm:dark:bg-black">
        <h1 className="text-center text-2xl font-semibold ">
          {" "}
          Page de Connection{" "}
        </h1>
        <button
          onClick={() => {
            signIn("google", {
              callbackUrl,
            });
          }}
          className="flex items-center justify-center  gap-4 rounded-sm bg-[#4285F4] shadow-xl  duration-200 ease-linear  hover:bg-[#4285F4]/90 active:scale-95"
        >
          <svg
            className="h-12 w-12 rounded-sm border-2 border-[#4285F4] bg-white  p-2 hover:border-[#4285F4]/90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 533.5 544.3"
          >
            <path
              d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
              fill="#4285f4"
            />
            <path
              d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
              fill="#34a853"
            />
            <path
              d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
              fill="#fbbc04"
            />
            <path
              d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
              fill="#ea4335"
            />
          </svg>
          <span className="mr-4 font-medium text-white sm:text-lg">
            Se connecter avec Google
          </span>
        </button>
        {success ? null : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => onSubmit(form.getValues()))}
            >
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
                className="mt-4 w-full transition-transform duration-200 ease-linear active:scale-95"
                size="lg"
              >
                {"Se connecter avec l'email"}
              </Button>
            </form>
          </Form>
        )}

        <motion.div
          initial={{ scale: 0 }}
          animate={success ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-center text-xl">E-mail envoyé ! </p>
          <p className="text-center text-xl">
            Veuillez vérifier votre boîte mail.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
