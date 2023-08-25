import getCategories from "@/actions/get-categories-server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar-public/navbar";
import { getServerSession } from "next-auth";
import React from "react";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const categories = await getCategories();

  return (
    <>
      <NavBar session={session} categories={categories} />
      <div className="relative pt-16">{children}</div>
      <Footer />
    </>
  );
}
