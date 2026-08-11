"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

export default function ApplicationModal() {
  const { isApplicationOpen, closeApplicationModal } = useModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form State matching all Google Form questions from screenshots + batch timing
  const [formData, setFormData] = useState({
    // Step 1: Personal & Batch Selection
    fullName: "",
    email: "",
    contactNumber: "",
    ageWeightHeight: "",
    batchTiming: "Morning Batch", // "Morning Batch" | "Evening Batch" | "Flexible / Either"

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

  // WhatsApp Message Generator
  const generateWhatsAppMessage = () => {
    const foodPref =
      formData.foodOptions === "Other" && formData.foodOptionsOther
        ? `Other (${formData.foodOptionsOther})`
        : formData.foodOptions;

    return `🔥 *NEW COACHING APPLICATION: JALANDHAR BATCH* 🔥
📍 *LOCATION:* Old Skool Gym, Jalandhar
⚡ *PROGRAM:* First-Ever Fitness Workshop (25 Spots Only)
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
                  JALANDHAR BATCH // INTAKE APPLICATION
                </h3>
                <p className="text-[11px] font-mono text-khaki uppercase tracking-wider flex items-center space-x-2">
                  <span>OLD SKOOL GYM, JALANDHAR</span>
                  <span>•</span>
                  <span>25 SPOTS ONLY</span>
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
                      01. PERSONAL & BATCH
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

                {/* STEP 1: Personal, Batch Timing & Biometrics */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center space-x-2 text-khaki font-geo text-sm font-bold uppercase tracking-wider mb-2">
                      <User className="w-4 h-4" />
                      <span>STEP 1: PERSONAL DETAILS & BATCH TIMING</span>
                    </div>

                    {/* Preferred Batch Timing (Requested Addition) */}
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
                    APPLICATION READY FOR JALANDHAR BATCH!
                  </h4>
                  <p className="text-sm text-off-white/80 max-w-md mx-auto leading-relaxed">
                    Your details have been formatted for the head coach. WhatsApp has been opened to send your application directly.
                  </p>
                </div>

                <div className="bg-deep-olive/80 border border-muted-olive/60 p-4 text-left max-w-md mx-auto text-xs font-mono text-off-white/90 space-y-1.5">
                  <p className="text-khaki font-bold uppercase">Application Summary:</p>
                  <p>• Program: Jalandhar Batch (Old Skool Gym)</p>
                  <p>• Timing: {formData.batchTiming}</p>
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
