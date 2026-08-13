"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/siteData";
import { useModal } from "@/context/ModalContext";

export default function Header() {
  const { openApplicationModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY && !mobileMenuOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-near-black/95 backdrop-blur-md border-b border-muted-olive/20 shadow-2xl py-3"
            : "bg-gradient-to-b from-near-black/90 via-near-black/40 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Left: Hamburger Button */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-off-white hover:text-khaki focus:outline-none flex items-center space-x-2.5 group cursor-pointer"
              aria-label="Toggle navigation"
            >
              <div className="w-6 h-4 flex flex-col justify-between items-start">
                <span
                  className={`h-[2px] bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
                  }`}
                />
                <span
                  className={`h-[2px] bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : "w-4"
                  }`}
                />
                <span
                  className={`h-[2px] bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-5"
                  }`}
                />
              </div>
              <span className="hidden lg:inline-block text-[11px] font-mono tracking-widest text-off-white/70 group-hover:text-khaki uppercase">
                MENU
              </span>
            </button>

            {/* Desktop Quick Nav Links */}
            <nav className="hidden lg:flex items-center space-x-6 ml-4">
              {siteData.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[11px] font-semibold tracking-widest text-off-white/80 hover:text-khaki uppercase transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Center: Iconic Signature Logo */}
          <a
            href="#"
            className="flex items-center justify-center focus:outline-none group transform hover:scale-105 transition-transform duration-200"
            aria-label="Aish Mehan Homepage"
          >
            <span className="font-signature text-3xl sm:text-4xl md:text-5xl text-off-white group-hover:text-khaki transition-colors tracking-wide select-none drop-shadow-md">
              Aish Mehan
            </span>
          </a>

          {/* Right: Tactical Bracketed CTA Button */}
          <div className="flex items-center">
            <div className="tactical-bracket-btn">
              <button
                type="button"
                onClick={openApplicationModal}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-khaki text-near-black font-geo font-bold text-xs sm:text-sm tracking-widest uppercase clip-chamfer-btn hover:bg-off-white hover:text-near-black transition-all duration-200 shadow-glow-khaki cursor-pointer inline-block"
              >
                {siteData.header.ctaLabel}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile / Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-near-black/98 backdrop-blur-2xl flex flex-col justify-between px-6 sm:px-12 pt-28 pb-10"
          >
            <div className="max-w-4xl mx-auto w-full flex flex-col justify-between h-full">
              <div className="flex flex-col space-y-6">
                <span className="text-[10px] font-mono tracking-[0.3em] text-khaki uppercase font-bold border-b border-muted-olive/30 pb-3">
                  SYSTEM DIRECTORY // NAVIGATION
                </span>
                {siteData.navigation.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.2 }}
                    className="font-display text-3xl sm:text-5xl tracking-wide text-off-white hover:text-khaki transition-colors flex items-center justify-between group border-b border-muted-olive/15 pb-2"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono text-muted-olive group-hover:text-khaki">
                      0{idx + 1}
                    </span>
                  </motion.a>
                ))}
              </div>

              <div className="pt-8 border-t border-muted-olive/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="tactical-bracket-btn w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openApplicationModal();
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 text-center bg-khaki text-near-black font-geo font-bold text-sm tracking-widest uppercase clip-chamfer-btn shadow-glow-khaki block cursor-pointer"
                  >
                    {siteData.header.ctaLabel}
                  </button>
                </div>
                <p className="text-xs font-mono tracking-wider text-off-white/40 uppercase">
                  {siteData.brand.tagline}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
