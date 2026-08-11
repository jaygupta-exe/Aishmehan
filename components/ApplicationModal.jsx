"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/context/ModalContext";
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
  ExternalLink,
} from "lucide-react";

export default function ApplicationModal() {
  const { isApplicationOpen, closeApplicationModal } = useModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form State matching all Google Form questions
  const [formData, setFormData] = useState({
    // Step 1: Personal & Biometrics
    fullName: "",
    contactNumber: "",
    email: "",
    ageWeightHeight: "",

    // Step 2: Training & Physical Goals
    strengthYears: "",
    specificGoal: "",
    cardioHistory: "",
    activityLevel: "lightly active", // "lightly active" | "Sedentary" | "Very active"
    gymTimings: "",
    strengths: "",
    weakPoints: "",

    // Step 3: Nutrition, Lifestyle & Health
    foodOptions: "Non veg", // "veg" | "Non veg" | "Eggetarian" | "Other"
    foodOptionsOther: "",
    mealsPerDay: "5", // "5" | "6" | "8" | "Other"
    mealsPerDayOther: "",
    weeklyMealBudget: "",
    dislikedFoods: "",
    alcoholSmoke: "None of the above", // "Both" | "Only Alcohol" | "Only Smoke" | "None of the above"
    healthConditions: "",
    pastInjuries: "",
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

    const mealsCount =
      formData.mealsPerDay === "Other" && formData.mealsPerDayOther
        ? `${formData.mealsPerDayOther} meals`
        : `${formData.mealsPerDay} meals`;

    return `🔥 *NEW COACHING APPLICATION - AISH MEHAN FITNESS* 🔥

━━━━━━━━━━━━━━━━━━━━
👤 *1. APPLICANT DETAILS*
• *Name:* ${formData.fullName.trim() || "Not specified"}
• *WhatsApp Number:* ${formData.contactNumber.trim() || "Not specified"}
• *Email:* ${formData.email.trim() || "Not specified"}
• *Age / Weight / Height:* ${formData.ageWeightHeight.trim() || "Not specified"}

━━━━━━━━━━━━━━━━━━━━
🏋️ *2. TRAINING & BODYBUILDING GOALS*
• *Strength Training Exp:* ${formData.strengthYears.trim() || "Not specified"}
• *Specific Goal:* ${formData.specificGoal.trim() || "Not specified"}
• *Cardio History / Regularity:* ${formData.cardioHistory.trim() || "Not specified"}
• *Daily Activity Level:* ${formData.activityLevel}
• *Gym Timings:* ${formData.gymTimings.trim() || "Not specified"}
• *Strengths:* ${formData.strengths.trim() || "Not specified"}
• *Weak Points:* ${formData.weakPoints.trim() || "Not specified"}

━━━━━━━━━━━━━━━━━━━━
🥗 *3. NUTRITION & LIFESTYLE*
• *Food Preference:* ${foodPref}
• *Daily Meals:* ${mealsCount}
• *Weekly Meal Budget:* ${formData.weeklyMealBudget.trim() || "Not specified"}
• *Foods Not Eaten:* ${formData.dislikedFoods.trim() || "None"}
• *Alcohol / Smoke:* ${formData.alcoholSmoke}

━━━━━━━━━━━━━━━━━━━━
🩺 *4. HEALTH & MEDICAL HISTORY*
• *Current Health Conditions:* ${formData.healthConditions.trim() || "None"}
• *Past Injuries:* ${formData.pastInjuries.trim() || "None"}

━━━━━━━━━━━━━━━━━━━━
⚡ *Applied via Aish Mehan Official Portal*`;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    // Verification check for basic required fields
    if (!formData.fullName || !formData.contactNumber || !formData.email) {
      setCurrentStep(1);
      alert("Please provide at least your Full Name, Contact Number, and Email.");
      return;
    }

    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919779159169&text=${encodedMessage}`;

    // Save submission locally in case user wants to review
    try {
      localStorage.setItem("aishmehan_last_application", JSON.stringify(formData));
    } catch {
      // LocalStorage fallback
    }

    // Open WhatsApp
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
        {/* Dark Backdrop with Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeApplicationModal}
          className="fixed inset-0 bg-near-black/90 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-3xl bg-[#11140E] border-2 border-muted-olive/50 rounded-none shadow-[0_0_50px_rgba(0,0,0,0.9)] z-10 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Tactical Corner Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-khaki pointer-events-none z-20" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-khaki pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-khaki pointer-events-none z-20" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-khaki pointer-events-none z-20" />

          {/* Modal Header */}
          <div className="relative bg-gradient-to-r from-deep-olive via-[#161B12] to-deep-olive border-b border-muted-olive/40 px-5 sm:px-8 py-5 flex items-start justify-between flex-shrink-0">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-khaki animate-ping" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-khaki uppercase font-bold">
                  DIRECT INTAKE PROTOCOL // 1-ON-1 COACHING
                </span>
              </div>
              <h2 className="font-geo text-xl sm:text-3xl font-bold tracking-tight text-off-white uppercase leading-tight">
                INFORMATION REGARDING FITNESS
              </h2>
              <p className="text-xs sm:text-sm text-off-white/70 mt-1 font-sans">
                Fill your training profile below. It goes directly to Coach Aish Mehan via WhatsApp.
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={closeApplicationModal}
              className="p-2 -mr-2 text-off-white/60 hover:text-khaki hover:bg-white/5 transition-colors rounded-none border border-transparent hover:border-muted-olive/40"
              aria-label="Close application form"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {!isSubmitted ? (
            <>
              {/* Step Progress Tracker */}
              <div className="bg-near-black/80 border-b border-muted-olive/20 px-5 sm:px-8 py-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  {[
                    { num: 1, label: "Biometrics", icon: User },
                    { num: 2, label: "Training & Goals", icon: Dumbbell },
                    { num: 3, label: "Nutrition & Health", icon: Utensils },
                  ].map((step) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.num;
                    const isCompleted = currentStep > step.num;
                    return (
                      <button
                        key={step.num}
                        onClick={() => setCurrentStep(step.num)}
                        className={`flex items-center space-x-2 text-xs font-geo font-bold uppercase transition-colors ${
                          isActive
                            ? "text-khaki"
                            : isCompleted
                            ? "text-off-white hover:text-khaki"
                            : "text-off-white/40 hover:text-off-white/60"
                        }`}
                      >
                        <span
                          className={`w-6 h-6 flex items-center justify-center text-[11px] font-mono border ${
                            isActive
                              ? "bg-khaki text-near-black border-khaki font-bold"
                              : isCompleted
                              ? "bg-army-olive/40 text-khaki border-muted-olive"
                              : "border-muted-olive/30 text-off-white/40"
                          }`}
                        >
                          {step.num}
                        </span>
                        <span className="hidden sm:inline">{step.label}</span>
                      </button>
                    );
                  })}
                </div>

                <span className="text-[11px] font-mono text-khaki/80">
                  STEP {currentStep} OF 3
                </span>
              </div>

              {/* Form Content Area */}
              <form
                onSubmit={handleSubmit}
                className="overflow-y-auto px-5 sm:px-8 py-6 space-y-6 flex-1 custom-modal-scrollbar"
              >
                {/* STEP 1: Personal & Biometrics */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="border-l-2 border-khaki pl-3 mb-2">
                      <h3 className="font-geo text-sm tracking-wider uppercase text-off-white font-bold">
                        Phase 01: Applicant Identification & Biometrics
                      </h3>
                      <p className="text-xs text-off-white/60">
                        Essential credentials so Aish Mehan can review your intake profile.
                      </p>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-khaki">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        className="w-full bg-[#181E14] border border-muted-olive/60 focus:border-khaki focus:outline-none px-4 py-3 text-sm text-off-white placeholder:text-off-white/30 transition-colors"
                      />
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-1.5">
                        Enter your Contact Number (WhatsApp) <span className="text-khaki">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.contactNumber}
                        onChange={(e) => handleChange("contactNumber", e.target.value)}
                        className="w-full bg-[#181E14] border border-muted-olive/60 focus:border-khaki focus:outline-none px-4 py-3 text-sm text-off-white placeholder:text-off-white/30 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-khaki">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. yourname@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full bg-[#181E14] border border-muted-olive/60 focus:border-khaki focus:outline-none px-4 py-3 text-sm text-off-white placeholder:text-off-white/30 transition-colors"
                      />
                    </div>

                    {/* Age, Weight and Height */}
                    <div>
                      <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-1.5">
                        Mention your Age, Weight and Height <span className="text-khaki">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 26 Years, 76 Kg, 5 ft 10 in (178 cm)"
                        value={formData.ageWeightHeight}
                        onChange={(e) => handleChange("ageWeightHeight", e.target.value)}
                        className="w-full bg-[#181E14] border border-muted-olive/60 focus:border-khaki focus:outline-none px-4 py-3 text-sm text-off-white placeholder:text-off-white/30 transition-colors"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Training & Bodybuilding Goals */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="border-l-2 border-khaki pl-3 mb-2">
                      <h3 className="font-geo text-sm tracking-wider uppercase text-off-white font-bold">
                        Phase 02: Physical History & Target Objectives
                      </h3>
                      <p className="text-xs text-off-white/60">
                        Help us understand your baseline conditioning and training discipline.
                      </p>
                    </div>

                    {/* Years of Strength Training */}
                    <div>
                      <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-1.5">
                        Since How many years you have been training for strength?
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2 years / Beginner / 5+ years"
                        value={formData.strengthYears}
                        onChange={(e) => handleChange("strengthYears", e.target.value)}
                        className="w-full bg-[#181E14] border border-muted-olive/60 focus:border-khaki focus:outline-none px-4 py-3 text-sm text-off-white placeholder:text-off-white/30 transition-colors"
                      />
                    </div>

                    {/* Specific Goal in Bodybuilding */}
                    <div>
                      <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-1.5">
                        What is your specific goal when it comes to body building?
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Muscle Hypertrophy, Single-digit body fat, Stage contest prep, Posture reconstruction"
                        value={formData.specificGoal}
                        onChange={(e) => handleChange("specificGoal", e.target.value)}
                        className="w-full bg-[#181E14] border border-muted-olive/60 focus:border-khaki focus:outline-none px-4 py-3 text-sm text-off-white placeholder:text-off-white/30 transition-colors resize-none"
                      />
                    </div>

                    {/* Cardio History */}
                    <div>
                      <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-1.5">
                        What is your Cardio history? Have you been doing it regularl?
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 20 mins post-workout 3x a week / Rarely do cardio"
                        value={formData.cardioHistory}
                        onChange={(e) => handleChange("cardioHistory", e.target.value)}
                        className="w-full bg-[#181E14] border border-muted-olive/60 focus:border-khaki focus:outline-none px-4 py-3 text-sm text-off-white placeholder:text-off-white/30 transition-colors"
                      />
                    </div>

                    {/* Daily Activity Level (Radio Group) */}
                    <div>
                      <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-2">
                        Mention your daily activity level
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: "lightly active", label: "Lightly Active", desc: "Desk job with light movement" },
                          { id: "Sedentary", label: "Sedentary", desc: "Mostly sitting throughout day" },
                          { id: "Very active", label: "Very Active", desc: "High daily steps & physically demanding" },
                        ].map((opt) => (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => handleChange("activityLevel", opt.id)}
                            className={`p-3 text-left border transition-all ${
                              formData.activityLevel === opt.id
                                ? "bg-deep-olive border-khaki text-off-white shadow-glow-khaki"
                                : "bg-[#181E14] border-muted-olive/40 text-off-white/70 hover:border-muted-olive"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-geo font-bold text-xs uppercase tracking-wide">
                                {opt.label}
                              </span>
                              <span
                                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                  formData.activityLevel === opt.id
                                    ? "border-khaki bg-khaki"
                                    : "border-muted-olive/60"
                                }`}
                              >
                                {formData.activityLevel === opt.id && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-near-black" />
                                )}
                              </span>
                            </div>
                            <p className="text-[11px] text-off-white/50 leading-tight">
                              {opt.desc}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Gym Timings */}
                    <div>
                      <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-1.5">
                        What is your gym timings?
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 6:00 AM – 7:30 AM / 7:00 PM – 8:30 PM"
                        value={formData.gymTimings}
                        onChange={(e) => handleChange("gymTimings", e.target.value)}
                        className="w-full bg-[#181E14] border border-muted-olive/60 focus:border-khaki focus:outline-none px-4 py-3 text-sm text-off-white placeholder:text-off-white/30 transition-colors"
                      />
                    </div>

                    {/* Strengths & Weak Points in a 2-Col Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-1.5">
                          What are your Strengths
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Chest, Back, Discipline in workouts"
                          value={formData.strengths}
                          onChange={(e) => handleChange("strengths", e.target.value)}
                          className="w-full bg-[#181E14] border border-muted-olive/60 focus:border-khaki focus:outline-none px-4 py-2.5 text-sm text-off-white placeholder:text-off-white/30 transition-colors resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-1.5">
                          Mention your weak points, according to you
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Legs development, Diet consistency, Sweet cravings"
                          value={formData.weakPoints}
                          onChange={(e) => handleChange("weakPoints", e.target.value)}
                          className="w-full bg-[#181E14] border border-muted-olive/60 focus:border-khaki focus:outline-none px-4 py-2.5 text-sm text-off-white placeholder:text-off-white/30 transition-colors resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Nutrition, Lifestyle & Medical Clearance */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="border-l-2 border-khaki pl-3 mb-2">
                      <h3 className="font-geo text-sm tracking-wider uppercase text-off-white font-bold">
                        Phase 03: Nutrition, Lifestyle & Medical Evaluation
                      </h3>
                      <p className="text-xs text-off-white/60">
                        Precise dietary and physiological parameters for protocol creation.
                      </p>
                    </div>

                    {/* Food Options */}
                    <div>
                      <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-2">
                        Food options
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {["veg", "Non veg", "Eggetarian", "Other"].map((item) => (
                          <button
                            type="button"
                            key={item}
                            onClick={() => handleChange("foodOptions", item)}
                            className={`p-3 text-center border font-geo font-bold text-xs uppercase tracking-wider transition-all ${
                              formData.foodOptions === item
                                ? "bg-deep-olive border-khaki text-khaki shadow-glow-khaki"
                                : "bg-[#181E14] border-muted-olive/40 text-off-white/70 hover:border-muted-olive"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                      {formData.foodOptions === "Other" && (
                        <input
                          type="text"
                          placeholder="Specify your dietary preference (e.g. Vegan, Jain, Pescatarian)..."
                          value={formData.foodOptionsOther}
                          onChange={(e) => handleChange("foodOptionsOther", e.target.value)}
                          className="w-full mt-2 bg-[#181E14] border border-khaki/60 focus:border-khaki focus:outline-none px-4 py-2.5 text-sm text-off-white placeholder:text-off-white/30"
                        />
                      )}
                    </div>

                    {/* Meals Per Day */}
                    <div>
                      <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-2">
                        How many meals can you consume through out the day?
                      </label>
                      <div className="grid grid-cols-4 gap-2.5">
                        {["5", "6", "8", "Other"].map((m) => (
                          <button
                            type="button"
                            key={m}
                            onClick={() => handleChange("mealsPerDay", m)}
                            className={`py-2.5 text-center border font-geo font-bold text-xs uppercase tracking-wider transition-all ${
                              formData.mealsPerDay === m
                                ? "bg-deep-olive border-khaki text-khaki shadow-glow-khaki"
                                : "bg-[#181E14] border-muted-olive/40 text-off-white/70 hover:border-muted-olive"
                            }`}
                          >
                            {m === "Other" ? "Custom" : `${m} Meals`}
                          </button>
                        ))}
                      </div>
                      {formData.mealsPerDay === "Other" && (
                        <input
                          type="text"
                          placeholder="Enter exact number of meals (e.g. 3 or 4 meals)..."
                          value={formData.mealsPerDayOther}
                          onChange={(e) => handleChange("mealsPerDayOther", e.target.value)}
                          className="w-full mt-2 bg-[#181E14] border border-khaki/60 focus:border-khaki focus:outline-none px-4 py-2.5 text-sm text-off-white placeholder:text-off-white/30"
                        />
                      )}
                    </div>

                    {/* Weekly Meal Budget & Disliked Foods */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-1.5">
                          How much you want to spend on meals per week?
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. ₹2,500 - ₹5,000 / week"
                          value={formData.weeklyMealBudget}
                          onChange={(e) => handleChange("weeklyMealBudget", e.target.value)}
                          className="w-full bg-[#181E14] border border-muted-olive/60 focus:border-khaki focus:outline-none px-4 py-3 text-sm text-off-white placeholder:text-off-white/30 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-1.5">
                          List of foods you don&apos;t eat at all
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Fish, Dairy, Mushrooms, Pork"
                          value={formData.dislikedFoods}
                          onChange={(e) => handleChange("dislikedFoods", e.target.value)}
                          className="w-full bg-[#181E14] border border-muted-olive/60 focus:border-khaki focus:outline-none px-4 py-3 text-sm text-off-white placeholder:text-off-white/30 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Alcohol or Smoke Habits */}
                    <div>
                      <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-2">
                        Do you Drink Alcohol or Smoke?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {["Both", "Only Alcohol", "Only Smoke", "None of the above"].map((item) => (
                          <button
                            type="button"
                            key={item}
                            onClick={() => handleChange("alcoholSmoke", item)}
                            className={`p-2.5 text-center border font-geo font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all ${
                              formData.alcoholSmoke === item
                                ? "bg-deep-olive border-khaki text-khaki shadow-glow-khaki"
                                : "bg-[#181E14] border-muted-olive/40 text-off-white/70 hover:border-muted-olive"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Medical & Injuries in 2-Col */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-1.5">
                          Kindly mention current health Conditions
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Thyroid, BP, Diabetes, or None"
                          value={formData.healthConditions}
                          onChange={(e) => handleChange("healthConditions", e.target.value)}
                          className="w-full bg-[#181E14] border border-muted-olive/60 focus:border-khaki focus:outline-none px-4 py-2.5 text-sm text-off-white placeholder:text-off-white/30 transition-colors resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-off-white/90 uppercase tracking-wider mb-1.5">
                          Past injuries or any health conditions
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Lower back strain, Rotator cuff, ACL, or None"
                          value={formData.pastInjuries}
                          onChange={(e) => handleChange("pastInjuries", e.target.value)}
                          className="w-full bg-[#181E14] border border-muted-olive/60 focus:border-khaki focus:outline-none px-4 py-2.5 text-sm text-off-white placeholder:text-off-white/30 transition-colors resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </form>

              {/* Modal Footer Controls */}
              <div className="bg-[#11140E] border-t border-muted-olive/40 px-5 sm:px-8 py-4 flex items-center justify-between flex-shrink-0">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 border border-muted-olive/60 text-off-white hover:text-khaki hover:border-khaki text-xs font-geo font-bold uppercase tracking-widest transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    className="inline-flex items-center space-x-2 px-6 py-2.5 bg-khaki text-near-black hover:bg-off-white font-geo font-bold text-xs sm:text-sm tracking-widest uppercase transition-all shadow-glow-khaki"
                  >
                    <span>NEXT PHASE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="tactical-bracket-btn">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="inline-flex items-center space-x-2.5 px-6 sm:px-8 py-3 bg-[#25D366] hover:bg-[#20ba59] text-near-black font-geo font-black text-xs sm:text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                    >
                      <Send className="w-4 h-4 text-near-black stroke-[2.5]" />
                      <span>SUBMIT VIA WHATSAPP (+91 97791 59169)</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* SUCCESS CONFIRMATION SCREEN */
            <div className="px-6 sm:px-12 py-12 text-center space-y-6 flex-1 overflow-y-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 bg-[#25D366]/20 border-2 border-[#25D366] rounded-full mx-auto flex items-center justify-center text-[#25D366] shadow-[0_0_30px_rgba(37,211,102,0.3)]"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-khaki uppercase tracking-widest font-bold block">
                  DOSSIER TRANSMISSION READY
                </span>
                <h3 className="font-geo text-2xl sm:text-4xl font-black text-off-white uppercase">
                  APPLICATION DETAILS PREPARED!
                </h3>
                <p className="text-sm text-off-white/70 max-w-lg mx-auto">
                  Your fitness profile answers are configured for Coach Aish Mehan at{" "}
                  <strong className="text-khaki">+91 97791 59169</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                <a
                  href={`https://api.whatsapp.com/send?phone=919779159169&text=${encodeURIComponent(
                    generateWhatsAppMessage()
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-near-black font-geo font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                >
                  <span>RE-OPEN WHATSAPP CHAT</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3.5 bg-[#181E14] border border-muted-olive text-off-white hover:border-khaki hover:text-khaki font-geo font-bold text-xs uppercase tracking-widest transition-all"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? "COPIED TO CLIPBOARD!" : "COPY DOSSIER TEXT"}</span>
                </button>
              </div>

              <div className="pt-4 border-t border-muted-olive/30">
                <button
                  type="button"
                  onClick={closeApplicationModal}
                  className="text-xs font-mono text-off-white/50 hover:text-off-white underline uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
