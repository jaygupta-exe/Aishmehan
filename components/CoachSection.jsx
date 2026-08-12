"use client";

import { motion } from "framer-motion";

export default function CoachSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-white text-near-black pt-0 pb-0 shadow-2xl z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
        {/* Subtle Background Geometric Monogram Outline (Matching Reference) */}
        <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none opacity-[0.06] select-none hidden lg:block z-0">
          <svg viewBox="0 0 400 400" className="w-full h-full stroke-near-black fill-none stroke-[2.5]">
            <polygon points="200,20 380,110 380,290 200,380 20,290 20,110" />
            <polygon points="200,60 340,130 340,270 200,340 60,270 60,130" />
            <line x1="200" y1="60" x2="200" y2="340" />
            <line x1="60" y1="130" x2="340" y2="270" />
            <line x1="60" y1="270" x2="340" y2="130" />
          </svg>
        </div>

        {/* Tactical Corner Tick Marks (Matching Reference Screenshot: Horizontal bar + Vertical tick) */}
        <div className="absolute top-4 sm:top-6 left-6 sm:left-10 pointer-events-none z-20">
          <span className="block w-8 sm:w-10 h-[2.5px] bg-near-black mb-2.5" />
          <span className="block w-[2.5px] h-4 sm:h-5 bg-near-black" />
        </div>
        <div className="absolute top-4 sm:top-6 right-6 sm:right-10 pointer-events-none flex flex-col items-end z-20">
          <span className="block w-8 sm:w-10 h-[2.5px] bg-near-black mb-2.5" />
          <span className="block w-[2.5px] h-4 sm:h-5 bg-near-black" />
        </div>

        {/* 2-Column Exact Side-by-Side Flex Layout */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-8 xl:gap-12 pt-4 lg:pt-2">
          {/* Left Column: Editorial Bio, Accolades & Signature (Mobile: order-2, Desktop: order-1) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-7/12 xl:w-7/12 flex flex-col justify-between text-left pt-0 pb-6 lg:pb-0 order-2 lg:order-1 z-10"
          >
            <div>
              {/* Blue Eyebrow (Matching Reference) */}
              <span className="font-geo text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide text-[#0066FF] block mb-2 leading-none">
                ABOUT
              </span>

              {/* Giant Bold Black Headline (Matching Reference) */}
              <h2 className="font-geo text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black uppercase tracking-tight text-near-black leading-[0.9] mb-6 sm:mb-8">
                DIVESH MEHAN
              </h2>

              {/* Bio with Thin Left Vertical Line (Matching Reference) */}
              <div className="border-l border-gray-300 pl-4 sm:pl-5 space-y-4 sm:space-y-5 text-sm sm:text-base text-gray-800 font-normal leading-relaxed max-w-xl">
                <p>
                  Divesh Mehan is globally recognized as one of the leading body transformation specialists. He has been voted the #1 transformation coach and natural physique authority by platforms and industry governing bodies worldwide.
                </p>

                <p>
                  A fitness entrepreneur, educator, and elite coach, Divesh is the founder of Aish Mehan Coaching and Head Transformation Specialist. He has impacted thousands of clients worldwide through his science-backed protocols, biomechanical correction, and structured nutrition systems.
                </p>

                <p>
                  An elite multi-sport athlete, Divesh has competed as a natural professional bodybuilder for over 15 years, earning <strong>1st Place Champion</strong> titles at <strong>Musclemania India</strong>, <strong>Musclemania Asia</strong>, and <strong>NPC Miami, USA</strong>—all achieved 100% naturally.
                </p>

                <p>
                  Today, he works with celebrities, athletes, and executives throughout the year, coaches clients globally via his online training platform, and leads high-level fitness, anti-aging, and metabolic health transformations around the world.
                </p>
              </div>
            </div>

            {/* Large Handwritten Signature (Matching Reference) */}
            <div className="pt-6 sm:pt-8 mt-4 lg:mt-auto">
              <span className="font-signature text-6xl sm:text-7xl md:text-8xl text-near-black tracking-wide select-none drop-shadow-sm block leading-none">
                Aish Mehan
              </span>
            </div>
          </motion.div>

          {/* Right Column: Coach Portrait (Hero Waist-Up Close Framing like Kris Gethin) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full lg:w-5/12 xl:w-5/12 flex items-start justify-center lg:justify-end order-1 lg:order-2 pt-0 pb-0"
          >
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-full min-h-[460px] sm:min-h-[560px] lg:min-h-[720px] max-w-md sm:max-w-lg lg:max-w-none mx-auto overflow-hidden flex items-start justify-center">
              <img
                src="/images/about.png"
                alt="Divesh Mehan (Aish) - Head Transformation Coach"
                className="w-full h-auto object-cover object-top scale-[1.38] origin-top translate-y-[-2%] drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Transition Notched Banner with Full Blue Contour (Matching Kris Gethin Reference) */}
      <div className="relative w-full bg-near-black z-20 overflow-hidden">
        {/* Top Blue Contour of the Banner (Downward Notched Contour matching reference) */}
        <div className="w-full overflow-hidden leading-none -mt-[1px]">
          <svg
            viewBox="0 0 1200 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-10 sm:h-14 md:h-16 lg:h-20 block"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="blueBlackGradientBottom" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0B0D09" />
                <stop offset="10%" stopColor="#002277" />
                <stop offset="25%" stopColor="#0066FF" />
                <stop offset="50%" stopColor="#0088FF" />
                <stop offset="75%" stopColor="#0066FF" />
                <stop offset="90%" stopColor="#002277" />
                <stop offset="100%" stopColor="#0B0D09" />
              </linearGradient>
            </defs>

            {/* Pure White fill from About section above */}
            <path
              d="M0,0 L1200,0 L1200,8 L870,8 L790,46 L410,46 L330,8 L0,8 Z"
              fill="#FFFFFF"
            />

            {/* Glowing Electric Blue Notch Contour Line dipping down */}
            <path
              d="M-10,8 L330,8 L410,46 L790,46 L870,8 L1210,8"
              stroke="url(#blueBlackGradientBottom)"
              strokeWidth="11"
              strokeLinejoin="miter"
              fill="none"
            />
          </svg>
        </div>

        {/* Banner Content & Brand Box (Matching Kris Gethin Reference) */}
        <div className="max-w-7xl mx-auto px-5 pt-4 pb-16 sm:pb-24 text-center relative">
          {/* Header Title */}
          <div className="flex flex-col items-center justify-center space-y-1 sm:space-y-2 mb-10 sm:mb-14">
            <h3 className="font-geo text-2xl sm:text-4xl md:text-5xl font-black tracking-[0.2em] text-white uppercase drop-shadow-md leading-tight">
              AISH&apos;S SIGNATURE
            </h3>
            <span className="font-geo text-2xl sm:text-4xl md:text-5xl font-black tracking-[0.2em] text-white uppercase drop-shadow-md leading-tight">
              BRANDS
            </span>
          </div>

          {/* Signature Brand Box (Stage & Steel - Matching Reference Card Shape & Corner Ticks) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative max-w-xl sm:max-w-2xl mx-auto"
          >
            {/* Outer Tactical Corner Tick Marks around the Box */}
            <div className="absolute -top-3 -left-3 pointer-events-none z-10">
              <span className="block w-6 sm:w-8 h-[2px] bg-white/70 mb-1" />
              <span className="block w-[2px] h-4 sm:h-5 bg-white/70" />
            </div>
            <div className="absolute -top-3 -right-3 pointer-events-none flex flex-col items-end z-10">
              <span className="block w-6 sm:w-8 h-[2px] bg-white/70 mb-1" />
              <span className="block w-[2px] h-4 sm:h-5 bg-white/70" />
            </div>
            <div className="absolute -bottom-3 -left-3 pointer-events-none z-10">
              <span className="block w-[2px] h-4 sm:h-5 bg-white/70 mb-1" />
              <span className="block w-6 sm:w-8 h-[2px] bg-white/70" />
            </div>
            <div className="absolute -bottom-3 -right-3 pointer-events-none flex flex-col items-end z-10">
              <span className="block w-[2px] h-4 sm:h-5 bg-white/70 mb-1" />
              <span className="block w-6 sm:w-8 h-[2px] bg-white/70" />
            </div>

            {/* Chamfered White Brand Box */}
            <a
              href="https://stageandsteelsupplements.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white p-6 sm:p-8 md:p-10 transition-all duration-300 hover:shadow-glow-khaki group cursor-pointer"
              style={{
                clipPath: "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))",
              }}
            >
              <div className="flex items-center justify-center py-2 sm:py-3">
                <img
                  src="/images/stage-and-steel.png"
                  alt="Stage & Steel Supplements"
                  className="w-full max-w-[300px] sm:max-w-[420px] md:max-w-[480px] h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
