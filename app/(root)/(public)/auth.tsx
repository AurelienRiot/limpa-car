"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const AuthPage = () => {
  return (
    <Button
      onClick={() => {
        signIn("google");
      }}
    >
      {" "}
      LogIn
    </Button>
  );
};

export default AuthPage;
