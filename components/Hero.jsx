"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";
import { useModal } from "@/context/ModalContext";

export default function Hero() {
  const { openApplicationModal } = useModal();
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-end overflow-hidden bg-near-black">
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          src={siteData.hero.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center opacity-95 contrast-[1.04] saturate-[1.08]"
        />

        {/* Sophisticated Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-near-black/90 via-near-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-near-black/70 via-transparent to-transparent" />
      </div>

      {/* Hero Content: Instantly Visible Without Flicker */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-20 sm:pb-24 pt-32">
        <div className="max-w-2xl">
          {/* 1. Giant "VOTED" */}
          <div className="mb-0">
            <h1 className="font-geo text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-off-white tracking-tight uppercase leading-[0.88] drop-shadow-2xl">
              VOTED
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

          {/* 3. Bracketed "APPLY FOR COACHING" CTA Button */}
          <div className="mt-6 sm:mt-8 pt-2">
            <div className="tactical-bracket-btn inline-block">
              <button
                type="button"
                onClick={openApplicationModal}
                className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-4.5 bg-khaki text-near-black font-geo font-bold text-sm sm:text-base tracking-[0.18em] uppercase clip-chamfer-btn hover:bg-off-white hover:text-near-black transition-all duration-300 shadow-glow-khaki cursor-pointer"
              >
                {siteData.hero.primaryCta.label}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
