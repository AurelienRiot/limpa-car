import GetCategories from "@/actions-server/get-categories";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar-public/navbar";
import { CategoriesProvider } from "@/providers/categories-provider";
import ModalProvider from "@/providers/modal-provider";
import { getServerSession } from "next-auth";
import React from "react";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const categories = await GetCategories();

  return (
    <>
      <ModalProvider />
      <CategoriesProvider categories={categories} />

      <NavBar role={session?.user?.role} />
      <div className=" pt-16 ">{children}</div>
      {/* <Footer /> */}
    </>
  );
}
