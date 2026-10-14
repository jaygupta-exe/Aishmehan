"use client";

import { motion } from "framer-motion";
import { siteData as fallbackSiteData, COACH_WHATSAPP_NUMBER } from "@/data/siteData";
import { useModal } from "@/context/ModalContext";
import { useSiteContent } from "@/context/DataContext";
import {
  Check,
  Zap,
  Flame,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Utensils,
  Dumbbell,
  MessageCircle,
  Video,
  UserCheck,
  Clock,
  CheckCircle2,
  Calendar,
  Radio,
} from "lucide-react";

export default function PricingSection() {
  const { openApplicationModal } = useModal();
  const { content } = useSiteContent();
  const pricingData = content?.pricing || fallbackSiteData.pricing;
  const liveSessionData = pricingData.liveVideoSession || fallbackSiteData.pricing.liveVideoSession;
  const whatsappNumber = content?.COACH_WHATSAPP_NUMBER || COACH_WHATSAPP_NUMBER || "919779159169";
  const liveSessionWhatsAppUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
    "Hi Coach Divesh Mehan, I would like to book a 1-on-1 Live Video Session (₹800/hour) with you. Please share your available time slots."
  )}`;

  // Icon mapping for deliverables
  const deliverableIcons = [
    Utensils,        // Customised Diet plan veg and non veg
    Dumbbell,        // Designing of workout on weekly basis
    MessageCircle,   // Tracking progress through whatsapp
    Video,           // 1-on-1 Live Video Session (₹800/Hour)
    ShieldCheck,     // Certified Corrective exercise specialist
    Award,           // Certified nutritionist
    UserCheck,       // Certified trainer
  ];

  return (
    <section
      id="pricing"
      className="relative w-full bg-near-black text-off-white py-16 sm:py-24 border-t border-muted-olive/30 overflow-hidden tactical-texture select-none"
    >
      {/* Subtle Military/Olive Atmospheric Backdrop Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-khaki/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-army-olive/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-army-olive/20 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ====================================================
            1. SECTION HEADER WITH TACTICAL BRACKETS
           ==================================================== */}
        <div className="relative max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          {/* Left Tactical Bracket */}
          <div className="absolute inset-y-0 -left-2 sm:-left-6 md:-left-10 flex flex-col justify-between py-2 pointer-events-none">
            <span className="block w-8 sm:w-12 md:w-14 h-[2.5px] bg-khaki" />
            <span className="block w-[2.5px] h-6 sm:h-8 md:h-10 bg-khaki" />
          </div>

          {/* Right Tactical Bracket */}
          <div className="absolute inset-y-0 -right-2 sm:-right-6 md:-right-10 flex flex-col items-end justify-between py-2 pointer-events-none">
            <span className="block w-8 sm:w-12 md:w-14 h-[2.5px] bg-khaki" />
            <span className="block w-[2.5px] h-6 sm:h-8 md:h-10 bg-khaki" />
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-deep-olive border border-muted-olive/50 clip-chamfer-btn mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-khaki" />
            <span className="font-geo text-xs sm:text-sm font-bold tracking-[0.25em] text-khaki uppercase">
              {pricingData.eyebrow}
            </span>
          </div>

          <h2 className="font-geo text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-off-white leading-[0.95] mb-4 drop-shadow-md">
            TRANSFORMATION <span className="text-khaki">PACKAGES</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-off-white/80 max-w-2xl mx-auto leading-relaxed">
            {pricingData.subtitle}
          </p>
        </div>

        {/* ====================================================
            2. 3-TIER PRICING CARDS WITH RICH HOVER EFFECTS
           ==================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {(pricingData.packages || fallbackSiteData.pricing.packages).map((pkg, idx) => {
            const isPopular = Boolean(pkg.popular || (pkg.badge && pkg.badge.toLowerCase().includes("popular")));
            const displayCurrency = pkg.currency || "INR";
            const displayDuration = pkg.durationLabel || `${pkg.name} PROTOCOL`;
            return (
              <motion.div
                key={pkg.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`relative flex flex-col justify-between rounded-none transition-all duration-300 ${
                  isPopular
                    ? "bg-gradient-to-b from-deep-olive/95 via-deep-olive/80 to-near-black border-2 border-khaki shadow-[0_0_35px_rgba(181,168,120,0.25)] hover:shadow-[0_0_55px_rgba(181,168,120,0.5)] md:-translate-y-2.5 z-20"
                    : "bg-deep-olive/50 border border-muted-olive/50 hover:border-khaki/80 hover:bg-deep-olive/80 hover:shadow-glow-khaki shadow-xl"
                } clip-chamfer-btn p-6 sm:p-8 group cursor-pointer`}
                onClick={() => openApplicationModal(pkg.id)}
              >
                {/* Tactical Corner Accents (Interactive on Hover) */}
                <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-khaki/60 group-hover:border-khaki group-hover:scale-125 transition-transform duration-300 pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-khaki/60 group-hover:border-khaki group-hover:scale-125 transition-transform duration-300 pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-khaki/60 group-hover:border-khaki group-hover:scale-125 transition-transform duration-300 pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-khaki/60 group-hover:border-khaki group-hover:scale-125 transition-transform duration-300 pointer-events-none" />

                {/* Card Top: Badge & Protocol Code */}
                <div>
                  <div className="flex items-center justify-between min-h-[30px] mb-4">
                    <span className="text-[11px] font-mono text-khaki font-bold tracking-[0.2em] uppercase group-hover:text-off-white transition-colors">
                      PROTOCOL 0{idx + 1}
                    </span>

                    {pkg.badge && (
                      <span
                        className={`px-3 py-1 text-[10px] font-geo font-black tracking-widest uppercase clip-chamfer-btn ${
                          isPopular
                            ? "bg-khaki text-near-black shadow-glow-khaki animate-pulse"
                            : "bg-army-olive text-off-white border border-khaki/40"
                        }`}
                      >
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  {/* Plan Name & Title */}
                  <h3 className="font-geo text-2xl sm:text-3xl font-black text-off-white uppercase tracking-tight mb-1 group-hover:text-khaki transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs font-mono text-khaki/90 uppercase tracking-wider mb-5">
                    {pkg.title}
                  </p>

                  {/* Price Block */}
                  <div className="py-4 my-2 border-y border-muted-olive/30 bg-near-black/50 px-4 clip-chamfer-btn group-hover:border-khaki/50 group-hover:bg-near-black/80 transition-all duration-300">
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-sm sm:text-base font-mono text-off-white/70">₹</span>
                      <span className="font-geo text-4xl sm:text-5xl font-black text-khaki tracking-tight group-hover:text-off-white transition-colors">
                        {pkg.price}
                      </span>
                      <span className="text-xs font-mono text-off-white/60 uppercase tracking-widest">
                        {displayCurrency}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5 mt-1.5 text-[11px] font-mono text-off-white/70">
                      <Clock className="w-3.5 h-3.5 text-khaki" />
                      <span>{displayDuration} // 1-ON-1 DIRECT</span>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-off-white/75 leading-relaxed my-5">
                    {pkg.description}
                  </p>

                  {/* Mini Highlights for this tier */}
                  <div className="space-y-2.5 mb-6 pt-3 border-t border-muted-olive/20 text-xs text-off-white/90">
                    <div className="flex items-center space-x-2.5 group-hover:translate-x-1 transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-khaki flex-shrink-0" />
                      <span>Weekly Customized Adjustments</span>
                    </div>
                    <div className="flex items-center space-x-2.5 group-hover:translate-x-1 transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-khaki flex-shrink-0" />
                      <span>Direct WhatsApp Access & Feedback</span>
                    </div>
                    <div className="flex items-center space-x-2.5 group-hover:translate-x-1 transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-khaki flex-shrink-0" />
                      <span>Form & Biomechanics Analysis</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA Button */}
                <div className="pt-4 mt-auto">
                  <div className="tactical-bracket-btn w-full">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openApplicationModal(pkg.id);
                      }}
                      className={`w-full py-3.5 px-6 font-geo font-black text-xs sm:text-sm uppercase tracking-[0.2em] clip-chamfer-btn transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                        isPopular
                          ? "bg-khaki text-near-black hover:bg-off-white shadow-glow-khaki group-hover:shadow-[0_0_30px_rgba(181,168,120,0.5)]"
                          : "bg-deep-olive border border-muted-olive text-off-white hover:bg-khaki hover:text-near-black hover:border-khaki group-hover:border-khaki"
                      }`}
                    >
                      <span>SELECT {pkg.name} PLAN</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                    </button>
                  </div>
                  <p className="text-[10px] font-mono text-center text-off-white/40 tracking-wider uppercase mt-2.5">
                    100% PERSONALIZED BLUEPRINT
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ====================================================
            2.5. FEATURED SPOTLIGHT: 1-ON-1 LIVE VIDEO SESSION (₹800/HR)
           ==================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-10 sm:mt-12 max-w-6xl mx-auto relative bg-gradient-to-r from-deep-olive/95 via-near-black to-deep-olive/95 border-2 border-khaki/80 p-6 sm:p-8 clip-chamfer-btn shadow-[0_0_35px_rgba(181,168,120,0.22)] hover:shadow-[0_0_55px_rgba(181,168,120,0.4)] transition-all group"
        >
          {/* Tactical Corner Accents */}
          <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-khaki pointer-events-none group-hover:scale-125 transition-transform" />
          <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-khaki pointer-events-none group-hover:scale-125 transition-transform" />
          <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-khaki pointer-events-none group-hover:scale-125 transition-transform" />
          <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-khaki pointer-events-none group-hover:scale-125 transition-transform" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            {/* Left Content Column */}
            <div className="flex-1 space-y-4 text-left">
              {/* Top Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-khaki text-near-black font-geo font-black text-[11px] tracking-widest uppercase clip-chamfer-btn shadow-sm">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-near-black" />
                  <span>FEATURED // LIVE 1-ON-1</span>
                </span>
                <span className="px-2.5 py-0.5 border border-khaki/60 text-khaki font-mono text-[10px] uppercase tracking-widest bg-near-black/60">
                  {liveSessionData?.badge || "HOURLY INTENSIVE // ₹800/HR"}
                </span>
                <span className="hidden sm:inline-block text-xs font-mono text-off-white/50 tracking-wider">
                  DIRECT ACCESS TO COACH DIVESH MEHAN
                </span>
              </div>

              {/* Main Headline */}
              <div>
                <h3 className="font-geo text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-off-white">
                  {liveSessionData?.title || "1-ON-1 LIVE VIDEO SESSION"}{" "}
                  <span className="text-khaki font-mono">₹{liveSessionData?.price || "800"}</span>
                  <span className="text-xs sm:text-sm font-mono text-off-white/70 uppercase">
                    {" "}{liveSessionData?.rateUnit || "/ Hour"}
                  </span>
                </h3>
                <p className="font-mono text-xs text-khaki uppercase tracking-wider mt-1">
                  {liveSessionData?.subtitle || "60-Minute Direct Private Session with Coach Divesh Mehan (Aish)"}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-off-white/80 leading-relaxed max-w-2xl">
                {liveSessionData?.description ||
                  "Book an intensive 60-minute private video call directly with Coach Divesh Mehan (Aish). Real-time exercise form analysis, personalized diet review, injury prehab consultation, or customized Q&A."}
              </p>

              {/* 4 Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-off-white/90">
                {(liveSessionData?.highlights || [
                  "60-Minute 1-on-1 Private High-Definition Video Call",
                  "Real-Time Exercise Form & Biomechanical Correction",
                  "Personalized Nutrition, Calorie & Macro Q&A Breakdown",
                  "Joint Prehab, Mobility & Corrective Rehab Protocol",
                ]).map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-khaki flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action / Pricing Block */}
            <div className="w-full lg:w-72 flex flex-col justify-center items-center bg-near-black/80 border border-muted-olive/50 p-5 clip-chamfer-btn group-hover:border-khaki/60 transition-all text-center flex-shrink-0">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-khaki mb-1">
                SESSION PRICING
              </span>
              <div className="flex items-baseline justify-center space-x-1.5 my-1">
                <span className="text-sm font-mono text-off-white/70">₹</span>
                <span className="font-geo text-5xl font-black text-khaki tracking-tight">
                  {liveSessionData?.price || "800"}
                </span>
                <span className="text-xs font-mono text-off-white/70 uppercase">
                  {liveSessionData?.rateUnit || "/ HOUR"}
                </span>
              </div>
              <p className="text-[11px] font-mono text-off-white/60 uppercase tracking-wider mb-4">
                100% PRIVATE & TAILORED
              </p>

              {/* Book Button */}
              <button
                type="button"
                onClick={() => openApplicationModal("live-video-session")}
                className="w-full py-3 px-4 bg-khaki text-near-black font-geo font-black text-xs uppercase tracking-[0.18em] clip-chamfer-btn hover:bg-off-white transition-all duration-300 shadow-glow-khaki flex items-center justify-center space-x-2 cursor-pointer mb-2.5"
              >
                <Video className="w-4 h-4" />
                <span>BOOK LIVE SESSION</span>
              </button>

              {/* WhatsApp Quick Link */}
              <a
                href={liveSessionWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-deep-olive border border-muted-olive text-off-white font-geo font-bold text-[11px] uppercase tracking-wider clip-chamfer-btn hover:bg-khaki hover:text-near-black hover:border-khaki transition-all flex items-center justify-center space-x-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-khaki" />
                <span>WHATSAPP DIRECT ENQUIRY</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ====================================================
            3. WHAT IS INCLUDED IN COACHING (Deliverables Grid)
           ==================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-24 max-w-5xl mx-auto bg-deep-olive/80 border-2 border-muted-olive/50 p-6 sm:p-10 clip-chamfer-btn shadow-2xl relative"
        >
          {/* Tactical Corner Accents */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-khaki pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-khaki pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-khaki pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-khaki pointer-events-none" />

          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center space-x-2 text-khaki font-geo text-xs font-bold tracking-[0.2em] uppercase mb-1">
              <Zap className="w-3.5 h-3.5 text-khaki" />
              <span>EVERY PROTOCOL INCLUDES</span>
            </div>
            <h3 className="font-geo text-2xl sm:text-4xl font-black uppercase text-off-white tracking-tight">
              WHAT YOU GET IN <span className="text-khaki">COACHING</span>
            </h3>
            <p className="text-xs sm:text-sm font-mono text-off-white/70 uppercase tracking-wider mt-1">
              Guaranteed high-performance standards & direct elite guidance
            </p>
          </div>

          {/* Deliverables Grid with dynamic interactive hover effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {(pricingData.deliverables || fallbackSiteData.pricing.deliverables).map((item, idx) => {
              const isLiveSessionItem =
                item.toLowerCase().includes("live video") ||
                item.toLowerCase().includes("800") ||
                item.toLowerCase().includes("video calling");
              const IconComponent = isLiveSessionItem
                ? Video
                : deliverableIcons[idx % deliverableIcons.length] || Check;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.03, x: 4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    if (isLiveSessionItem) {
                      openApplicationModal("live-video-session");
                    }
                  }}
                  className={`flex items-start space-x-3.5 p-3.5 border clip-chamfer-btn transition-all group ${
                    isLiveSessionItem
                      ? "bg-gradient-to-r from-near-black via-deep-olive/90 to-near-black border-khaki shadow-[0_0_20px_rgba(181,168,120,0.25)] cursor-pointer hover:border-off-white"
                      : "bg-near-black/70 border-muted-olive/40 hover:border-khaki hover:shadow-glow-khaki hover:bg-deep-olive cursor-default"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-none border flex items-center justify-center flex-shrink-0 transition-all mt-0.5 shadow-sm ${
                      isLiveSessionItem
                        ? "bg-khaki text-near-black border-khaki group-hover:bg-off-white"
                        : "bg-deep-olive border-khaki/50 text-khaki group-hover:bg-khaki group-hover:text-near-black"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-mono text-khaki/80 font-bold block uppercase tracking-widest group-hover:text-off-white transition-colors">
                        FEATURE 0{idx + 1}
                      </span>
                      {isLiveSessionItem && (
                        <span className="text-[9px] font-mono font-black bg-khaki text-near-black px-1.5 py-0.2 uppercase tracking-wider">
                          ₹800 / HR
                        </span>
                      )}
                    </div>
                    <span className="font-geo text-xs sm:text-sm font-bold text-off-white uppercase tracking-wide leading-snug">
                      {item}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* Natural & Evidence-Based Guarantee Slot */}
            <motion.div
              whileHover={{ scale: 1.03, x: 4 }}
              transition={{ duration: 0.2 }}
              className="flex items-start space-x-3.5 p-3.5 bg-gradient-to-r from-army-olive/50 to-deep-olive/80 border border-khaki/50 clip-chamfer-btn group cursor-default"
            >
              <div className="w-9 h-9 rounded-none bg-khaki text-near-black flex items-center justify-center flex-shrink-0 mt-0.5 font-black shadow-md">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-khaki font-black block uppercase tracking-widest">
                  ELITE STANDARD
                </span>
                <span className="font-geo text-xs sm:text-sm font-black text-off-white uppercase tracking-wide leading-snug">
                  100% Natural & Science-Backed Methods
                </span>
              </div>
            </motion.div>
          </div>

          {/* Quick Apply Action Row below deliverables */}
          <div className="mt-8 pt-6 border-t border-muted-olive/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-geo text-sm font-bold text-off-white uppercase tracking-wide">
                Ready to transform your body & mind?
              </p>
              <p className="text-xs font-mono text-off-white/60 uppercase">
                Intake spots are strictly limited each month.
              </p>
            </div>

            <div className="tactical-bracket-btn w-full sm:w-auto">
              <button
                type="button"
                onClick={() => openApplicationModal("8-weeks")}
                className="w-full sm:w-auto px-8 py-3.5 bg-khaki text-near-black font-geo font-black text-xs sm:text-sm uppercase tracking-[0.2em] clip-chamfer-btn hover:bg-off-white transition-all duration-300 shadow-glow-khaki flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>APPLY FOR COACHING NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
