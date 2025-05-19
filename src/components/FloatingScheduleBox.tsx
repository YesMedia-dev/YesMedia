"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function FloatingScheduleBox() {
  const pathname = usePathname();
  const [showBox, setShowBox] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation("common");

  const isHome = pathname === "/";
  const isTourPage = pathname === "/contact-us/tour";

  useEffect(() => {
    if (isTourPage) return;

    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    // Desktop scroll-trigger only for homepage
    const handleScroll = () => {
      if (isHome && !isMobile) {
        setShowBox(window.scrollY > 300);
      }
    };

    if (!isHome || isMobile) {
      setShowBox(true); // ✅ Show immediately on non-home or mobile
    } else {
      handleScroll(); // initial scroll check
      window.addEventListener("scroll", handleScroll);
    }

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isHome, isMobile, isTourPage]);

  // ❌ Never show on the tour page
  if (isTourPage) return null;

  return (
    <>
      {/* 💻 Desktop / Tablet Version */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={showBox ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block fixed bottom-6 right-6 z-50 bg-white p-3 shadow-lg rounded-lg w-[280px] border border-gray-200"
      >
        <h3 className="text-lg italic font-semibold mb-1 text-gray-900">{t("visitTitle")}</h3>
        <p className="text-sm text-gray-700 mb-4 leading-snug">{t("visitText")}</p>
        <Link
          href="/contact-us/tour"
          className="bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold py-2 px-4 rounded-md w-full flex justify-center items-center"
        >
          <span>{t("scheduleTour")}</span>
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </motion.div>

      {/*  Mobile Version (simplified, always visible) */}
      {isMobile && showBox && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:hidden fixed bottom-20 right-3 z-50 bg-white p-3 shadow-md rounded-lg w-[180px] border border-gray-200"
        >
          <h3 className="text-sm font-semibold italic text-gray-900 mb-2">{t("visitTitle")}</h3>
          <Link
            href="/contact-us/tour"
            className="bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold py-2 px-3 rounded-md w-full flex justify-center items-center"
          >
            <span>{t("scheduleTour")}</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </motion.div>
      )}
    </>
  );
}










