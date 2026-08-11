"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ModalContext = createContext({
  isApplicationOpen: false,
  openApplicationModal: () => {},
  closeApplicationModal: () => {},
});

export function ModalProvider({ children }) {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  const openApplicationModal = () => setIsApplicationOpen(true);
  const closeApplicationModal = () => setIsApplicationOpen(false);

  // Global listener for hash navigation (#apply or #apply-form) and custom events
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#apply" || window.location.hash === "#apply-form") {
        setIsApplicationOpen(true);
      }
    };

    const handleCustomOpen = () => {
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
        openApplicationModal,
        closeApplicationModal,
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
