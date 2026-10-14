"use client";

import { useEffect, useRef, useState } from "react";
import { siteData as fallbackSiteData } from "@/data/siteData";
import { useModal } from "@/context/ModalContext";
import { useSiteContent } from "@/context/DataContext";

export default function Hero() {
  const { openApplicationModal } = useModal();
  const { content } = useSiteContent();
  const heroData = content?.hero || fallbackSiteData.hero;
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoLoaded(true);
          })
          .catch((err) => {
            console.log("Autoplay prevented:", err);
          });
      }
    }
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-end overflow-hidden bg-near-black">
      {/* Background Video & Poster Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Instant Lightweight Poster for LCP & immediate visual feedback */}
        <img
          src={heroData.posterSrc || "/images/hero-poster.webp"}
          alt="Aish Mehan Transformation Hero Poster"
          fetchPriority="high"
          className={`absolute inset-0 w-full h-full object-cover object-center opacity-95 contrast-[1.04] saturate-[1.08] transition-opacity duration-700 ${
            videoLoaded ? "opacity-0 pointer-events-none" : "opacity-95"
          }`}
        />

        {/* Lightweight Compressed Video with Multi-Source Support */}
        <video
          ref={videoRef}
          poster={heroData.posterSrc || "/images/hero-poster.webp"}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onPlaying={() => setVideoLoaded(true)}
          className="w-full h-full object-cover object-center opacity-95 contrast-[1.04] saturate-[1.08]"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src={heroData.videoSrc || "/hero.mp4"} type="video/mp4" />
        </video>

        {/* Sophisticated Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-near-black/90 via-near-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-near-black/70 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-20 sm:pb-24 pt-32">
        <div className="max-w-2xl">
          {/* 1. Giant "VOTED" / Custom Eyebrow */}
          <div className="mb-0">
            <h1 className="font-geo text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-off-white tracking-tight uppercase leading-[0.88] drop-shadow-2xl">
              {heroData.eyebrow?.includes("VOTED") ? heroData.eyebrow : "VOTED"}
            </h1>
          </div>

          {/* 2. Giant "#1" + Stacked "TRANSFORMATION COACH" */}
          <div className="flex items-center space-x-3 sm:space-x-5 my-2 sm:my-3">
            {/* Giant #1 in Khaki/Gold Accent */}
            <span className="font-geo text-7xl sm:text-8xl md:text-9xl font-bold text-khaki leading-none tracking-tight select-none drop-shadow-lg">
              #1
            </span>

            {/* Stacked Transformation Coach Text */}
            <div className="flex flex-col justify-center font-geo font-bold uppercase tracking-tight text-off-white leading-[0.95]">
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-off-white">
                TRANSFORMATION
              </span>
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-off-white">
                COACH
              </span>
            </div>
          </div>

          {/* 3. Bracketed "APPLY FOR COACHING" & Highlighted "LIVE VIDEO SESSION (₹800/HR)" */}
          <div className="mt-6 sm:mt-8 pt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="tactical-bracket-btn inline-block w-full sm:w-auto">
              <button
                type="button"
                onClick={openApplicationModal}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-4.5 bg-khaki text-near-black font-geo font-bold text-sm sm:text-base tracking-[0.18em] uppercase clip-chamfer-btn hover:bg-off-white hover:text-near-black transition-all duration-300 shadow-glow-khaki cursor-pointer"
              >
                {heroData.primaryCta?.label || "APPLY FOR COACHING"}
              </button>
            </div>

            {/* High-Impact Highlight Option: 1-on-1 Live Video Session */}
            <button
              type="button"
              onClick={() => openApplicationModal("live-video-session")}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 sm:px-7 py-3.5 sm:py-4 bg-near-black/90 border-2 border-khaki text-off-white font-geo font-black text-xs sm:text-sm tracking-[0.16em] uppercase clip-chamfer-btn hover:bg-khaki hover:text-near-black transition-all duration-300 shadow-[0_0_25px_rgba(181,168,120,0.35)] cursor-pointer group"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-khaki group-hover:bg-near-black animate-pulse" />
              <span>LIVE VIDEO SESSION</span>
              <span className="px-2 py-0.5 bg-khaki text-near-black group-hover:bg-near-black group-hover:text-khaki font-mono text-xs font-black tracking-wider transition-colors">
                ₹800/HR
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
