"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { DefaultSession } from "next-auth";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
export const LoginButton = () => {
  return (
    <Button title="Se connecter" onClick={() => signIn()}>
      {" "}
      <LoginTwoToneIcon className="w-6 h-6" />{" "}
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button
      title="Se deconnecter"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogoutTwoToneIcon className="w-6 h-6" />
    </Button>
  );
};

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user?: {
      id: string;
      role?: string;
      stripeCustomerId?: string;
    } & DefaultSession["user"];
  }
}
