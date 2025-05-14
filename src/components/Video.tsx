"use client";
import React, { useEffect, useRef, useState } from "react";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Handle video optimization
  useEffect(() => {
    // Create a low-resolution placeholder initially
    const placeholderImg = document.createElement('div');
    placeholderImg.className = 'absolute inset-0 bg-black';
    containerRef.current?.appendChild(placeholderImg);
    
    // Preload the video before mounting to DOM
    const preloadVideo = new window.Image();
    preloadVideo.src = '/assets/test2.mp4';
    
    // Setup video with optimized settings
    if (videoRef.current) {
      // Apply Chrome-specific optimizations
      videoRef.current.setAttribute('playsinline', '');
      videoRef.current.setAttribute('webkit-playsinline', '');
      videoRef.current.setAttribute('preload', 'auto');
      
      // Critical performance attributes
      videoRef.current.muted = true;
      videoRef.current.playsInline = true; 
      videoRef.current.loop = true;
      
      // Explicitly set video quality for better initial performance
      videoRef.current.style.transform = 'scale(1.01)'; // Slight scale to prevent pixel flickering
      
      // These settings help Chrome with rendering performance
      if ('disableRemotePlayback' in videoRef.current) {
        // @ts-ignore - This exists in Chrome but TypeScript doesn't know about it
        videoRef.current.disableRemotePlayback = true;
      }

      // Force hardware acceleration
      videoRef.current.style.transform = 'translateZ(0)';
      videoRef.current.style.backfaceVisibility = 'hidden';
      
      // Request animation frame for smoother loading
      requestAnimationFrame(() => {
        const playVideo = async () => {
          try {
            await videoRef.current!.load();
            const playPromise = videoRef.current!.play();
            
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setVideoReady(true);
                  console.log("Video playing successfully");
                  
                  // Remove placeholder when video is playing
                  if (placeholderImg.parentNode) {
                    setTimeout(() => {
                      placeholderImg.parentNode?.removeChild(placeholderImg);
                    }, 200);
                  }
                })
                .catch(err => {
                  console.error("Playback failed:", err);
                  // Retry with delay
                  setTimeout(() => {
                    if (videoRef.current) videoRef.current.play();
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
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
      if (placeholderImg.parentNode) {
        placeholderImg.parentNode.removeChild(placeholderImg);
      }
    };
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full h-[400px] overflow-hidden bg-black"
      >
        {/* Video background with optimizations */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          preload="auto"
          muted
          playsInline
          loop
          autoPlay
          poster="/assets/video-poster.jpg" /* Optional: Add a poster image */
          src="/assets/test2.mp4"
        >
          {/* Fallback source format for different browsers */}
          <source src="/assets/test2.mp4" type="video/mp4" />
        </video>
        
        {/* Semi-transparent overlay for better text readability */}
        <div className="absolute inset-0 bg-black/55"></div>

        {/* Centered content */}
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
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </section>

      {/* Modal Vimeo popup - only create when needed */}
      {isPopupOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={(e) => {
            // Close when clicking the backdrop (outside the video)
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








