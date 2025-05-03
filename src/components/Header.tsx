"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 w-full shadow-sm border-b border-gray-200 bg-white z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/assets/vinelandlogo.png"
            alt="Vineland Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex gap-6 text-base font-medium text-gray-700">
          <Link
            href={"/"}
            className="hover:underline underline-offset-4 transition duration-200"
          >
            Home
          </Link>
          <Link
            href={"/about-us"}
            className="hover:underline underline-offset-4 transition duration-200"
          >
            About Vineland
          </Link>
          <Link
            href={"/location"}
            className="hover:underline underline-offset-4 transition duration-200"
          >
            Location
          </Link>
          <Link
            href={"/careers"}
            className="hover:underline underline-offset-4 transition duration-200"
          >
            Careers
          </Link>
          <Link
            href={"/contact-us"}
            className="hover:underline underline-offset-4 transition duration-200"
          >
            Contact Us
          </Link>
        </nav>

        {/* Right (placeholder search icon) */}
        <div className="hidden md:block">
          <button className="text-gray-600 hover:text-gray-900">🔍</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
