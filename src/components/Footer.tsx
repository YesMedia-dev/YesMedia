"use client";
import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 place-items-start md:place-items-center">
        {/* Left: Logo & Address */}
        <div className="col-span-1">
          <img src="/assets/vinelandlogo.png" alt="Vineland Logo" className="h-10 mb-4" />
          <h4 className="text-sm font-bold uppercase mb-1 text-gray-600">Address</h4>
          <p>
            10830 Oxnard St
            <br />
            North Hollywood, CA 91606
          </p>
        </div>

        {/* Middle Left: Contact + Social */}
        <div className="col-span-1">
          <h4 className="text-sm font-bold uppercase mb-1 text-gray-600">Contact Us</h4>
          <p>
            Tel: 818-763-8247
            <br />
            Fax: 818-279-7385
          </p>
          <h4 className="text-sm font-bold uppercase mt-4 mb-1 text-gray-600">Social Media</h4>
          <div className="flex gap-4 text-xl">
            <a
              href="https://www.facebook.com/vinelandpostacute#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/company/vineland-post-acute/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Middle Right: CNA School */}
        <div className="col-span-1">
          <h4 className="text-sm font-bold uppercase mb-1 text-gray-600">Free CNA School</h4>
          <img src="/assets/edutrack.jpg" alt="EDUTRACK" className="h-8 mb-4" />
          <a
            href="https://suncloudtraining.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-5 py-2 bg-green-800 text-white rounded-full text-sm font-semibold hover:bg-green-900 transition"
          >
            Employee Login
          </a>
        </div>

        {/* Right: Five Star Badge with sparkle animation */}
        <div className="col-span-1 flex justify-center items-center">
          <div className="sparkle-container transform -translate-x-10 -translate-y-2">
            <img src="/assets/fivestar.png" alt="Five Star Rating" className="h-36 object-contain" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-gray-300 pt-6 text-sm text-center text-gray-600">
        <p>© 2025 All Rights Reserved.</p>
        <div className="mt-2 flex justify-center flex-wrap gap-4 text-xs text-gray-500">
          <span>Site Map</span>
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
          <span>Web Accessibility</span>
          <a
            href="https://vinelandpostacute.com/wp-login.php?redirect_to=https%3A%2F%2Fvinelandpostacute.com%2Fwp-admin%2F&reauth=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Client Login
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
