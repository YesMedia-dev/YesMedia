"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    function handleClickOutside(event: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setContactOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 w-full shadow-sm z-50 bg-transparent">
      {/* Colored strip */}
      <div className="w-full h-4 bg-[#428f47]" />

      {/* Main nav */}
      <div className="w-full border-b border-gray-200 bg-white">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo wrapped in Link */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/vinelandlogo.png"
              alt="Vineland Logo"
              width={120}
              height={40}
              className="object-contain cursor-pointer"
            />
          </Link>

          {/* Center Nav Links */}
          <nav className="hidden md:flex gap-6 text-base font-medium text-gray-700 relative">
            <Link href="/" className="hover:underline underline-offset-4 transition duration-200">
              Home
            </Link>

            {/* About Vineland Dropdown */}
            <div className="relative" ref={aboutRef}>
              <button
                onClick={() => {
                  setAboutOpen(!aboutOpen);
                  setServicesOpen(false);
                  setContactOpen(false);
                }}
                className="hover:underline underline-offset-4 transition duration-200"
              >
                About Vineland
              </button>
              {mounted && aboutOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border shadow-md rounded-md w-64 p-4 z-50">
                  <ul className="flex flex-col gap-2 text-sm text-gray-800">
                    <li>
                      <Link href="/about-us/who-we-are" onClick={() => setAboutOpen(false)} className="hover:underline">
                        Who We Are
                      </Link>
                    </li>
                    <li>
                      <Link href="/about-us/testimonials" onClick={() => setAboutOpen(false)} className="hover:underline">
                        Testimonials
                      </Link>
                    </li>
                    <li>
                      <Link href="/about-us/faqs" onClick={() => setAboutOpen(false)} className="hover:underline">
                        General FAQs
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => {
                  setServicesOpen(!servicesOpen);
                  setAboutOpen(false);
                  setContactOpen(false);
                }}
                className="hover:underline underline-offset-4 transition duration-200"
              >
                Services
              </button>
              {mounted && servicesOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border shadow-md rounded-md w-64 p-4 z-50">
                  <ul className="flex flex-col gap-2 text-sm text-gray-800">
                    <li>
                      <Link href="/services/services_overview" onClick={() => setServicesOpen(false)} className="hover:underline">
                        Overview
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/nursing" onClick={() => setServicesOpen(false)} className="hover:underline">
                        Nursing
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/rehabilitation" onClick={() => setServicesOpen(false)} className="hover:underline">
                        Rehabilitation
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/social" onClick={() => setServicesOpen(false)} className="hover:underline">
                        Social Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/activities" onClick={() => setServicesOpen(false)} className="hover:underline">
                        Activities
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <Link href="/photos" className="hover:underline underline-offset-4 transition duration-200">
              Photos
            </Link>
            <Link href="/location" className="hover:underline underline-offset-4 transition duration-200">
              Location
            </Link>
            <Link href="/careers" className="hover:underline underline-offset-4 transition duration-200">
              Careers
            </Link>

            {/* Contact Us Dropdown */}
            <div className="relative" ref={contactRef}>
              <button
                onClick={() => {
                  setContactOpen(!contactOpen);
                  setAboutOpen(false);
                  setServicesOpen(false);
                }}
                className="hover:underline underline-offset-4 transition duration-200"
              >
                Contact Us
              </button>
              {mounted && contactOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border shadow-md rounded-md w-64 p-4 z-50">
                  <ul className="flex flex-col gap-2 text-sm text-gray-800">
                    <li>
                      <Link href="/contact-us/email" onClick={() => setContactOpen(false)} className="hover:underline">
                        Email Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact-us/tour" onClick={() => setContactOpen(false)} className="hover:underline">
                        Schedule a Tour
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>

       {/* Right Side Hidden Block Placeholder */}
        <div className="hidden md:block" /> 
        </div>
      </div>
    </header>
  );
};

export default Header;

