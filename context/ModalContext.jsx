"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const ModalContext = createContext({
  isApplicationOpen: false,
  selectedPlan: "8-weeks",
  openApplicationModal: (plan) => {},
  closeApplicationModal: () => {},
  setSelectedPlan: (plan) => {},
});

export function ModalProvider({ children }) {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("8-weeks");

  const isApplicationOpenRef = React.useRef(isApplicationOpen);
  useEffect(() => {
    isApplicationOpenRef.current = isApplicationOpen;
  }, [isApplicationOpen]);

  const openApplicationModal = useCallback((plan) => {
    if (typeof plan === "string" && plan.trim()) {
      setSelectedPlan(plan.trim());
    }
    setIsApplicationOpen(true);
  }, []);

  const closeApplicationModal = useCallback(() => {
    setIsApplicationOpen(false);
    if (typeof window !== "undefined") {
      const hash = (window.location.hash || "").toLowerCase().trim();
      if (
        hash === "#apply" ||
        hash === "#apply-form" ||
        hash.startsWith("#apply?") ||
        hash.startsWith("#apply/") ||
        hash.startsWith("#pricing-")
      ) {
        // Remove #apply hash from the URL without page reload, preserving search/UTM queries
        const cleanUrl = window.location.pathname + window.location.search;
        window.history.replaceState(null, "", cleanUrl);
      }
    }
  }, []);

  // Global listener for hash navigation (#apply, #apply-form, #pricing-*) and custom events
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const hash = (window.location.hash || "").toLowerCase().trim();

      if (
        hash === "#apply" ||
        hash === "#apply-form" ||
        hash.startsWith("#apply?") ||
        hash.startsWith("#apply/")
      ) {
        setIsApplicationOpen(true);
      } else if (hash === "#pricing-4weeks") {
        setSelectedPlan("4-weeks");
        setIsApplicationOpen(true);
      } else if (hash === "#pricing-8weeks") {
        setSelectedPlan("8-weeks");
        setIsApplicationOpen(true);
      } else if (hash === "#pricing-12weeks") {
        setSelectedPlan("12-weeks");
        setIsApplicationOpen(true);
      } else if (isApplicationOpenRef.current && (hash === "" || hash.startsWith("#"))) {
        // If the user navigates away using browser back button, close the modal
        setIsApplicationOpen(false);
      }
    };

    const handleCustomOpen = (event) => {
      if (event?.detail?.plan) {
        setSelectedPlan(event.detail.plan);
      }
      setIsApplicationOpen(true);
    };

    window.addEventListener("hashchange", handleHash);
    window.addEventListener("popstate", handleHash);
    window.addEventListener("open-apply-modal", handleCustomOpen);

    // Initial check when client components are mounted
    handleHash();

    // Safety timeout to guarantee detection on direct load & refresh across browsers
    const timer = setTimeout(handleHash, 50);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("popstate", handleHash);
      window.removeEventListener("open-apply-modal", handleCustomOpen);
    };
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isApplicationOpen,
        selectedPlan,
        openApplicationModal,
        closeApplicationModal,
        setSelectedPlan,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

