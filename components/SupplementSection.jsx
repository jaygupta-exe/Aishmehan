"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

export default function SupplementSection() {
  const storeUrl = "https://stageandsteel.in/";

  return (
    <section className="relative w-full bg-white text-near-black pt-10 sm:pt-14 pb-20 sm:pb-24 clip-chamfer-bottom-notch shadow-2xl z-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Column: Supplement Product Mockup Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-5/12 flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md mx-auto group">
              <img
                src="/images/supplements.png"
                alt="Stage & Steel Mocha Protein and Creatine Monohydrate"
                className="w-full h-auto max-h-[360px] sm:max-h-[420px] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Right Column: Headline, Short Paragraph & BUY NOW Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full lg:w-7/12 flex flex-col justify-center text-center lg:text-left"
          >
            {/* Brand Eyebrow Tag */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-near-black text-khaki font-geo text-xs font-bold tracking-[0.2em] uppercase clip-chamfer-btn mb-4 self-center lg:self-start">
              <Sparkles className="w-3.5 h-3.5 text-khaki" />
              <span>STAGE & STEEL SUPPLEMENTS</span>
            </div>

            {/* Headline matching reference scale */}
            <h2 className="font-geo text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight text-near-black leading-[1.02] mb-3">
              GRAB YOUR <span className="text-khaki font-black">MOCHA PROTEIN</span> & CREATINE
            </h2>

            {/* Short Paragraph */}
            <p className="text-base sm:text-lg text-gray-700 font-normal leading-relaxed mb-6 max-w-2xl">
              Fuel your physical evolution with stage-grade formulations. Grab your mocha protein, pure micronized creatine, and essential recovery essentials directly from Stage & Steel Supplements.
            </p>

            {/* Quality Specs Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-8 text-[11px] sm:text-xs font-geo font-bold tracking-wider text-near-black/75 uppercase">
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-khaki" />
                <span>100% PURE FORMULATIONS</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 hidden sm:inline-block" />
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-khaki" />
                <span>MAXIMUM BIOAVAILABILITY</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 hidden sm:inline-block" />
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-khaki" />
                <span>LABORATORY TESTED</span>
              </span>
            </div>

            {/* Action Row: BUY NOW CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6">
              <div className="tactical-bracket-btn w-full sm:w-auto">
                <a
                  href={storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-10 sm:px-14 py-4 bg-khaki text-near-black font-geo font-bold text-sm sm:text-base tracking-[0.22em] uppercase clip-chamfer-btn hover:bg-near-black hover:text-off-white transition-all duration-300 shadow-glow-khaki group"
                >
                  <span>BUY NOW</span>
                  <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>

              <span className="text-[11px] font-mono tracking-wider text-gray-500 uppercase">
                SHIPS WORLDWIDE FROM STAGE & STEEL
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Downward Notch Center Tick Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
        <span className="w-[2px] h-5 bg-near-black/80" />
      </div>
    </section>
  );
}
