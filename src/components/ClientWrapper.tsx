"use client";

import { usePathname } from "next/navigation";
import React from "react";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isLocationPage = pathname === "/location";

  return <main className={isHomePage || isLocationPage ? "flex-1" : "flex-1 mt-[80px]"}>{children}</main>;
};

export default ClientWrapper;
