"use client";

import { motion } from "framer-motion";
import { Dumbbell, Flame, Activity, Brain } from "lucide-react";

export default function PhilosophySection() {
  const healthPillars = [
    {
      title: "Build Muscle",
      icon: Dumbbell,
    },
    {
      title: "Lose Body Fat",
      icon: Flame,
    },
    {
      title: "Achieve Longevity",
      icon: Activity,
    },
    {
      title: "Improved Your Mood",
      icon: Brain,
    },
  ];

  return (
    <section
      id="philosophy"
      className="relative w-full bg-near-black text-off-white pt-12 sm:pt-16 pb-0 overflow-hidden"
    >
      {/* Top Notched Cutout with Center Vertical Tick Indicator */}
      <div className="relative w-full flex flex-col items-center mb-12 sm:mb-16">
        <div className="w-8 sm:w-12 h-6 sm:h-8 border-b-2 border-x-2 border-khaki/60 flex items-center justify-center -mt-6 bg-near-black">
          <span className="w-[2px] h-3 bg-khaki animate-pulse" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Part 1: Coach Artwork with Offset Geometric Accent Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative max-w-lg mx-auto mb-20 sm:mb-28"
        >
          {/* Tactical Corner Brackets */}
          <div className="absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-khaki/80 pointer-events-none" />
          <div className="absolute -top-4 -right-4 w-6 h-6 border-t-2 border-r-2 border-khaki/80 pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-6 h-6 border-b-2 border-l-2 border-khaki/80 pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b-2 border-r-2 border-khaki/80 pointer-events-none" />

          {/* Horizontal Tick Lines */}
          <div className="absolute -top-2 left-10 right-10 flex justify-between">
            <span className="w-8 h-[2px] bg-off-white/40" />
            <span className="w-8 h-[2px] bg-off-white/40" />
          </div>

          {/* Offset Dark Olive / Khaki Accent Block Behind Image */}
          <div className="absolute top-8 -right-6 bottom-8 left-12 bg-deep-olive border border-muted-olive/50 z-0 pointer-events-none" />

          {/* Coach Cutout Portrait with philosophy.jpeg */}
          <div className="relative z-10 aspect-[4/5] overflow-hidden bg-near-black shadow-2xl border border-muted-olive/30">
            <img
              src="/images/philosophy.jpeg"
              alt="Elite Transformation Coach - Aish Mehan"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-near-black via-transparent to-transparent opacity-60" />
          </div>
        </motion.div>

        {/* Part 2: "CONTROL YOUR ENVIRONMENT, OR IT WILL CONTROL YOU" Block */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-24 sm:mb-32"
        >
          <div className="flex items-start">
            {/* Left Vertical Indicator Bar */}
            <div className="w-[3px] sm:w-[4px] self-stretch bg-off-white mr-5 sm:mr-8 flex-shrink-0" />

            <div className="flex-1">
              <h2 className="font-geo text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-off-white uppercase leading-[1.05] mb-1 sm:mb-2">
                CONTROL YOUR ENVIRONMENT, OR IT WILL
              </h2>
              <span className="font-geo text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-khaki uppercase block mb-8 leading-[0.95]">
                CONTROL YOU
              </span>

              <div className="space-y-5 text-sm sm:text-base text-off-white/80 font-normal leading-relaxed">
                <p>
                  Aish Mehan has been recognized as an elite transformation specialist, empowering clients globally with structured physical standards and metabolic discipline.
                </p>
                <p>
                  Now is your opportunity to apply to have Aish as your direct online coach so you can finally master the internal and external environment that governs your physical reality.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Part 3: "IMPROVE YOUR HEALTHSPAN" & 4 Pillars Block */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Healthspan Headlines */}
          <h2 className="font-geo text-3xl sm:text-5xl md:text-6xl font-bold text-khaki tracking-tight uppercase leading-tight mb-3">
            IMPROVE YOUR HEALTHSPAN
          </h2>
          <p className="font-geo text-lg sm:text-2xl md:text-3xl font-bold text-off-white uppercase tracking-tight max-w-2xl mx-auto leading-snug mb-8">
            ANCESTRAL WISDOM COMBINED WITH MODERN QUANTIFICATION
          </p>

          {/* GET OPTIMIZED CTA Button with Corner Brackets */}
          <div className="mb-14 sm:mb-16">
            <div className="tactical-bracket-btn inline-block">
              <a
                href="#apply"
                className="px-8 sm:px-10 py-4 bg-khaki text-near-black font-geo font-bold text-sm sm:text-base tracking-[0.2em] uppercase clip-chamfer-btn hover:bg-off-white hover:text-near-black transition-all duration-300 shadow-glow-khaki inline-block"
              >
                GET OPTIMIZED
              </a>
            </div>
          </div>

          {/* 4 Iconic Healthspan Pillars (Matching Reference Image 1) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 max-w-4xl mx-auto pt-6">
            {healthPillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-2 group cursor-default"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/40 flex items-center justify-center mb-3 group-hover:border-[#0066FF] group-hover:bg-[#0066FF]/10 transition-all">
                    <IconComponent className="w-7 h-7 text-white stroke-[1.5] group-hover:text-[#0066FF] transition-colors" />
                  </div>
                  <span className="font-geo text-sm sm:text-base font-bold tracking-wide text-white uppercase text-center">
                    {pillar.title}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom Chamfered Blue-to-Black Blend Arch Transition into White About Section (Matching Kris Gethin Reference) */}
      <div className="w-full overflow-hidden leading-none z-30 pt-16 sm:pt-20 -mb-[1px]">
        <svg
          viewBox="0 0 1200 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 md:h-20 block"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="blueBlackGradientTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B0D09" />
              <stop offset="12%" stopColor="#001F5C" />
              <stop offset="30%" stopColor="#0055DD" />
              <stop offset="50%" stopColor="#0077FF" />
              <stop offset="70%" stopColor="#0055DD" />
              <stop offset="88%" stopColor="#001F5C" />
              <stop offset="100%" stopColor="#0B0D09" />
            </linearGradient>
          </defs>

          {/* Pure White fill connecting seamlessly into About section */}
          <path
            d="M0,48 L350,48 L420,8 L780,8 L850,48 L1200,48 L1200,64 L0,64 Z"
            fill="#FFFFFF"
          />
          {/* Thick Blue-to-Black Blend Arch Line */}
          <path
            d="M-10,48 L350,48 L420,8 L780,8 L850,48 L1210,48"
            stroke="url(#blueBlackGradientTop)"
            strokeWidth="12"
            strokeLinejoin="miter"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
}
