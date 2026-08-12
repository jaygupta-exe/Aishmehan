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

  const openApplicationModal = useCallback((plan) => {
    if (typeof plan === "string" && plan.trim()) {
      setSelectedPlan(plan.trim());
    }
    setIsApplicationOpen(true);
  }, []);

  const closeApplicationModal = useCallback(() => {
    setIsApplicationOpen(false);
  }, []);

  // Global listener for hash navigation (#apply or #pricing-*) and custom events
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#apply" || hash === "#apply-form") {
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
      }
    };

    const handleCustomOpen = (event) => {
      if (event?.detail?.plan) {
        setSelectedPlan(event.detail.plan);
      }
      setIsApplicationOpen(true);
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("open-apply-modal", handleCustomOpen);

    // Check on initial load
    if (window.location.hash === "#apply" || window.location.hash === "#apply-form") {
      setIsApplicationOpen(true);
    }

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
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

