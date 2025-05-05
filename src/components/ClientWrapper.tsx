"use client";

import { usePathname } from "next/navigation";
import React from "react";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className={isHomePage ? "" : "mt-[72px]"}>
      {children}
    </div>
  );
};

export default ClientWrapper;
