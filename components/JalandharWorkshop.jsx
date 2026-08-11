"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteData, ANNOUNCEMENT_EXPIRY } from "@/data/siteData";
import { useModal } from "@/context/ModalContext";
import {
  MapPin,
  ArrowRight,
  Sparkles,
  Shield,
  Flame,
  Activity,
  Zap,
  Award,
  HeartPulse,
  Dumbbell,
  Scale,
} from "lucide-react";

export default function JalandharWorkshop() {
  const { openApplicationModal } = useModal();
  const [isVisible, setIsVisible] = useState(true);
  const data = siteData.jalandharWorkshop;

  // Icon map matching the 5 components of fitness
  const iconMap = {
    HeartPulse: HeartPulse,
    Dumbbell: Dumbbell,
    Zap: Zap,
    Activity: Activity,
    Scale: Scale,
  };

  // Automatic date-based expiry check using client's local date
  useEffect(() => {
    try {
      const now = new Date();
      // Expiry is end of day (23:59:59) on ANNOUNCEMENT_EXPIRY
      const expiry = new Date(`${data?.expiryDate || ANNOUNCEMENT_EXPIRY}T23:59:59`);
      if (now > expiry) {
        setIsVisible(false);
      }
    } catch (e) {
      console.error("Date calculation error:", e);
    }
  }, [data?.expiryDate]);

  // If expired, automatically remove section from DOM
  if (!isVisible) return null;

  return (
    <section
      id="jalandhar-workshop"
      className="relative w-full bg-gradient-to-b from-near-black via-deep-olive/95 to-near-black text-off-white py-12 sm:py-16 lg:py-20 border-y border-muted-olive/30 shadow-2xl overflow-hidden tactical-texture"
    >
      {/* Subtle Military-Inspired Backdrop Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-army-olive/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-khaki/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute inset-0 bg-near-black/40 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-stretch">
          
          {/* ====================================================
              1. LEFT: Campaign Artwork / Coach Announcement Image
             ==================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 flex items-center justify-center order-2 lg:order-1"
          >
            <div className="relative w-full max-w-sm mx-auto group">
              {/* Tactical Corner Tick Accents */}
              <div className="absolute -top-2.5 -left-2.5 w-6 h-6 border-t-2 border-l-2 border-khaki/80 pointer-events-none z-20" />
              <div className="absolute -top-2.5 -right-2.5 w-6 h-6 border-t-2 border-r-2 border-khaki/80 pointer-events-none z-20" />
              <div className="absolute -bottom-2.5 -left-2.5 w-6 h-6 border-b-2 border-l-2 border-khaki/80 pointer-events-none z-20" />
              <div className="absolute -bottom-2.5 -right-2.5 w-6 h-6 border-b-2 border-r-2 border-khaki/80 pointer-events-none z-20" />

              {/* Chamfered Image Container with annoucment.png */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden bg-near-black border border-muted-olive/50 shadow-2xl clip-chamfer-btn">
                <img
                  src="/images/annoucment.png"
                  alt="Aish Mehan - Jalandhar Fitness Workshop Announcement"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtle Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/90 via-near-black/20 to-transparent pointer-events-none" />

                {/* Bottom Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-near-black/85 backdrop-blur-sm border border-muted-olive/50 clip-chamfer-btn flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-khaki uppercase font-bold tracking-widest block">
                      HEAD COACH // 15+ YEARS EXP
                    </span>
                    <span className="font-geo text-sm font-black text-off-white uppercase tracking-wider">
                      DIVESH MEHAN
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-khaki animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ====================================================
              2. CENTER: Headline, 5 Components & Coach Message
             ==================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between order-1 lg:order-2"
          >
            <div>
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-deep-olive border border-muted-olive/50 clip-chamfer-btn mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-khaki animate-pulse" />
                <span className="font-geo text-xs sm:text-sm font-bold tracking-[0.25em] text-khaki uppercase">
                  {data.eyebrow}
                </span>
              </div>

              {/* Large Headline */}
              <h2 className="font-geo text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-off-white leading-[0.92] mb-3 drop-shadow-md">
                FIRST-EVER FITNESS WORKSHOP
                <span className="block text-khaki mt-1">IN JALANDHAR</span>
              </h2>

              {/* Supporting Statement */}
              <p className="font-geo text-base sm:text-xl font-bold uppercase tracking-wider text-off-white/90 mb-5 flex items-center space-x-2">
                <span className="text-khaki">//</span>
                <span>{data.subheadline}</span>
              </p>

              {/* 5 Components Horizontal / Grid Treatment */}
              <div className="mb-6">
                <span className="text-[10px] font-mono text-off-white/50 tracking-[0.2em] uppercase block mb-2.5">
                  CORE CURRICULUM MODULES
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {data.components.map((component, idx) => {
                    const IconComponent = iconMap[component.icon] || Zap;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.06 * idx }}
                        className="group relative bg-near-black/85 border border-muted-olive/40 hover:border-khaki p-2.5 flex flex-col items-center justify-between text-center clip-chamfer-btn transition-all duration-300 hover:bg-deep-olive/90 hover:shadow-glow-khaki min-h-[90px] sm:min-h-[105px]"
                      >
                        <div className="w-full flex items-center justify-between">
                          <span className="text-[9px] font-mono text-khaki/70 tracking-widest font-bold">
                            {component.id || `0${idx + 1}`}
                          </span>
                          <IconComponent className="w-3.5 h-3.5 text-khaki transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        
                        <span className="font-geo text-[10.5px] sm:text-xs font-black tracking-wide text-off-white uppercase group-hover:text-khaki transition-colors leading-tight my-auto px-0.5">
                          {component.title}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Message / Experience Quote */}
            <div className="border-l-2 border-khaki/70 pl-4 py-2 bg-deep-olive/40 rounded-r border-t border-b border-r border-muted-olive/20 mt-4 lg:mt-0">
              <p className="font-sans text-xs sm:text-sm text-off-white/90 italic leading-relaxed">
                “{data.message}”
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Award className="w-3.5 h-3.5 text-khaki" />
                <span className="text-[10px] font-mono tracking-widest text-khaki uppercase font-semibold">
                  DIVESH MEHAN // HEAD COACH
                </span>
              </div>
            </div>
          </motion.div>

          {/* ====================================================
              3. RIGHT: High-Impact Batch & Action Card
             ==================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3 flex flex-col justify-center order-3"
          >
            <div className="relative bg-deep-olive border border-muted-olive/60 p-5 sm:p-6 lg:p-6 clip-chamfer-btn shadow-2xl text-center flex flex-col justify-between h-full">
              {/* Tactical Corner Accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-khaki/80 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-khaki/80 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-khaki/80 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-khaki/80 pointer-events-none" />

              {/* Batch Card Header */}
              <div className="mb-3">
                <span className="font-geo text-[11px] font-bold tracking-[0.2em] text-khaki uppercase block mb-1">
                  EXCLUSIVE COHORT
                </span>
                <h3 className="font-geo text-lg sm:text-xl font-black uppercase tracking-tight text-off-white">
                  {data.batch.title}
                </h3>
              </div>

              {/* Prominent "25 SPOTS ONLY" Highlight */}
              <div className="my-3 py-3.5 bg-near-black/70 border border-muted-olive/50 clip-chamfer-btn relative">
                <span className="text-[10px] font-mono text-off-white/60 uppercase tracking-[0.2em] block mb-0.5">
                  LIMITED CAPACITY
                </span>
                <div className="flex items-baseline justify-center space-x-1.5">
                  <span className="font-geo text-5xl sm:text-6xl font-black text-khaki leading-none drop-shadow-lg select-none">
                    {data.batch.count}
                  </span>
                  <span className="font-geo text-lg font-black uppercase text-off-white tracking-wider leading-none text-left">
                    SPOTS
                    <br />
                    <span className="text-khaki text-sm">
                      ONLY
                    </span>
                  </span>
                </div>
                <div className="mt-1.5 inline-block px-2.5 py-0.5 bg-army-olive/60 border border-khaki/30 text-[9px] font-mono tracking-widest text-off-white uppercase">
                  {data.batch.availabilityBadge}
                </div>
              </div>

              {/* Location Details */}
              <div className="mb-4 flex items-center justify-center space-x-1.5 text-off-white/90">
                <MapPin className="w-3.5 h-3.5 text-khaki flex-shrink-0" />
                <span className="font-geo text-xs sm:text-sm font-bold tracking-wider uppercase">
                  {data.batch.locationLabel}: <span className="text-khaki">{data.batch.gymName}</span>, {data.batch.city}
                </span>
              </div>

              {/* CTA Button opening in-website form modal */}
              <div className="space-y-2">
                <div className="tactical-bracket-btn w-full">
                  <button
                    type="button"
                    onClick={openApplicationModal}
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-khaki text-near-black font-geo font-black text-sm sm:text-base tracking-[0.2em] uppercase clip-chamfer-btn hover:bg-off-white hover:text-near-black transition-all duration-300 shadow-glow-khaki group cursor-pointer"
                  >
                    <span>{data.ctaText}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>

                <p className="text-[10px] font-mono tracking-widest text-khaki/90 uppercase font-semibold">
                  {data.supportingText}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
