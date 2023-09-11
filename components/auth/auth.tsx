"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { DefaultSession } from "next-auth";
import { LogIn, LogOut } from "lucide-react";
export const LoginButton = () => {
  return (
    <Button title="Se connecter" onClick={() => signIn()}>
      {" "}
      <LogIn className="w-6 h-6" />{" "}
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button
      title="Se deconnecter"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOut className="w-6 h-6" />
    </Button>
  );
};

declare module "next-auth" {
  export interface Session {
    accessToken: string;
    user?: {
      id: string;
      role?: string;
      stripeCustomerId?: string;
    } & DefaultSession["user"];
  }
}
