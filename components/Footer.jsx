"use client";

import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";
import { useModal } from "@/context/ModalContext";
import {
  Instagram,
  Youtube,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Flame,
} from "lucide-react";

export default function Footer() {
  const { openApplicationModal } = useModal();
  const storeUrl = "https://stageandsteelsupplements.com/";

  // Social Links matching user requirements
  const socialLinks = [
    {
      id: "aish-instagram",
      title: "FOLLOW AISH ON INSTAGRAM",
      handle: "@aish_mehan",
      badge: "HEAD COACH",
      href: "https://www.instagram.com/aish_mehan?igsh=MWJ2bHRuZjNwdTgwbg==",
      icon: Instagram,
    },
    {
      id: "supplements-instagram",
      title: "FOLLOW STAGE & STEEL",
      handle: "@stageandsteelsupplements",
      badge: "SUPPLEMENTS",
      href: "https://www.instagram.com/stageandsteelsupplements?igsh=Z2M3bzlseXliNm50",
      icon: Instagram,
    },
    {
      id: "aish-youtube",
      title: "SUBSCRIBE ON YOUTUBE",
      handle: "@aishmehan",
      badge: "OFFICIAL CHANNEL",
      href: "https://youtube.com/@aishmehan?si=sHM3f5F1nkZv1VNO",
      icon: Youtube,
    },
  ];

  return (
    <footer id="footer" className="relative w-full bg-[#080907] text-off-white overflow-hidden select-none">
      {/* ====================================================
          1. TOP NOTCHED CONTOUR ACCENT (Border in KHAKI Color)
         ==================================================== */}
      <div className="w-full overflow-hidden leading-none z-20 -mt-[1px]">
        <svg
          viewBox="0 0 1200 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-14 md:h-16 lg:h-20 block"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="khakiNotchFooterTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#080907" />
              <stop offset="10%" stopColor="#302914" />
              <stop offset="25%" stopColor="#8A7655" />
              <stop offset="45%" stopColor="#B5A878" />
              <stop offset="50%" stopColor="#F5EDD0" />
              <stop offset="55%" stopColor="#B5A878" />
              <stop offset="75%" stopColor="#8A7655" />
              <stop offset="90%" stopColor="#302914" />
              <stop offset="100%" stopColor="#080907" />
            </linearGradient>
          </defs>

          {/* Dark fill above the arch notch */}
          <path
            d="M0,0 L1200,0 L1200,48 L870,48 L790,10 L410,10 L330,48 L0,48 Z"
            fill="#080907"
          />

          {/* Glowing Khaki Notch Contour Line (Upward Rising Arch matching screenshot) */}
          <path
            d="M-10,48 L330,48 L410,10 L790,10 L870,48 L1210,48"
            stroke="url(#khakiNotchFooterTop)"
            strokeWidth="11"
            strokeLinejoin="miter"
            fill="none"
          />
        </svg>
      </div>

      {/* Atmospheric Amber & Khaki Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-khaki/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-army-olive/15 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-14 pb-12 sm:pb-16">
        {/* ====================================================
            2. MAIN PROMO ROW: PROTEIN & CREATINE + SOCIAL BUTTONS
           ==================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 sm:mb-20">
          {/* Left Column: Stage & Steel Mocha Protein & Creatine Promo (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col md:flex-row items-center gap-6 sm:gap-8 bg-gradient-to-br from-deep-olive/90 via-near-black to-[#0E110A] border-2 border-muted-olive/50 p-6 sm:p-8 clip-chamfer-btn shadow-2xl relative group"
          >
            {/* Tactical Corner Accents */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-khaki pointer-events-none" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-khaki pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-khaki pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-khaki pointer-events-none" />

            {/* Product Mockup Image */}
            <div className="relative w-full md:w-5/12 flex-shrink-0 flex items-center justify-center">
              <div className="relative max-w-[240px] sm:max-w-[260px] mx-auto py-2">
                <img
                  src="/images/supplements.png"
                  alt="Stage & Steel Mocha Protein and Creatine Monohydrate"
                  className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-near-black border border-khaki/60 px-2.5 py-0.5 whitespace-nowrap text-[9.5px] font-mono text-khaki uppercase tracking-widest shadow-md">
                  100% PURE // LAB TESTED
                </div>
              </div>
            </div>

            {/* Promo Content */}
            <div className="w-full md:w-7/12 flex flex-col justify-between text-left">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-near-black border border-khaki/40 clip-chamfer-btn mb-2.5">
                  <Flame className="w-3 h-3 text-khaki" />
                  <span className="font-geo text-[10.5px] font-bold tracking-[0.2em] text-khaki uppercase">
                    OFFICIAL SUPPLEMENT PROTOCOL
                  </span>
                </div>

                <h3 className="font-geo text-2xl sm:text-3xl font-black uppercase text-off-white tracking-tight leading-tight mb-2">
                  FUEL YOUR <span className="text-khaki">DISCIPLINE</span>
                </h3>

                <p className="font-sans text-xs sm:text-sm text-off-white/80 leading-relaxed mb-4">
                  <strong>Stage &amp; Steel Mocha Protein &amp; Creatine Monohydrate</strong>—crafted for maximum bio-availability, accelerated hypertrophy, and uncompromised athletic performance.
                </p>
              </div>

              {/* Direct Shop CTA */}
              <div className="pt-2 border-t border-muted-olive/30">
                <a
                  href={storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 bg-khaki text-near-black font-geo font-black text-xs uppercase tracking-[0.2em] clip-chamfer-btn hover:bg-off-white transition-all duration-300 shadow-glow-khaki flex items-center justify-center space-x-2 group/btn cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>BUY STAGE &amp; STEEL SUPPLEMENTS</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Tactical Chamfered Social Links (5 Cols - Instagram & YouTube only) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-center space-y-4"
          >
            <div className="mb-1 text-left">
              <span className="font-mono text-[11px] text-khaki font-bold uppercase tracking-[0.25em] block">
                CONNECT &amp; FOLLOW
              </span>
              <h4 className="font-geo text-xl sm:text-2xl font-black uppercase tracking-tight text-off-white">
                OFFICIAL SOCIAL CHANNELS
              </h4>
            </div>

            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-between p-4 sm:p-5 bg-deep-olive/70 border-2 border-muted-olive/60 hover:border-khaki hover:bg-deep-olive hover:shadow-glow-khaki transition-all duration-300 group cursor-pointer"
                  style={{
                    clipPath:
                      "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
                  }}
                >
                  {/* Left Side: Icon & Titles */}
                  <div className="flex items-center space-x-4">
                    <div className="w-11 h-11 bg-near-black border border-khaki/50 flex items-center justify-center text-khaki group-hover:bg-khaki group-hover:text-near-black transition-colors flex-shrink-0 shadow-sm">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="font-geo text-sm sm:text-base font-black text-off-white group-hover:text-khaki transition-colors block uppercase tracking-wider leading-snug">
                        {social.title}
                      </span>
                      <span className="font-mono text-[11px] text-off-white/60 group-hover:text-off-white/90 transition-colors tracking-wide">
                        {social.handle}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Arrow / Badge */}
                  <div className="flex items-center space-x-2 pl-2">
                    <span className="hidden sm:inline-block text-[9.5px] font-mono font-bold tracking-widest text-khaki bg-near-black px-2 py-1 border border-khaki/30 uppercase">
                      {social.badge}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-khaki transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* ====================================================
            3. BOTTOM FOOTER BAR WITH SIGNATURE & NAVIGATION
           ==================================================== */}
        <div className="border-t border-muted-olive/40 pt-10 sm:pt-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            {/* Left: Handwritten Coach Signature */}
            <div className="flex flex-col items-center md:items-start">
              <span className="font-signature text-5xl sm:text-6xl text-off-white tracking-wide select-none drop-shadow-md leading-none">
                Aish Mehan
              </span>
              <span className="font-mono text-[10.5px] text-khaki tracking-[0.25em] uppercase mt-2">
                HEAD TRANSFORMATION SPECIALIST
              </span>
            </div>

            {/* Middle/Right: Navigation Quick Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-3 font-geo text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-off-white/80">
              <a href="#about" className="hover:text-khaki transition-colors">
                ABOUT
              </a>
              <a href="#credentials" className="hover:text-khaki transition-colors">
                CREDENTIALS
              </a>
              <a href="#philosophy" className="hover:text-khaki transition-colors">
                PHILOSOPHY
              </a>
              <a href="#transformations" className="hover:text-khaki transition-colors">
                RESULTS
              </a>
              <a href="#pricing" className="hover:text-khaki transition-colors">
                PRICING
              </a>
              <a
                href="#apply"
                onClick={(e) => {
                  e.preventDefault();
                  openApplicationModal("8-weeks");
                }}
                className="hover:text-khaki transition-colors cursor-pointer"
              >
                1:1 COACHING
              </a>
              <a
                href={storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-khaki hover:text-off-white transition-colors"
              >
                SUPPLEMENTS ↗
              </a>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="mt-10 pt-6 border-t border-muted-olive/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] font-mono text-off-white/50 tracking-wider">
            <p>
              COPYRIGHT &copy; {new Date().getFullYear()}, AISH MEHAN COACHING ALL RIGHTS RESERVED.
            </p>
            <p className="text-off-white/40">
              DISCIPLINE &bull; HYPERTROPHY &bull; LONGEVITY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
