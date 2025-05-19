"use client";

import Image from "next/image";
import React, { useState, createRef, RefObject, useEffect, useMemo } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import LanguageSelector from "./LanguageSelector";

type MenuKey = "about" | "services" | "contact";
type Nav = { name: string; href: string };

const NavBar = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openNavMenu, setOpenNavMenu] = useState<MenuKey | null>(null);
  const { t } = useTranslation("common");

  const menuRefs: Record<MenuKey, RefObject<HTMLDivElement | null>> = useMemo(
    () => ({
      about: createRef(),
      services: createRef(),
      contact: createRef(),
    }),
    [],
  );

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (openNavMenu && menuRefs[openNavMenu]?.current) {
        if (!menuRefs[openNavMenu].current!.contains(event.target as Node)) {
          setOpenNavMenu(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openNavMenu, menuRefs]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getNavConfigs = (
    name: MenuKey,
    openNavMenu: MenuKey | null,
    setOpenNavMenu: (key: MenuKey | null) => void,
    refs: Record<MenuKey, RefObject<HTMLDivElement | null>>,
  ) => ({
    isOpen: openNavMenu === name,
    setOpen: (open: boolean) => setOpenNavMenu(open ? name : null),
    ref: refs[name],
  });

  const aboutChildren: Nav[] = [
    { name: t("who"), href: "/about-us/who-we-are" },
    { name: t("testimonials"), href: "/about-us/testimonials" },
    { name: t("faqs"), href: "/about-us/faqs" },
  ];

  const servicesChildren: Nav[] = [
    { name: t("overview"), href: "/services/overview" },
    { name: t("nursing"), href: "/services/nursing" },
    { name: t("rehab"), href: "/services/rehabilitation" },
    { name: t("social"), href: "/services/social" },
    { name: t("activities"), href: "/services/activities" },
  ];

  const contactChildren: Nav[] = [
    { name: t("email"), href: "/contact-us/email" },
    { name: t("tour"), href: "/contact-us/tour" },
  ];

  const navLinks = [
    { name: t("home"), href: "/", children: [] },
    { name: t("about"), href: "/about-us", children: aboutChildren },
    { name: t("services"), href: "/services", children: servicesChildren },
    { name: t("photos"), href: "/photos", children: [] },
    { name: t("locations"), href: "/location", children: [] },
    { name: t("careers"), href: "/careers", children: [] },
    { name: t("contact"), href: "/contact-us", children: contactChildren },
  ];

  const renderNavbar = (item: { name: string; href: string; children: Nav[] }) => {
    const key: MenuKey | null = item.href.includes("about")
      ? "about"
      : item.href.includes("services")
        ? "services"
        : item.href.includes("contact")
          ? "contact"
          : null;

    if (!item.children?.length || !key) {
      return (
        <Link key={item.href} href={item.href} className="hover:underline">
          {item.name}
        </Link>
      );
    }

    const { isOpen, setOpen, ref } = getNavConfigs(key, openNavMenu, setOpenNavMenu, menuRefs);

    return (
      <div key={item.href} className="relative" ref={ref}>
        <button onClick={() => setOpen(!isOpen)} className="hover:underline underline-offset-4 transition duration-200">
          {item.name}
        </button>
        {mounted && isOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white border shadow-md rounded-md w-36 p-4 z-50">
            <ul className="flex flex-col gap-2 text-sm text-gray-800">
              {item.children.map((child) => (
                <li key={child.href}>
                  <Link href={child.href} className="hover:underline" onClick={() => setOpen(false)}>
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="md:sticky top-0 w-full shadow-sm z-50 bg-white">
      <div className="w-full h-2 bg-[#428f47]" /> {/* Line */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/vinelandlogo.png"
              alt="Vineland Logo"
              width={160}
              height={50}
              className="object-contain cursor-pointer"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-4 text-base font-medium text-gray-700">
            {navLinks.map((item) => renderNavbar(item))}
            <LanguageSelector />
          </div>

          {/* Mobile Nav Toggle with Language Selector */}
          <div className="flex lg:hidden items-center">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
              className="ml-1 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Dropdown */}
      <ul
        className={cn(
          "absolute left-4 right-4 z-50 px-2 py-2 border-t-4 border-t-[#428f47] bg-white shadow-lg md:hidden transform transition-all duration-300 ease-in-out origin-top",
          {
            "translate-y-0 opacity-100": isMenuOpen,
            "translate-y-[-10px] opacity-0 pointer-events-none": !isMenuOpen,
          },
        )}
      >
        {navLinks.map((item) => {
          const hasChildren = item.children?.length > 0;

          return (
            <div key={item.href}>
              {!hasChildren ? (
                <Link
                  href={item.href}
                  className="block border-b px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <div>
                  <div className="bg-gray-100 px-4 py-3">
                    <h2 className="text-sm font-semibold text-gray-900">{item.name}</h2>
                  </div>
                  <div className="pl-8">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block border-b px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
