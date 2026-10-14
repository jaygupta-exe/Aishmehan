"use client";

import { siteData as fallbackSiteData } from "@/data/siteData";
import { useSiteContent } from "@/context/DataContext";
import { useModal } from "@/context/ModalContext";
import { ArrowRight, Video, Radio } from "lucide-react";

export default function CredibilityStrip() {
  const { content } = useSiteContent();
  const { openApplicationModal } = useModal();
  const badges = content?.credibility?.badges || fallbackSiteData.credibility.badges;

  return (
    <section className="relative w-full bg-deep-olive pt-8 pb-6 -mt-7 z-30 clip-chamfer-banner-notch border-b border-muted-olive/30 shadow-2xl subtle-camo-overlay tactical-texture">
      {/* Centered Raised Notch Label */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 mb-3 text-center">
        <span className="font-geo text-xs sm:text-sm font-bold tracking-[0.25em] text-off-white uppercase drop-shadow-md">
          {content?.credibility?.label || "FEATURED IN:"}
        </span>
      </div>

      {/* Prominently Highlighted Live Video Session Option Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-4 flex justify-center">
        <button
          type="button"
          onClick={() => openApplicationModal("live-video-session")}
          className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center space-x-2.5 sm:space-x-3.5 px-4 sm:px-6 py-2.5 bg-near-black/90 border-2 border-khaki text-off-white hover:bg-khaki hover:text-near-black clip-chamfer-btn transition-all duration-300 shadow-[0_0_25px_rgba(181,168,120,0.35)] group cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-khaki group-hover:text-near-black animate-pulse flex-shrink-0" />
            <span className="text-xs sm:text-sm font-geo font-black tracking-wider uppercase">
              1-ON-1 LIVE VIDEO SESSION AVAILABLE
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 bg-khaki text-near-black group-hover:bg-near-black group-hover:text-khaki font-mono text-xs font-black uppercase tracking-wider transition-colors">
              ₹800 / HOUR
            </span>
            <span className="hidden md:inline-block text-[11px] font-mono text-khaki/80 group-hover:text-near-black uppercase tracking-wider">
              BOOK DIRECTLY
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-khaki group-hover:text-near-black group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* Infinite Logo Marquee Strip */}
      <div className="relative z-10 flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center space-x-8 sm:space-x-14 py-1.5">
          {[...badges, ...badges].map((badge, idx) => (
            <div
              key={idx}
              className="inline-flex items-center space-x-3 px-5 py-2 bg-near-black/70 border border-muted-olive/50 clip-chamfer-btn group-hover:border-khaki transition-colors duration-200 shadow-md cursor-default"
            >
              <span className="text-[10px] font-mono text-khaki font-bold tracking-widest">
                [{badge.code}]
              </span>
              <span className="font-geo text-sm sm:text-base font-bold tracking-wider text-off-white">
                {badge.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
