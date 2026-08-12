"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/context/ModalContext";
import { COACH_WHATSAPP_NUMBER } from "@/data/siteData";
import {
  X,
  Send,
  CheckCircle2,
  Dumbbell,
  User,
  Utensils,
  HeartPulse,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Copy,
  Clock,
  MapPin,
  Flame,
  CreditCard,
  Check,
  ShieldCheck,
  Zap,
} from "lucide-react";

const PRICING_OPTIONS = [
  {
    id: "4-weeks",
    name: "4 WEEKS",
    price: "6,999",
    numericPrice: 6999,
    title: "Sprint Kickstart",
    duration: "4 Weeks",
    durationLabel: "4 WEEKS DURATION",
    badge: null,
    highlight: "Fat loss kickstart & diet reset",
  },
  {
    id: "8-weeks",
    name: "8 WEEKS",
    price: "12,999",
    numericPrice: 12999,
    title: "Optimal Transformation",
    duration: "8 Weeks",
    durationLabel: "8 WEEKS DURATION",
    badge: "MOST POPULAR",
    highlight: "Full recomposition & muscle gain",
  },
  {
    id: "12-weeks",
    name: "12 WEEKS",
    price: "18,999",
    numericPrice: 18999,
    title: "Complete Mastery",
    duration: "12 Weeks",
    durationLabel: "12 WEEKS DURATION",
    badge: "BEST VALUE",
    highlight: "Max results & lifestyle mastery",
  },
];

export default function ApplicationModal() {
  const { isApplicationOpen, closeApplicationModal, selectedPlan } = useModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form State matching all questions + pricing package
  const [formData, setFormData] = useState({
    // Step 1: Package & Personal & Batch Selection
    selectedPlan: "8-weeks",
    batchTiming: "Morning Batch", // "Morning Batch" | "Evening Batch" | "Flexible / Either"
    fullName: "",
    email: "",
    contactNumber: "",
    ageWeightHeight: "",

    // Step 2: Training & Goals
    strengthYears: "",
    specificGoal: "",
    cardioHistory: "",
    strengths: "",
    weakPoints: "",
    gymTimings: "",
    activityLevel: "lightly active", // "lightly active" | "Sedentary" | "Very active"

    // Step 3: Nutrition & Health
    mealsPerDay: "5", // "8" | "6" | "5" | "Other"
    foodOptions: "Non veg", // "veg" | "Non veg" | "Eggetarian" | "Other"
    foodOptionsOther: "",
    weeklyMealBudget: "",
    dislikedFoods: "",
    healthConditions: "",
    alcoholSmoke: "None of the above", // "Both" | "Only Alcohol" | "Only Smoke" | "None of the above"
  });

  // Sync selected plan from ModalContext whenever modal opens or context state changes
  useEffect(() => {
    if (typeof selectedPlan === "string" && selectedPlan.trim()) {
      const planStr = selectedPlan.trim().toLowerCase();
      const match = PRICING_OPTIONS.find(
        (p) => p.id === selectedPlan || planStr.includes(p.id) || planStr.includes(p.name.toLowerCase())
      );
      if (match) {
        setFormData((prev) => ({
          ...prev,
          selectedPlan: match.id,
        }));
      }
    }
  }, [selectedPlan, isApplicationOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isApplicationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isApplicationOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isApplicationOpen) {
        closeApplicationModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isApplicationOpen, closeApplicationModal]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Current active plan object
  const activePlan = useMemo(() => {
    return (
      PRICING_OPTIONS.find((p) => p.id === formData.selectedPlan) ||
      PRICING_OPTIONS[1]
    );
  }, [formData.selectedPlan]);

  // Slider Index (0 = 4w, 1 = 8w, 2 = 12w)
  const currentPlanIndex = useMemo(() => {
    const idx = PRICING_OPTIONS.findIndex((p) => p.id === formData.selectedPlan);
    return idx >= 0 ? idx : 1;
  }, [formData.selectedPlan]);

  const handleSliderChange = (e) => {
    const idx = parseInt(e.target.value, 10);
    const chosen = PRICING_OPTIONS[idx];
    if (chosen) {
      handleChange("selectedPlan", chosen.id);
    }
  };

  const handlePlanSelect = (planId) => {
    handleChange("selectedPlan", planId);
  };

  // WhatsApp Message Generator
  const generateWhatsAppMessage = () => {
    const foodPref =
      formData.foodOptions === "Other" && formData.foodOptionsOther
        ? `Other (${formData.foodOptionsOther})`
        : formData.foodOptions;

    return `🔥 *NEW COACHING APPLICATION: AISH MEHAN* 🔥
🏆 *PROGRAM:* 1-on-1 Online Transformation Coaching
💳 *SELECTED PACKAGE:* ${activePlan.name} - ₹${activePlan.price} INR (${activePlan.title})
⏰ *PREFERRED BATCH:* ${formData.batchTiming}

━━━━━━━━━━━━━━━━━━━━
👤 *1. APPLICANT DETAILS*
• *Full Name:* ${formData.fullName.trim() || "Not specified"}
• *Contact Number:* ${formData.contactNumber.trim() || "Not specified"}
• *Email:* ${formData.email.trim() || "Not specified"}
• *Age / Weight / Height:* ${formData.ageWeightHeight.trim() || "Not specified"}

━━━━━━━━━━━━━━━━━━━━
🏋️ *2. TRAINING & GOALS*
• *Strength Training Exp:* ${formData.strengthYears.trim() || "Not specified"}
• *Specific Goal (Bodybuilding):* ${formData.specificGoal.trim() || "Not specified"}
• *Cardio History / Regularity:* ${formData.cardioHistory.trim() || "Not specified"}
• *Strengths:* ${formData.strengths.trim() || "Not specified"}
• *Weak Points:* ${formData.weakPoints.trim() || "Not specified"}
• *Gym Timings:* ${formData.gymTimings.trim() || "Not specified"}
• *Daily Activity Level:* ${formData.activityLevel}

━━━━━━━━━━━━━━━━━━━━
🥗 *3. NUTRITION & LIFESTYLE*
• *Food Options:* ${foodPref}
• *Daily Meals:* ${formData.mealsPerDay} meals
• *Weekly Meal Budget:* ${formData.weeklyMealBudget.trim() || "Not specified"}
• *Foods Not Eaten:* ${formData.dislikedFoods.trim() || "None"}
• *Alcohol / Smoking:* ${formData.alcoholSmoke}

━━━━━━━━━━━━━━━━━━━━
🩺 *4. HEALTH & INJURIES*
• *Past Injuries / Health Conditions:* ${formData.healthConditions.trim() || "None"}

━━━━━━━━━━━━━━━━━━━━
⚡ *Applied via Aish Mehan Official Website*`;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    // Validation for basic required fields
    if (!formData.contactNumber || !formData.email) {
      setCurrentStep(1);
      alert("Please provide at least your Contact Number and Email.");
      return;
    }

    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${COACH_WHATSAPP_NUMBER}&text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsSubmitted(true);
  };

  const copyToClipboard = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
  };

  if (!isApplicationOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeApplicationModal}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-near-black border-2 border-muted-olive/60 shadow-2xl overflow-hidden z-10 my-auto rounded-none tactical-texture"
        >
          {/* Top Header Strip */}
          <div className="bg-deep-olive border-b border-muted-olive/50 px-5 sm:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 bg-khaki rounded-full animate-pulse" />
              <div>
                <h3 className="font-geo text-sm sm:text-base font-black tracking-widest text-off-white uppercase">
                  1-ON-1 COACHING // INTAKE APPLICATION
                </h3>
                <p className="text-[11px] font-mono text-khaki uppercase tracking-wider flex items-center space-x-2">
                  <span>HEAD COACH: DIVESH MEHAN</span>
                  <span>•</span>
                  <span>{activePlan.name} PROTOCOL (₹{activePlan.price} INR)</span>
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={closeApplicationModal}
              className="p-1.5 text-off-white/70 hover:text-khaki hover:bg-near-black/50 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
            {!isSubmitted ? (
              <>
                {/* Step Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs font-mono tracking-wider text-off-white/60 mb-2">
                    <span className={currentStep >= 1 ? "text-khaki font-bold" : ""}>
                      01. PACKAGE & DETAILS
                    </span>
                    <span className={currentStep >= 2 ? "text-khaki font-bold" : ""}>
                      02. TRAINING & GOALS
                    </span>
                    <span className={currentStep >= 3 ? "text-khaki font-bold" : ""}>
                      03. NUTRITION & HEALTH
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-deep-olive flex">
                    <div
                      className={`h-full bg-khaki transition-all duration-300 ${
                        currentStep === 1
                          ? "w-1/3"
                          : currentStep === 2
                          ? "w-2/3"
                          : "w-full"
                      }`}
                    />
                  </div>
                </div>

                {/* STEP 1: Package Selection, Personal, Batch Timing & Biometrics */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-2 text-khaki font-geo text-sm font-bold uppercase tracking-wider mb-1">
                      <User className="w-4 h-4" />
                      <span>STEP 1: SELECT PACKAGE & ENTER DETAILS</span>
                    </div>

                    {/* ====================================================
                        1. INTERACTIVE PRICING PACKAGE SLIDER & SELECTOR
                       ==================================================== */}
                    <div className="bg-deep-olive/80 border-2 border-khaki/60 p-4 sm:p-5 clip-chamfer-btn shadow-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs sm:text-sm font-geo font-black uppercase tracking-wider text-khaki flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-khaki" />
                          <span>CHOOSE TRANSFORMATION PACKAGE *</span>
                        </label>
                        <span className="text-[10px] font-mono tracking-widest text-khaki bg-near-black px-2 py-0.5 border border-khaki/40 uppercase">
                          {activePlan.badge || "DIRECT 1-ON-1"}
                        </span>
                      </div>

                      {/* Visual Range Slider */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between text-[11px] font-mono text-off-white/80">
                          <span className="text-off-white/60">SLIDE TO SELECT DURATION:</span>
                          <span className="text-khaki font-bold uppercase tracking-wider">
                            {activePlan.name} (₹{activePlan.price} INR)
                          </span>
                        </div>

                        <div className="relative flex items-center px-1">
                          <input
                            type="range"
                            min="0"
                            max="2"
                            step="1"
                            value={currentPlanIndex}
                            onChange={handleSliderChange}
                            aria-label="Select Coaching Duration"
                            className="w-full h-2.5 bg-near-black rounded-lg appearance-none cursor-pointer accent-[#B5A878] border border-muted-olive/60 focus:outline-none"
                          />
                        </div>

                        <div className="flex justify-between text-[10px] font-mono tracking-wider text-off-white/60 px-1">
                          <span className={currentPlanIndex === 0 ? "text-khaki font-bold" : ""}>
                            4 WEEKS
                          </span>
                          <span className={currentPlanIndex === 1 ? "text-khaki font-bold" : ""}>
                            8 WEEKS (POPULAR)
                          </span>
                          <span className={currentPlanIndex === 2 ? "text-khaki font-bold" : ""}>
                            12 WEEKS (BEST VALUE)
                          </span>
                        </div>
                      </div>

                      {/* 3 Clickable Option Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                        {PRICING_OPTIONS.map((opt, idx) => {
                          const isSelected = formData.selectedPlan === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handlePlanSelect(opt.id)}
                              className={`p-3 text-left border transition-all cursor-pointer relative flex flex-col justify-between ${
                                isSelected
                                  ? "bg-khaki text-near-black border-khaki shadow-glow-khaki font-bold"
                                  : "bg-near-black/80 text-off-white border-muted-olive/50 hover:border-khaki/60"
                              }`}
                            >
                              {opt.badge && (
                                <span
                                  className={`absolute -top-2 right-2 px-1.5 py-0.5 text-[8.5px] font-geo font-black tracking-wider uppercase ${
                                    isSelected
                                      ? "bg-near-black text-khaki border border-near-black"
                                      : "bg-khaki text-near-black"
                                  }`}
                                >
                                  {opt.badge}
                                </span>
                              )}
                              <div>
                                <div className="flex items-center justify-between mb-0.5">
                                  <span
                                    className={`font-geo text-sm font-black uppercase ${
                                      isSelected ? "text-near-black" : "text-off-white"
                                    }`}
                                  >
                                    {opt.name}
                                  </span>
                                </div>
                                <div className="flex items-baseline space-x-1">
                                  <span className="text-xs font-mono">₹</span>
                                  <span className="text-lg font-geo font-black leading-none">
                                    {opt.price}
                                  </span>
                                  <span className="text-[10px] font-mono">INR</span>
                                </div>
                              </div>
                              <span
                                className={`text-[10px] font-sans mt-2 block leading-tight ${
                                  isSelected
                                    ? "text-near-black/90 font-medium"
                                    : "text-off-white/60"
                                }`}
                              >
                                {opt.highlight}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Deliverables summary note */}
                      <div className="pt-2 border-t border-muted-olive/30 text-[11px] font-mono text-khaki/90 flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-khaki" />
                        <span>
                          Includes Custom Diet (Veg/Non-Veg), Weekly Workouts, WhatsApp & Video Support.
                        </span>
                      </div>
                    </div>

                    {/* Preferred Batch Timing */}
                    <div className="bg-deep-olive/60 border border-khaki/40 p-4 clip-chamfer-btn">
                      <label className="block text-xs font-geo font-bold uppercase tracking-wider text-khaki mb-2 flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>PREFERRED BATCH TIMING *</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {["Morning Batch", "Evening Batch", "Flexible / Either"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleChange("batchTiming", opt)}
                            className={`px-3 py-2.5 text-xs font-geo font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                              formData.batchTiming === opt
                                ? "bg-khaki text-near-black border-khaki shadow-glow-khaki"
                                : "bg-near-black/70 text-off-white border-muted-olive/40 hover:border-khaki/60"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full px-4 py-3 bg-deep-olive/80 border border-muted-olive/50 text-off-white placeholder-off-white/30 text-sm focus:outline-none focus:border-khaki transition-colors"
                      />
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                        Contact / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.contactNumber}
                        onChange={(e) => handleChange("contactNumber", e.target.value)}
                        className="w-full px-4 py-3 bg-deep-olive/80 border border-muted-olive/50 text-off-white placeholder-off-white/30 text-sm focus:outline-none focus:border-khaki transition-colors"
                      />
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        className="w-full px-4 py-3 bg-deep-olive/80 border border-muted-olive/50 text-off-white placeholder-off-white/30 text-sm focus:outline-none focus:border-khaki transition-colors"
                      />
                    </div>

                    {/* Age, Weight and Height */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                        Mention your Age, Weight and Height
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 26 yrs, 78 kg, 5ft 10in"
                        value={formData.ageWeightHeight}
                        onChange={(e) => handleChange("ageWeightHeight", e.target.value)}
                        className="w-full px-4 py-3 bg-deep-olive/80 border border-muted-olive/50 text-off-white placeholder-off-white/30 text-sm focus:outline-none focus:border-khaki transition-colors"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Training & Physical Goals */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center space-x-2 text-khaki font-geo text-sm font-bold uppercase tracking-wider mb-2">
                      <Dumbbell className="w-4 h-4" />
                      <span>STEP 2: TRAINING EXPERIENCE & GOALS</span>
                    </div>

                    {/* Strength Training Years */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                        Since how many years you have been training for strength?
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2 years, Beginner, etc."
                        value={formData.strengthYears}
                        onChange={(e) => handleChange("strengthYears", e.target.value)}
                        className="w-full px-4 py-3 bg-deep-olive/80 border border-muted-olive/50 text-off-white placeholder-off-white/30 text-sm focus:outline-none focus:border-khaki transition-colors"
                      />
                    </div>

                    {/* Specific Goal */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                        What is your specific goal when it comes to bodybuilding?
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Fat loss, Lean muscle gain, Stage prep, Strength benchmark"
                        value={formData.specificGoal}
                        onChange={(e) => handleChange("specificGoal", e.target.value)}
                        className="w-full px-4 py-3 bg-deep-olive/80 border border-muted-olive/50 text-off-white placeholder-off-white/30 text-sm focus:outline-none focus:border-khaki transition-colors"
                      />
                    </div>

                    {/* Cardio History */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                        What is your Cardio history? Have you been doing it regularly?
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 3x weekly running, HIIT, or rarely"
                        value={formData.cardioHistory}
                        onChange={(e) => handleChange("cardioHistory", e.target.value)}
                        className="w-full px-4 py-3 bg-deep-olive/80 border border-muted-olive/50 text-off-white placeholder-off-white/30 text-sm focus:outline-none focus:border-khaki transition-colors"
                      />
                    </div>

                    {/* Strengths & Weak Points Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                          What are your Strengths?
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Consistency, Legs, Back"
                          value={formData.strengths}
                          onChange={(e) => handleChange("strengths", e.target.value)}
                          className="w-full px-4 py-3 bg-deep-olive/80 border border-muted-olive/50 text-off-white placeholder-off-white/30 text-sm focus:outline-none focus:border-khaki transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                          Mention your weak points, according to you.
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Diet adherence, Shoulders"
                          value={formData.weakPoints}
                          onChange={(e) => handleChange("weakPoints", e.target.value)}
                          className="w-full px-4 py-3 bg-deep-olive/80 border border-muted-olive/50 text-off-white placeholder-off-white/30 text-sm focus:outline-none focus:border-khaki transition-colors"
                        />
                      </div>
                    </div>

                    {/* Gym Timings */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                        What is your gym timings?
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 6:00 AM - 7:30 AM or 7:00 PM - 8:30 PM"
                        value={formData.gymTimings}
                        onChange={(e) => handleChange("gymTimings", e.target.value)}
                        className="w-full px-4 py-3 bg-deep-olive/80 border border-muted-olive/50 text-off-white placeholder-off-white/30 text-sm focus:outline-none focus:border-khaki transition-colors"
                      />
                    </div>

                    {/* Activity Level */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-2">
                        Mention your daily activity level:
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {["lightly active", "Sedentary", "Very active"].map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => handleChange("activityLevel", lvl)}
                            className={`px-3 py-2 text-xs font-geo font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                              formData.activityLevel === lvl
                                ? "bg-khaki text-near-black border-khaki font-black"
                                : "bg-deep-olive/80 text-off-white border-muted-olive/50 hover:border-khaki/50"
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Nutrition, Lifestyle & Health */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center space-x-2 text-khaki font-geo text-sm font-bold uppercase tracking-wider mb-2">
                      <Utensils className="w-4 h-4" />
                      <span>STEP 3: NUTRITION, LIFESTYLE & HEALTH</span>
                    </div>

                    {/* Food Options */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-2">
                        Food options:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {["veg", "Non veg", "Eggetarian", "Other"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleChange("foodOptions", opt)}
                            className={`px-3 py-2 text-xs font-geo font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                              formData.foodOptions === opt
                                ? "bg-khaki text-near-black border-khaki font-black"
                                : "bg-deep-olive/80 text-off-white border-muted-olive/50 hover:border-khaki/50"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Daily Meals Count */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-2">
                        How many meals can you consume throughout the day?
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {["8", "6", "5"].map((count) => (
                          <button
                            key={count}
                            type="button"
                            onClick={() => handleChange("mealsPerDay", count)}
                            className={`px-4 py-2 text-xs font-geo font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                              formData.mealsPerDay === count
                                ? "bg-khaki text-near-black border-khaki font-black"
                                : "bg-deep-olive/80 text-off-white border-muted-olive/50 hover:border-khaki/50"
                            }`}
                          >
                            {count} Meals
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Meal Budget & Disliked Foods */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                          How much you want to spend on meals per week?
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. ₹2000 - ₹3000 / week"
                          value={formData.weeklyMealBudget}
                          onChange={(e) => handleChange("weeklyMealBudget", e.target.value)}
                          className="w-full px-4 py-3 bg-deep-olive/80 border border-muted-olive/50 text-off-white placeholder-off-white/30 text-sm focus:outline-none focus:border-khaki transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                          List of foods you don&apos;t eat at all:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Dairy, Seafood, etc."
                          value={formData.dislikedFoods}
                          onChange={(e) => handleChange("dislikedFoods", e.target.value)}
                          className="w-full px-4 py-3 bg-deep-olive/80 border border-muted-olive/50 text-off-white placeholder-off-white/30 text-sm focus:outline-none focus:border-khaki transition-colors"
                        />
                      </div>
                    </div>

                    {/* Past Injuries or Current Health Conditions */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                        Past injuries or any current health conditions:
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Lower back pain, shoulder impingement, or None"
                        value={formData.healthConditions}
                        onChange={(e) => handleChange("healthConditions", e.target.value)}
                        className="w-full px-4 py-3 bg-deep-olive/80 border border-muted-olive/50 text-off-white placeholder-off-white/30 text-sm focus:outline-none focus:border-khaki transition-colors"
                      />
                    </div>

                    {/* Alcohol or Smoke */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-2">
                        Do you Drink Alcohol or Smoke?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {["Both", "Only Alcohol", "Only Smoke", "None of the above"].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => handleChange("alcoholSmoke", item)}
                            className={`px-3 py-2 text-xs font-geo font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                              formData.alcoholSmoke === item
                                ? "bg-khaki text-near-black border-khaki font-black"
                                : "bg-deep-olive/80 text-off-white border-muted-olive/50 hover:border-khaki/50"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Modal Navigation Buttons */}
                <div className="mt-8 pt-5 border-t border-muted-olive/40 flex items-center justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="px-5 py-2.5 bg-deep-olive text-off-white font-geo font-bold text-xs uppercase tracking-widest border border-muted-olive hover:border-khaki transition-colors flex items-center space-x-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>BACK</span>
                    </button>
                  ) : (
                    <span />
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (currentStep === 1 && (!formData.contactNumber || !formData.email)) {
                          alert("Please fill in your Email and Contact Number to proceed.");
                          return;
                        }
                        setCurrentStep((prev) => prev + 1);
                      }}
                      className="px-7 py-3 bg-khaki text-near-black font-geo font-black text-xs sm:text-sm uppercase tracking-widest clip-chamfer-btn hover:bg-off-white transition-all duration-200 flex items-center space-x-2 cursor-pointer shadow-glow-khaki"
                    >
                      <span>NEXT STEP</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-8 py-3.5 bg-khaki text-near-black font-geo font-black text-sm uppercase tracking-widest clip-chamfer-btn hover:bg-off-white transition-all duration-200 flex items-center space-x-2 cursor-pointer shadow-glow-khaki"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT VIA WHATSAPP →</span>
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Success / Submission Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-6"
              >
                <div className="w-16 h-16 bg-khaki/20 border-2 border-khaki rounded-full flex items-center justify-center mx-auto text-khaki">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h4 className="font-geo text-2xl sm:text-3xl font-black text-off-white uppercase tracking-tight mb-2">
                    APPLICATION READY FOR COACHING!
                  </h4>
                  <p className="text-sm text-off-white/80 max-w-md mx-auto leading-relaxed">
                    Your details and selected package have been formatted. WhatsApp has been opened to send your application directly to Coach Divesh Mehan.
                  </p>
                </div>

                <div className="bg-deep-olive/80 border border-muted-olive/60 p-4 text-left max-w-md mx-auto text-xs font-mono text-off-white/90 space-y-1.5">
                  <p className="text-khaki font-bold uppercase">Application Summary:</p>
                  <p>• Package: {activePlan.name} (₹{activePlan.price} INR - {activePlan.title})</p>
                  <p>• Timing: {formData.batchTiming}</p>
                  <p>• Applicant: {formData.fullName || "Applicant"}</p>
                  <p>• Contact: {formData.contactNumber}</p>
                  <p>• Email: {formData.email}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto px-6 py-3 bg-khaki text-near-black font-geo font-bold text-xs uppercase tracking-widest clip-chamfer-btn hover:bg-off-white transition-colors cursor-pointer"
                  >
                    RE-OPEN WHATSAPP
                  </button>

                  <button
                    onClick={copyToClipboard}
                    className="w-full sm:w-auto px-6 py-3 bg-deep-olive border border-muted-olive text-off-white font-geo font-bold text-xs uppercase tracking-widest hover:border-khaki transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied ? "COPIED TO CLIPBOARD!" : "COPY MESSAGE"}</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-muted-olive/30">
                  <button
                    onClick={closeApplicationModal}
                    className="text-xs font-mono text-off-white/60 hover:text-khaki uppercase tracking-widest cursor-pointer"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
