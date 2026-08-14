"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/context/ModalContext";
import { useSiteContent } from "@/context/DataContext";

const defaultTransformationImages = [
  {
    id: 1,
    src: "/images/before after 1.JPG",
    alt: "Client Transformation 1",
    objectPosition: "center 6%",
  },
  {
    id: 2,
    src: "/images/before after 2.JPG",
    alt: "Client Transformation 2",
    objectPosition: "center 32%",
  },
  {
    id: 3,
    src: "/images/before after 3.JPG",
    alt: "Client Transformation 3",
    objectPosition: "center 10%",
  },
  {
    id: 4,
    src: "/images/before after 4.JPG",
    alt: "Client Transformation 4",
    objectPosition: "center 37%",
  },
  {
    id: 5,
    src: "/images/before after 5.JPG",
    alt: "Client Transformation 5",
    objectPosition: "center 36%",
  },
  {
    id: 6,
    src: "/images/before after 6.JPG",
    alt: "Client Transformation 6",
    objectPosition: "center 39%",
  },
  {
    id: 7,
    src: "/images/before after 7.JPG",
    alt: "Client Transformation 7",
    objectPosition: "center 42%",
  },
  {
    id: 8,
    src: "/images/before after 8.JPG",
    alt: "Client Transformation 8",
    objectPosition: "center 34%",
  },
  {
    id: 9,
    src: "/images/before after 9 - Copy.JPG",
    alt: "Client Transformation 9",
    objectPosition: "center 10%",
  },
  {
    id: 10,
    src: "/images/before after 10 - Copy.JPG",
    alt: "Client Transformation 10",
    objectPosition: "center 44%",
  },
];

const ITEMS_PER_SLIDE = 4;

export default function BeforeAfterSection() {
  const { openApplicationModal } = useModal();
  const { transformations } = useSiteContent();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const imagesList = transformations && transformations.length > 0 ? transformations : defaultTransformationImages;
  const totalSlides = Math.max(1, Math.ceil(imagesList.length / ITEMS_PER_SLIDE));

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Current batch of 4 images
  const currentImages = imagesList.slice(
    currentSlide * ITEMS_PER_SLIDE,
    currentSlide * ITEMS_PER_SLIDE + ITEMS_PER_SLIDE
  );

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <section
      id="transformations"
      className="relative w-full bg-[#1C1E20] text-white pt-0 pb-0 overflow-hidden select-none"
    >
      {/* 1. TOP NOTCHED BLUE CONTOUR ACCENT (Upward Rising Arch matching screenshot) */}
      <div className="w-full overflow-hidden leading-none z-20 -mt-[1px]">
        <svg
          viewBox="0 0 1200 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-14 md:h-16 lg:h-20 block"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="blueNotchTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B0D09" />
              <stop offset="10%" stopColor="#002277" />
              <stop offset="25%" stopColor="#0066FF" />
              <stop offset="50%" stopColor="#0088FF" />
              <stop offset="75%" stopColor="#0066FF" />
              <stop offset="90%" stopColor="#002277" />
              <stop offset="100%" stopColor="#0B0D09" />
            </linearGradient>
          </defs>

          {/* Dark fill above the arch notch */}
          <path
            d="M0,0 L1200,0 L1200,48 L870,48 L790,10 L410,10 L330,48 L0,48 Z"
            fill="#0B0D09"
          />

          {/* Glowing Electric Blue Notch Contour Line (Upward Rising Arch) */}
          <path
            d="M-10,48 L330,48 L410,10 L790,10 L870,48 L1210,48"
            stroke="url(#blueNotchTopGrad)"
            strokeWidth="11"
            strokeLinejoin="miter"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-8 sm:pb-14 relative z-10">
        {/* 2. SECTION HEADER WITH TACTICAL BRACKET ACCENTS (Exact Match to Screenshot 1) */}
        <div className="relative max-w-2xl mx-auto text-center mb-8 sm:mb-12">
          {/* Left Tactical Bracket: Top horizontal bar + lower vertical tick mark */}
          <div className="absolute inset-y-0 -left-2 sm:-left-6 md:-left-12 flex flex-col justify-between py-2 pointer-events-none">
            <span className="block w-9 sm:w-14 md:w-16 h-[2.5px] bg-white" />
            <span className="block w-[2.5px] h-6 sm:h-8 md:h-10 bg-white" />
          </div>

          {/* Right Tactical Bracket: Top horizontal bar + lower vertical tick mark */}
          <div className="absolute inset-y-0 -right-2 sm:-right-6 md:-right-12 flex flex-col items-end justify-between py-2 pointer-events-none">
            <span className="block w-9 sm:w-14 md:w-16 h-[2.5px] bg-white" />
            <span className="block w-[2.5px] h-6 sm:h-8 md:h-10 bg-white" />
          </div>

          {/* Stacked Heading: BEFORE AND / AFTER */}
          <div className="py-2 px-4">
            <h2 className="font-geo text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.16em] sm:tracking-[0.22em] text-white leading-[1.08] drop-shadow-md">
              BEFORE AND
            </h2>
            <span className="font-geo text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.16em] sm:tracking-[0.22em] text-white leading-[1.08] drop-shadow-md block">
              AFTER
            </span>
          </div>
        </div>

        {/* 3. 4-IMAGE GRID (2 UP, 2 DOWN PER SLIDE) WITH ELECTRIC BLUE BORDER (Exact Match) */}
        <div className="relative min-h-[460px] sm:min-h-[580px] md:min-h-[660px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto"
            >
              {currentImages.map((image, idx) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  {/* Crisp Vibrant Electric Blue Border Frame (Exact Match to Reference) */}
                  <div className="relative w-full aspect-[1/1] sm:aspect-[4/5] md:aspect-[1/1] bg-black border-[2.5px] sm:border-[3px] border-[#0066FF] shadow-[0_0_16px_rgba(0,102,255,0.22)] overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_28px_rgba(0,102,255,0.5)] group-hover:border-[#3388FF]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      style={{ objectPosition: image.objectPosition || "center 20%" }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />

                    {/* Subtle Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* View Fullscreen Pill */}
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-black/75 backdrop-blur-sm border border-white/20 text-[10px] font-mono tracking-widest text-white uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      VIEW FULL
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. SLIDE NAVIGATION & PAGINATION ROW (Exact Match to Screenshot 2) */}
        <div className="relative max-w-4xl mx-auto mt-8 sm:mt-12 mb-4">
          <div className="flex items-center justify-between">
            {/* Left Bracket: Vertical bar on left + horizontal bar below (Matching Screenshot 2) */}
            <div className="relative w-12 sm:w-16 h-8 pointer-events-none hidden xs:block sm:block">
              <span className="absolute left-0 top-0 w-[2.5px] h-6 bg-white" />
              <span className="absolute left-0 bottom-0 w-10 sm:w-14 h-[2.5px] bg-white" />
            </div>

            {/* Center Controls: Left Arrow, Pagination Dots, Right Arrow */}
            <div className="flex items-center justify-center space-x-6 sm:space-x-8 mx-auto">
              {/* Previous Arrow Button */}
              <button
                onClick={prevSlide}
                aria-label="Previous Transformations"
                className="text-white/80 hover:text-white hover:scale-125 active:scale-90 transition-all p-2 focus:outline-none group cursor-pointer"
              >
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:-translate-x-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>

              {/* Pagination Dots (Active dot has outer ring circle with center dot ⊚ matching reference) */}
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                {Array.from({ length: totalSlides }).map((_, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className="p-1.5 focus:outline-none group flex items-center justify-center cursor-pointer"
                    >
                      {isActive ? (
                        /* Active Dot: Outer Ring with Inner Dot ⊚ */
                        <span className="w-3.5 h-3.5 rounded-full border-[1.5px] border-white flex items-center justify-center transition-all duration-300">
                          <span className="w-1.5 h-1.5 bg-white rounded-full" />
                        </span>
                      ) : (
                        /* Inactive Dot: Solid Small White Dot */
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white group-hover:scale-125 transition-all duration-200" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next Arrow Button */}
              <button
                onClick={nextSlide}
                aria-label="Next Transformations"
                className="text-white/80 hover:text-white hover:scale-125 active:scale-90 transition-all p-2 focus:outline-none group cursor-pointer"
              >
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>

            {/* Right Bracket: Vertical bar on right + horizontal bar below (Matching Screenshot 2) */}
            <div className="relative w-12 sm:w-16 h-8 pointer-events-none hidden xs:block sm:block">
              <span className="absolute right-0 top-0 w-[2.5px] h-6 bg-white" />
              <span className="absolute right-0 bottom-0 w-10 sm:w-14 h-[2.5px] bg-white" />
            </div>
          </div>

          {/* Bottom High-Impact CTA Button */}
          <div className="mt-10 sm:mt-12 text-center">
            <div className="tactical-bracket-btn inline-block">
              <button
                type="button"
                onClick={openApplicationModal}
                className="px-8 sm:px-12 py-4 bg-khaki text-near-black font-geo font-bold text-xs sm:text-sm tracking-[0.2em] uppercase clip-chamfer-btn hover:bg-off-white hover:text-near-black transition-all duration-300 shadow-glow-khaki cursor-pointer inline-block"
              >
                APPLY FOR YOUR TRANSFORMATION
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM INVERTED NOTCHED BLUE CONTOUR ACCENT (Exact Match to Screenshot 2) */}
      <div className="w-full overflow-hidden leading-none z-20 -mb-[1px]">
        <svg
          viewBox="0 0 1200 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-14 md:h-16 lg:h-20 block"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="blueNotchBottomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B0D09" />
              <stop offset="10%" stopColor="#002277" />
              <stop offset="25%" stopColor="#0066FF" />
              <stop offset="50%" stopColor="#0077FF" />
              <stop offset="75%" stopColor="#0066FF" />
              <stop offset="90%" stopColor="#002277" />
              <stop offset="100%" stopColor="#0B0D09" />
            </linearGradient>
          </defs>

          {/* Dark fill below the notch */}
          <path
            d="M0,56 L1200,56 L1200,48 L870,48 L790,10 L410,10 L330,48 L0,48 Z"
            fill="#0B0D09"
          />

          {/* Glowing Electric Blue Notch Contour Line */}
          <path
            d="M-10,48 L330,48 L410,10 L790,10 L870,48 L1210,48"
            stroke="url(#blueNotchBottomGrad)"
            strokeWidth="11"
            strokeLinejoin="miter"
            fill="none"
          />
        </svg>
      </div>

      {/* 6. LIGHTBOX MODAL (Click any image to view in high resolution) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl max-h-[90vh] bg-black border-2 border-[#0066FF] shadow-[0_0_40px_rgba(0,102,255,0.5)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-[#0066FF] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
