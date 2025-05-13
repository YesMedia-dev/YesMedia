"use client";

import React, { useEffect, useRef, useState } from "react";

const Video = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    function setVideoDimensions() {
      const container = containerRef.current;
      const video = videoRef.current;

      if (container && video) {
        const containerWidth = container.getBoundingClientRect().width;
        const containerHeight = container.getBoundingClientRect().height;
        const aspectRatio = 16 / 9;

        let width = containerWidth;
        let height = containerWidth / aspectRatio;

        if (height < containerHeight) {
          height = containerHeight;
          width = containerHeight * aspectRatio;
        }

        video.style.width = `${width}px`;
        video.style.height = `${height}px`;
        video.style.left = `${(containerWidth - width) / 2}px`;
        video.style.top = `${(containerHeight - height) / 2}px`;
      }
    }

    setVideoDimensions();
    window.addEventListener("resize", setVideoDimensions);
    return () => window.removeEventListener("resize", setVideoDimensions);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !video.src) {
          video.src = "/assets/vinelandvid.mp4";
          video.load();
          video.play().catch(() => {});
          observer.unobserve(video);
        }
      },
      {
        threshold: 0.01,
        rootMargin: "500px 0px", // Preload early
      }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={containerRef} className="relative w-full h-[500px] overflow-hidden bg-gray-50">
        {/* Background Local Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster="/assets/vineland_preview.jpg"
            style={{
              position: "absolute",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Overlay */}
        {!isPopupOpen && <div className="absolute inset-0 bg-black/50 z-10" />}

        {/* Text & Play Button */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4 pb-6">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 max-w-3xl">
            Vineland is a place to call home.
            <br />
            You can now experience an up close view.
          </h2>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="mt-4 flex items-center gap-2 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
          >
            <span className="font-semibold">Play Video</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </section>

      {/* Modal with Vimeo Video */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="relative w-full max-w-5xl aspect-video">
            <iframe
              src="https://player.vimeo.com/video/1055051324?h=98ceea2b33&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=0"
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Vineland Tour Video"
            ></iframe>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-3 right-3 text-white bg-[#004F91] hover:bg-blue-800 px-4 py-2 text-xs font-bold rounded"
            >
              CLOSE ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Video;



