"use client";

import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FACILITIES } from "@/constants/facilities";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const curFacility = FACILITIES.find((facility) => facility.name === "VINELAND POST ACUTE");

const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer className="bg-gray-100 text-gray-800 py-6 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-4 gap-10 place-items-start md:place-items-center">
          {/* Logo + Address */}
          <div className="col-span-1">
            <Image
              src="/assets/vinelandlogo.png"
              alt="Vineland Logo"
              width={120}
              height={40}
              className="object-contain mb-4"
            />
            <h4 className="text-sm font-bold uppercase mb-1 text-gray-600">{t("footerAddress")}</h4>
            <p>
              {curFacility?.address}
              <br />
              {`${curFacility?.city}, ${curFacility?.state} ${curFacility?.zip}`}
            </p>
          </div>

          {/* Contact + Social */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold uppercase mb-1 text-gray-600">{t("footerContact")}</h4>
            <p>
              Tel: 818-763-8247
              <br />
              Fax: 818-279-7385
            </p>
            <h4 className="text-sm font-bold uppercase mt-4 mb-1 text-gray-600">{t("footerSocial")}</h4>
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

          {/* CNA School */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold uppercase mb-1 text-gray-600">{t("footerCnaSchool")}</h4>
            <Image src="/assets/edutrack.jpg" alt="EDUTRACK" width={180} height={40} className="h-8 mb-4" />
            <a
              href="https://suncloudtraining.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-5 py-2 bg-green-800 text-white rounded-full text-sm font-semibold hover:bg-green-900 transition"
            >
              {t("footerEmployeeLogin")}
            </a>
          </div>

          {/* Badge */}
          <div className="col-span-1 flex justify-center items-center">
            <div className="sparkle-container transform -translate-x-10 -translate-y-2">
              <Image
                src="/assets/fivestar.png"
                alt="Five Star Rating"
                width={350}
                height={350}
                className="h-36 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Mobile Grid Layout */}
        <div className="grid md:hidden grid-cols-2 gap-6 text-sm">
          <div className="flex justify-center">
            <Image
              src="/assets/vinelandlogo.png"
              alt="Vineland Logo"
              width={180}
              height={20}
              className="object-contain"
            />
          </div>

          <div className="flex justify-center">
            <div className="sparkle-container">
              <Image
                src="/assets/fivestar.png"
                alt="Five Star Rating"
                width={120}
                height={120}
                className="h-20 w-auto object-contain"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div>
              <h4 className="text-sm font-bold uppercase mb-1 text-gray-600">{t("footerAddress")}</h4>
              <p>
                {curFacility?.address}
                <br />
                {`${curFacility?.city}, ${curFacility?.state} ${curFacility?.zip}`}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div>
              <h4 className="text-sm font-bold uppercase mb-1 text-gray-600">{t("footerContact")}</h4>
              <p>
                Tel: 818-763-8247
                <br />
                Fax: 818-279-7385
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div>
              <h4 className="text-sm font-bold uppercase mb-1 text-gray-600">{t("footerSocial")}</h4>
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
          </div>

          <div className="flex justify-center">
            <div>
              <h4 className="text-sm font-bold uppercase mb-1 text-gray-600">{t("footerCnaSchool")}</h4>
              <Image src="/assets/edutrack.jpg" alt="EDUTRACK" width={130} height={40} className="h-8 mb-4" />
            </div>
          </div>
        </div>

        {/* Employee Login (mobile) */}
        <div className="flex md:hidden justify-center">
          <a
            href="https://suncloudtraining.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-5 py-2 bg-green-800 text-white rounded-full text-sm font-semibold hover:bg-green-900 transition"
          >
            {t("footerEmployeeLogin")}
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-4 border-t border-gray-300 pt-6 text-sm text-center text-gray-600">
        <p>{t("footerCopyright")}</p>
        <div className="flex justify-center flex-wrap gap-4 text-xs text-gray-500">
          <span>{t("footerSiteMap")}</span>
          <span>{t("footerPrivacy")}</span>
          <span>{t("footerTerms")}</span>
          <span>{t("footerAccessibility")}</span>
          <a
            href="https://vinelandpostacute.com/wp-login.php?redirect_to=https%3A%2F%2Fvinelandpostacute.com%2Fwp-admin%2F&reauth=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("footerClientLogin")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


