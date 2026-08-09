"use client";

import { siteData } from "@/data/siteData";

export default function CredibilityStrip() {
  return (
    <section className="relative w-full bg-deep-olive pt-8 pb-6 -mt-7 z-30 clip-chamfer-banner-notch border-b border-muted-olive/30 shadow-2xl subtle-camo-overlay tactical-texture">
      {/* Centered Raised Notch Label */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 mb-2.5 text-center">
        <span className="font-geo text-xs sm:text-sm font-bold tracking-[0.25em] text-off-white uppercase drop-shadow-md">
          FEATURED IN:
        </span>
      </div>

      {/* Infinite Logo Marquee Strip */}
      <div className="relative z-10 flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center space-x-8 sm:space-x-14 py-1.5">
          {[...siteData.credibility.badges, ...siteData.credibility.badges].map(
            (badge, idx) => (
              <div
                key={idx}
                className="inline-flex items-center space-x-3 px-5 py-2 bg-near-black/70 border border-muted-olive/50 clip-chamfer-btn group-hover:border-khaki transition-colors duration-200 shadow-md"
              >
                <span className="text-[10px] font-mono text-khaki font-bold tracking-widest">
                  [{badge.code}]
                </span>
                <span className="font-geo text-sm sm:text-base font-bold tracking-wider text-off-white">
                  {badge.title}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
