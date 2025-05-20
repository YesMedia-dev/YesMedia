"use client";

import Link from "next/link";
import { ArrowRight, X, CalendarDays } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function FloatingScheduleBox() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isTourPage = pathname === "/contact-us/tour";

  const [showBox, setShowBox] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    () => typeof window !== "undefined" && 768 <= window.innerWidth && window.innerWidth <= 1024,
  );
  const [mediaViewerOpen, setMediaViewerOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [allowIcon, setAllowIcon] = useState(false);

  const { t } = useTranslation("common");

  useEffect(() => {
    if (isTourPage) return;

    const isDesktop = !isMobile && !isTablet;

    const checkSizes = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsTablet(false);
      } else if (window.innerWidth <= 1024) {
        setIsMobile(false);
        setIsTablet(true);
      } else {
        setIsMobile(false);
        setIsTablet(false);
      }
    };

    const checkMediaOpen = () => {
      const photoModalOpen = document.querySelector(".fixed.inset-0.bg-gray-800\\/70.backdrop-blur-sm.z-50");
      const videoPopupOpen = document.querySelector(
        ".fixed.inset-0.z-50.flex.items-center.justify-center.bg-black\\/90",
      );
      const photoGalleryOverlayOpen = document.querySelector(".fixed.inset-0.z-50.bg-black.bg-opacity-90");

      const portalExists =
        document.querySelector(".yarl__portal") ||
        document.querySelector(".PhotoView-Portal") ||
        document.querySelector(".lightbox-open") ||
        document.querySelector("[class*='modal']:not([class*='modal-hidden'])") ||
        document.querySelector("[class*='lightbox'], [class*='Lightbox']") ||
        document.querySelector("[class*='carousel'], [class*='Carousel']") ||
        document.querySelector("[role='dialog']") ||
        document.querySelector("[aria-modal='true']") ||
        document.querySelector(".react-images__blanket") ||
        document.querySelector(".image-gallery-fullscreen") ||
        document.querySelector(".pswp") ||
        document.querySelector(".fancybox-container");

      const bodyHasOverlayClass =
        document.body.classList.contains("modal-open") ||
        document.body.classList.contains("overflow-hidden") ||
        document.documentElement.classList.contains("modal-open");

      const hasActiveIframe = document.querySelector("iframe[src*='vimeo.com'], iframe[src*='youtube.com']");

      setMediaViewerOpen(
        Boolean(photoModalOpen) ||
          Boolean(videoPopupOpen) ||
          Boolean(photoGalleryOverlayOpen) ||
          Boolean(portalExists) ||
          Boolean(hasActiveIframe) ||
          bodyHasOverlayClass,
      );
    };

    const handleScroll = () => {
      if (isHome) {
        const shouldShow = window.scrollY > 300 && !mediaViewerOpen;
        setShowBox(shouldShow);
        setAllowIcon(shouldShow);
      }
    };

    checkSizes();
    checkMediaOpen();

    // scroll-based visibility
    if (isHome && isDesktop) {
      handleScroll();
      window.addEventListener("scroll", handleScroll);
    } else {
      setShowBox(true);
      setAllowIcon(true);
    }

    window.addEventListener("resize", checkSizes);

    const mediaCheckInterval = setInterval(checkMediaOpen, 500);

    const observer = new MutationObserver(() => {
      checkMediaOpen();
      if (isHome && isDesktop) handleScroll();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      if (isHome && isDesktop) {
        window.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", checkSizes);
      clearInterval(mediaCheckInterval);
      observer.disconnect();
    };
  }, [isHome, isTourPage, mediaViewerOpen]);

  if (isTourPage || mediaViewerOpen) return null;

  return (
    <>
      {/* Minimized Icon */}
      {isMinimized && allowIcon && (
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => {
            setIsMinimized(false);
            setHasInteracted(true);
          }}
          className={`fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg
      ${isMobile && !hasInteracted ? "animate-bounce" : ""}`}
        >
          <CalendarDays className="w-5 h-5" />
        </motion.button>
      )}

      {/* Full Box */}
      {!isMinimized && showBox && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed bottom-6 right-6 z-50 bg-white p-3 shadow-lg rounded-lg w-[280px] border border-gray-200 ${
            isMobile ? "md:hidden" : "hidden md:block"
          }`}
        >
          <button
            onClick={() => setIsMinimized(true)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

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
      )}
    </>
  );
}
