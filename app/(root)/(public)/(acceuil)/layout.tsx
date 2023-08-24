import React from "react";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative h-full ">{children}</div>;
}
