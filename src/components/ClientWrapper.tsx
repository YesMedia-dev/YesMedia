"use client";

import { usePathname } from "next/navigation";
import React from "react";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isLocationPage = pathname === "/location";

  return <div className={isHomePage || isLocationPage ? "" : "mt-[80px]"}>{children}</div>;
};

export default ClientWrapper;
