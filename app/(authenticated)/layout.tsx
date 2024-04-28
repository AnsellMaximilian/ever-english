import Header from "@/components/Header";
import React from "react";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className="p-4 container mx-auto">{children}</main>
    </div>
  );
}
