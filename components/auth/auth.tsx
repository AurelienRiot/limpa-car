"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { DefaultSession } from "next-auth";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";

export const LoginButton = () => {
  return (
    <Button title="Se connecter" onClick={() => signIn()}>
      {" "}
      <BiLogInCircle size={20} />{" "}
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button
      title="Se deconnecter"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <BiLogOutCircle size={20} />
    </Button>
  );
};

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user?: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }
}
