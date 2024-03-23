"use client";

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return pathname.startsWith("/contact/website") ? (
    <>
      <Header />
      {children}
      <Footer />
    </>
  ) : (
    children
  );
}
