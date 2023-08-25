"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Client = () => {
  const router = useRouter();
  return (
    <>
      <Button
        onClick={() => {
          router.push("/login");
        }}
      >
        {" "}
        LogIn
      </Button>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        LogOut
      </Button>
    </>
  );
};

export default Client;
