"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type MenuKey = "About Vineland" | "Services" | "Contact Us";

const aboutChildren = [
  { name: "Who We Are", href: "/about-us/who-we-are" },
  { name: "Testimonials", href: "/about-us/testimonials" },
  { name: "General FAQs", href: "/about-us/faqs" },
];

const servicesChildren = [
  { name: "Overview", href: "/services/overview" },
  { name: "Nursing", href: "/services/nursing" },
  { name: "Rehabilitation", href: "/services/rehabilitation" },
  { name: "Social Services", href: "/services/social" },
  { name: "Activities", href: "/services/activities" },
];

const contactChildren = [
  { name: "Email Us", href: "/contact-us/email" },
  { name: "Schedule A Tour", href: "/contact-us/tour" },
];

const navLinks = [
  { name: "Home", href: "/", children: [] },
  { name: "About Vineland", href: "/about-us", children: aboutChildren },
  { name: "Services", href: "/services", children: servicesChildren },
  { name: "Photos", href: "/photos", children: [] },
  { name: "View Locations", href: "/location", children: [] },
  { name: "Careers", href: "/careers", children: [] },
  { name: "Contact Us", href: "/contact-us", children: contactChildren },
];

const NavBar = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [openNavMenu, setOpenNavMenu] = useState<MenuKey | null>(null);

  const menuRefs: Record<MenuKey, React.RefObject<HTMLDivElement | null>> = {
    "About Vineland": useRef<HTMLDivElement>(null),
    Services: useRef<HTMLDivElement>(null),
    "Contact Us": useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    setMounted(true);

    function handleClickOutside(event: MouseEvent) {
      if (openNavMenu && menuRefs[openNavMenu]?.current) {
        if (!menuRefs[openNavMenu].current!.contains(event.target as Node)) {
          setOpenNavMenu(null);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openNavMenu]);

  const getNavConfigs = (
    name: string,
    openNavMenu: MenuKey | null,
    setOpenNavMenu: (key: MenuKey | null) => void,
    refs: Record<MenuKey, React.RefObject<HTMLDivElement | null>>,
  ) => {
    const key = name as MenuKey;
    return {
      isOpen: openNavMenu === key,
      setOpen: (open: boolean) => setOpenNavMenu(open ? key : null),
      ref: refs[key],
    };
  };

  // Renders the entire nav bar with dropdowns for the correct links
  const renderNavbar = (item: { name: string; href: string; children: any[] }) => {
    if (!item.children || item.children.length === 0)
      return (
        <Link key={item.name} href={item.href} className="hover:underline">
          {item.name}
        </Link>
      );

    const { isOpen, setOpen, ref } = getNavConfigs(item.name, openNavMenu, setOpenNavMenu, menuRefs);

    return (
      <div key={item.name} className="relative" ref={ref}>
        <button onClick={() => setOpen(!isOpen)} className="hover:underline underline-offset-4 transition duration-200">
          {item.name}
        </button>
        {mounted && isOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white border shadow-md rounded-md w-36 p-4 z-50">
            <ul className="flex flex-col gap-2 text-sm text-gray-800">
              {item.children.map((child) => (
                <li key={child.name}>
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
    <nav className="relative w-full shadow-sm z-50 bg-transparent">
      <div className="w-full h-4 bg-[#428f47]" /> {/* Line */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-25 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/vinelandlogo.png"
              alt="Vineland Logo"
              width={160}
              height={50}
              className="object-contain cursor-pointer"
            />
          </Link>

          {/* Desktop NavBar */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4 text-base font-medium text-gray-700">
              {navLinks.map((item) => renderNavbar(item))}
            </div>
          </div>

          {/* Mobile NavBar */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
              className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {isMenuOpen ? <X className="h-36 w-36" /> : <Menu className="h-36 w-36" />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <ul
        className={cn(
          "absolute left-4 right-4 z-50 px-2 py-2 border-t-4 border-t-[#428f47] bg-white shadow-lg dark:bg-gray-900 md:hidden transform transition-all duration-300 ease-in-out origin-top",
          {
            "translate-y-0 opacity-100": isMenuOpen,
            "translate-y-[-10px] opacity-0 pointer-events-none": !isMenuOpen,
          },
        )}
      >
        {navLinks.map((item) => {
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={item.name}>
              {!hasChildren && (
                <Link
                  href={item.href}
                  className="block border-b px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}

              {hasChildren && (
                <div>
                  <div className="bg-gray-100 px-4 py-3 dark:bg-gray-800">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</h2>
                  </div>

                  <div className="pl-8">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block border-b px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
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
