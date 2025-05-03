"use client";
import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Logo & Address */}
        <div>
        <img src="/assets/vinelandlogo.png" alt="Vineland Logo" className="h-10 mb-4" />
          <h4 className="text-sm font-bold uppercase mb-1 text-gray-600">Address</h4>
          <p>10830 Oxnard St<br />North Hollywood, CA 91606</p>
        </div>

        {/* Middle: Contact + Social */}
        <div>
          <h4 className="text-sm font-bold uppercase mb-1 text-gray-600">Contact Us</h4>
          <p>Tel: 818-763-8247<br />Fax: 818-279-7385</p>
          <h4 className="text-sm font-bold uppercase mt-4 mb-1 text-gray-600">Social Media</h4>
          <div className="flex gap-4 text-xl">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Right: CNA School + CTA */}
        <div>
          <h4 className="text-sm font-bold uppercase mb-1 text-gray-600">Free CNA School</h4>
          <img src="/assets/edutrack.jpg" alt="EDUTRACK" className="h-8 mb-4" />
          <a
            href="#"
            className="inline-block mt-2 px-5 py-2 bg-green-800 text-white rounded-full text-sm font-semibold hover:bg-green-900 transition"
          >
            Employee Login
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-gray-300 pt-6 text-sm text-center text-gray-600">
        <p>© 2025 All Rights Reserved.</p>
        <div className="mt-2 flex justify-center flex-wrap gap-4 text-xs text-gray-500">
          <a href="#">Site Map</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Web Accessibility</a>
          <a href="#">Client Login</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
