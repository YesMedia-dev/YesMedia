"use client";
import React, { useEffect, useRef, useState } from "react";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const placeholderImg = document.createElement("div");
    placeholderImg.className = "absolute inset-0 bg-black";
    containerRef.current?.appendChild(placeholderImg);

    const video = videoRef.current;

    if (video) {
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("preload", "auto");

      video.muted = true;
      video.playsInline = true;
      video.loop = true;

      video.style.transform = "translateZ(0)";
      video.style.backfaceVisibility = "hidden";

      requestAnimationFrame(() => {
        const playVideo = () => {
          try {
            const playPromise = video.play();

            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  console.log("Video playing successfully");
                  setTimeout(() => {
                    placeholderImg.parentNode?.removeChild(placeholderImg);
                  }, 200);
                })
                .catch((err) => {
                  console.error("Playback failed:", err);
                  setTimeout(() => {
                    video.play();
                  }, 300);
                });
            }
          } catch (e) {
            console.error("Video setup failed:", e);
          }
        };

        playVideo();
      });
    }

    return () => {
      if (video) {
        video.pause();
      }
      placeholderImg.parentNode?.removeChild(placeholderImg);
    };
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full h-[400px] overflow-hidden bg-black"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          preload="auto"
          muted
          playsInline
          loop
          autoPlay
          poster="/assets/video-poster.jpg"
          src="/assets/test2.mp4"
        >
          <source src="/assets/test2.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 max-w-3xl">
            Vineland is a place to call home.
            <br />
            You can now experience an up close view.
          </h2>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="mt-4 flex items-center gap-2 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition duration-300"
            aria-label="Play Video"
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </section>

      {isPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsPopupOpen(false);
            }
          }}
        >
          <div className="relative w-full max-w-5xl mx-4 aspect-video">
            <iframe
              src="https://player.vimeo.com/video/1055051324?h=98ceea2b33&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Vineland Tour Video"
            ></iframe>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-3 right-3 text-white bg-[#004F91] hover:bg-blue-800 px-4 py-2 text-xs font-bold rounded-md transition-colors"
              aria-label="Close video"
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











