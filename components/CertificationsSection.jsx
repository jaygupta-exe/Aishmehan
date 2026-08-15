"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/siteData";
import { useModal } from "@/context/ModalContext";
import {
  ShieldCheck,
  CheckCircle2,
  Trophy,
  X,
  ZoomIn,
  ArrowRight,
} from "lucide-react";

export default function CertificationsSection() {
  const { openApplicationModal } = useModal();
  const certData = siteData.certifications;
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCert, setSelectedCert] = useState(null);

  const categories = [
    { id: "all", label: "ALL CREDENTIALS", count: certData.items.length },
    {
      id: "championship",
      label: "CHAMPIONSHIP TITLES",
      count: certData.items.filter((i) => i.category === "championship").length,
    },
    {
      id: "medical",
      label: "CORRECTIVE & REHAB",
      count: certData.items.filter((i) => i.category === "medical").length,
    },
    {
      id: "accreditation",
      label: "GLOBAL ACCREDITATIONS",
      count: certData.items.filter((i) => i.category === "accreditation").length,
    },
  ];

  const filteredItems =
    activeCategory === "all"
      ? certData.items
      : certData.items.filter((item) => item.category === activeCategory);

  return (
    <section
      id="credentials"
      className="scroll-mt-20 sm:scroll-mt-24 relative w-full bg-near-black text-off-white py-16 sm:py-20 lg:py-28 border-t border-muted-olive/30 overflow-hidden tactical-texture select-none"
    >
      {/* Background Lighting Accents */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-army-olive/15 rounded-full blur-[140px] opacity-70" />
        <div className="absolute -bottom-20 right-10 w-96 h-96 bg-khaki/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute inset-0 bg-near-black/60 backdrop-blur-[0.5px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* ====================================================
            1. SECTION HEADER
           ==================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-deep-olive border border-muted-olive/50 clip-chamfer-btn mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-khaki" />
            <span className="font-geo text-xs sm:text-sm font-bold tracking-[0.25em] text-khaki uppercase">
              {certData.eyebrow}
            </span>
          </div>

          {/* Large Headline */}
          <h2 className="font-geo text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-off-white leading-[0.95] mb-4 drop-shadow-md">
            GLOBALLY ACCREDITED &amp;
            <span className="block text-khaki mt-1">CHAMPIONSHIP PROVEN</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-off-white/80 leading-relaxed max-w-2xl mx-auto">
            {certData.subheadline}
          </p>
        </div>

        {/* ====================================================
            2. KEY AUTHORITY PILLARS STRIP
           ==================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {certData.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-deep-olive/60 border border-muted-olive/40 p-4 sm:p-5 clip-chamfer-btn relative group hover:border-khaki/60 hover:bg-deep-olive/90 transition-all duration-300 shadow-md text-center"
            >
              <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-khaki/50" />
              <span className="text-[10px] font-mono tracking-widest text-khaki uppercase font-bold block mb-1">
                {stat.label}
              </span>
              <div className="font-geo text-xl sm:text-2xl md:text-3xl font-black text-off-white uppercase tracking-tight mb-1 group-hover:text-khaki transition-colors">
                {stat.value}
              </div>
              <span className="text-[11px] font-sans text-off-white/60 block">
                {stat.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ====================================================
            3. CATEGORY FILTER TABS
           ==================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 font-geo text-xs sm:text-sm font-bold uppercase tracking-[0.18em] clip-chamfer-btn transition-all duration-200 cursor-pointer flex items-center space-x-2 ${
                  isActive
                    ? "bg-khaki text-near-black shadow-glow-khaki font-black"
                    : "bg-near-black/80 border border-muted-olive/40 text-off-white/70 hover:border-khaki hover:text-off-white hover:bg-deep-olive/50"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 ${
                    isActive
                      ? "bg-near-black text-khaki font-bold"
                      : "bg-deep-olive text-off-white/60"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ====================================================
            4. CERTIFICATES GRID
           ==================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const isGold = item.badgeColor === "gold";
              const isBlue = item.badgeColor === "blue";

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="group relative bg-deep-olive/50 border border-muted-olive/50 hover:border-khaki p-5 sm:p-6 clip-chamfer-btn flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:bg-deep-olive/80"
                >
                  {/* Tactical Corner Accents */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-khaki/60 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-khaki/60 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-khaki/60 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-khaki/60 pointer-events-none" />

                  <div>
                    {/* Header Tag / Category Ribbon */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span
                        className={`text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-1 border clip-chamfer-btn ${
                          isGold
                            ? "bg-khaki/15 border-khaki text-khaki"
                            : isBlue
                            ? "bg-[#0066FF]/15 border-[#0066FF]/70 text-[#4da1ff]"
                            : "bg-army-olive/40 border-muted-olive text-off-white"
                        }`}
                      >
                        {item.badgeText}
                      </span>
                      <span className="text-[10px] font-mono text-off-white/50 tracking-wider">
                        {item.date}
                      </span>
                    </div>

                    {/* Certificate Thumbnail Preview (Clickable to Lightbox) */}
                    <div
                      onClick={() => setSelectedCert(item)}
                      className="relative w-full aspect-[4/3] bg-near-black/90 border border-muted-olive/40 overflow-hidden mb-4 cursor-pointer group/img"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover/img:scale-105"
                      />
                      {/* Gradient Overlay & Zoom Prompt on Hover */}
                      <div className="absolute inset-0 bg-near-black/70 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3 text-center">
                        <ZoomIn className="w-8 h-8 text-khaki mb-2 animate-bounce" />
                        <span className="font-geo text-xs font-black tracking-widest text-off-white uppercase bg-near-black/90 px-3 py-1.5 border border-khaki/60">
                          {item.category === "championship" ? "INSPECT CHAMPIONSHIP RECORD" : "INSPECT FULL CERTIFICATE"}
                        </span>
                      </div>
                    </div>

                    {/* Certificate Title */}
                    <h3 className="font-geo text-lg sm:text-xl font-black uppercase tracking-wide text-off-white mb-1.5 group-hover:text-khaki transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Issuing Body & Reg No */}
                    <div className="space-y-0.5 mb-3.5 text-xs text-off-white/70">
                      <p className="font-mono text-[11px] text-khaki font-semibold">
                        {item.organization}
                      </p>
                      <p className="font-mono text-[10px] text-off-white/50">
                        REG / ID: {item.regNo}
                      </p>
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-1.5 mb-4 border-t border-muted-olive/30 pt-3">
                      {item.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start space-x-2 text-xs text-off-white/85 leading-snug"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-khaki flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom CTA: Inspect Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCert(item)}
                      className="w-full py-2.5 px-4 bg-deep-olive border border-muted-olive/60 hover:border-khaki hover:bg-near-black text-off-white font-geo font-bold text-xs uppercase tracking-widest clip-chamfer-btn transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer group/btn"
                    >
                      <span>
                        {item.category === "championship"
                          ? "VIEW CHAMPIONSHIP RECORD"
                          : "VIEW OFFICIAL CREDENTIAL"}
                      </span>
                      <ZoomIn className="w-3.5 h-3.5 text-khaki transition-transform duration-200 group-hover/btn:scale-125" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ====================================================
            5. BOTTOM CTA BANNER
           ==================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-deep-olive via-near-black to-deep-olive border border-muted-olive/60 p-6 sm:p-8 clip-chamfer-btn shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-1">
              <Trophy className="w-4 h-4 text-khaki" />
              <span className="text-[11px] font-mono tracking-widest text-khaki uppercase font-bold">
                PROVEN EXPERTISE // NO BRO-SCIENCE
              </span>
            </div>
            <h4 className="font-geo text-xl sm:text-2xl font-black uppercase tracking-tight text-off-white">
              GET COACHED DIRECTLY BY DIVESH MEHAN
            </h4>
            <p className="text-xs sm:text-sm text-off-white/70 font-sans mt-0.5">
              Experience the difference of structured biomechanics, periodized nutrition, and daily accountability.
            </p>
          </div>

          <div className="tactical-bracket-btn flex-shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={openApplicationModal}
              className="w-full sm:w-auto px-8 py-3.5 bg-khaki text-near-black font-geo font-black text-xs sm:text-sm uppercase tracking-[0.2em] clip-chamfer-btn hover:bg-off-white transition-all duration-300 shadow-glow-khaki flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>APPLY FOR COACHING</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ====================================================
          6. LIGHTBOX MODAL (High-Res Certificate Zoom & Inspection)
         ==================================================== */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-black/92 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl bg-near-black border-2 border-muted-olive/70 shadow-2xl overflow-hidden z-10 my-auto rounded-none tactical-texture max-h-[92vh] flex flex-col"
            >
              {/* Modal Top Header Bar */}
              <div className="bg-deep-olive border-b border-muted-olive/50 px-5 sm:px-6 py-3.5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <span className="w-2.5 h-2.5 bg-khaki rounded-full animate-pulse" />
                  <div>
                    <h3 className="font-geo text-sm sm:text-base font-black tracking-wider text-off-white uppercase">
                      {selectedCert.category === "championship"
                        ? "CHAMPIONSHIP TITLE // RECORD OF EXCELLENCE"
                        : "OFFICIAL CERTIFICATE // VERIFICATION RECORD"}
                    </h3>
                    <p className="text-[11px] font-mono text-khaki uppercase tracking-wider">
                      {selectedCert.organization} • {selectedCert.regNo}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 text-off-white/70 hover:text-khaki hover:bg-near-black/50 transition-colors cursor-pointer"
                  aria-label="Close certificate inspector"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left: High-Res Image Display */}
                  <div className="lg:col-span-7 bg-black/80 border border-muted-olive/50 p-2 sm:p-3 relative group">
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="w-full h-auto max-h-[60vh] object-contain mx-auto shadow-2xl"
                    />
                    <div className="mt-2 text-center">
                      <span className="text-[10px] font-mono text-off-white/40 tracking-widest uppercase">
                        {selectedCert.category === "championship"
                          ? "OFFICIAL CHAMPIONSHIP GOLD INSIGNIA & RECORD"
                          : "ORIGINAL HIGH-RESOLUTION VERIFIED DOCUMENT"}
                      </span>
                    </div>
                  </div>

                  {/* Right: Detailed Certificate Record & Breakdown */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Badge */}
                      <span className="inline-block text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-1 bg-khaki/15 border border-khaki text-khaki clip-chamfer-btn mb-2.5">
                        {selectedCert.badgeText}
                      </span>

                      <h4 className="font-geo text-xl sm:text-2xl font-black uppercase tracking-wide text-off-white mb-2 leading-tight">
                        {selectedCert.title}
                      </h4>

                      <div className="bg-deep-olive/60 border border-muted-olive/40 p-3 mb-4 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="font-mono text-off-white/50 uppercase">RECIPIENT:</span>
                          <span className="font-geo font-bold text-off-white uppercase">DIVESH MEHAN</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-mono text-off-white/50 uppercase">AUTHORITY:</span>
                          <span className="font-mono text-khaki font-semibold">{selectedCert.organization}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-mono text-off-white/50 uppercase">DATE / STATUS:</span>
                          <span className="font-mono text-off-white/80">{selectedCert.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-mono text-off-white/50 uppercase">RECORD ID:</span>
                          <span className="font-mono text-khaki">{selectedCert.regNo}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-[10px] font-mono tracking-widest text-khaki uppercase font-bold block mb-2">
                          VERIFIED HIGHLIGHTS &amp; CREDENTIALS
                        </span>
                        <ul className="space-y-2">
                          {selectedCert.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="flex items-start space-x-2 text-xs text-off-white/90 leading-snug"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-khaki flex-shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-muted-olive/30 pt-3">
                        <p className="text-[11px] font-mono text-off-white/60 italic leading-relaxed">
                          {selectedCert.verificationNote}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCert(null);
                          openApplicationModal();
                        }}
                        className="w-full py-3 bg-khaki text-near-black font-geo font-black text-xs uppercase tracking-[0.18em] clip-chamfer-btn hover:bg-off-white transition-colors cursor-pointer shadow-glow-khaki"
                      >
                        APPLY FOR COACHING WITH DIVESH
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedCert(null)}
                        className="w-full py-2 bg-transparent text-off-white/60 hover:text-off-white font-mono text-[11px] uppercase tracking-widest cursor-pointer"
                      >
                        CLOSE VIEWER
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
