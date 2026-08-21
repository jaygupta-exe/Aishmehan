"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { siteData as defaultSiteData, COACH_WHATSAPP_NUMBER } from "@/data/siteData";
import { db, auth, isFirebaseConfigured } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const DataContext = createContext(null);

// LocalStorage keys strictly for NON-SENSITIVE public configuration caching
const STORAGE_KEY_CONTENT = "aishmehan_cms_content_v2";
const STORAGE_KEY_TRANSFORMATIONS = "aishmehan_cms_transformations_v2";

// Default initial transformation images if collection is empty
const defaultTransformations = [
  {
    id: "tf-1",
    title: "Executive Physique Recomposition",
    category: "Fat Loss",
    timeframe: "12 Weeks",
    metrics: "Lost 14 kg & Built Core Density",
    src: "/images/before after 1.JPG",
    alt: "Client Transformation 1",
    objectPosition: "center 6%",
    quote: "Direct daily accountability made this the only program that actually worked for my high-stress travel schedule.",
    clientName: "Executive Client",
    order: 1,
  },
  {
    id: "tf-2",
    title: "Lean Mass & Postural Reconstruction",
    category: "Muscle Gain",
    timeframe: "20 Weeks",
    metrics: "Gained 8 kg Pure Lean Mass",
    src: "/images/before after 2.JPG",
    alt: "Client Transformation 2",
    objectPosition: "center 32%",
    quote: "Fixed chronic shoulder pain while adding 40kg to my compound lifts.",
    clientName: "Software Lead",
    order: 2,
  },
  {
    id: "tf-3",
    title: "Complete Body Recomposition",
    category: "Fat Loss",
    timeframe: "16 Weeks",
    metrics: "18% to 9% Body Fat",
    src: "/images/before after 3.JPG",
    alt: "Client Transformation 3",
    objectPosition: "center 10%",
    quote: "The personalized macro adjustments and weekly video calls kept me in the zone.",
    clientName: "Entrepreneur",
    order: 3,
  },
  {
    id: "tf-4",
    title: "V-Taper Athletic Conditioning",
    category: "Muscle Gain",
    timeframe: "14 Weeks",
    metrics: "Waist -4 inches, Chest +3 inches",
    src: "/images/before after 4.JPG",
    alt: "Client Transformation 4",
    objectPosition: "center 37%",
    quote: "Precision biomechanics and custom progressive overload protocols.",
    clientName: "Business Owner",
    order: 4,
  },
  {
    id: "tf-5",
    title: "Metabolic Reset & Fat Loss",
    category: "Fat Loss",
    timeframe: "8 Weeks",
    metrics: "Lost 9.5 kg in 2 Months",
    src: "/images/before after 5.JPG",
    alt: "Client Transformation 5",
    objectPosition: "center 36%",
    quote: "Simple, sustainable nutrition that never left me starving.",
    clientName: "Corporate Consultant",
    order: 5,
  },
  {
    id: "tf-6",
    title: "Hypertrophy & Strength Build",
    category: "Muscle Gain",
    timeframe: "24 Weeks",
    metrics: "+11 kg Lean Muscle",
    src: "/images/before after 6.JPG",
    alt: "Client Transformation 6",
    objectPosition: "center 39%",
    quote: "Championship level training principles tailored to a working professional.",
    clientName: "Medical Professional",
    order: 6,
  },
  {
    id: "tf-7",
    title: "Rapid Recomposition Protocol",
    category: "Fat Loss",
    timeframe: "10 Weeks",
    metrics: "Lost 11 kg & Revealed Abs",
    src: "/images/before after 7.JPG",
    alt: "Client Transformation 7",
    objectPosition: "center 42%",
    quote: "Unbelievable pace without risking injury or burning out.",
    clientName: "Creative Director",
    order: 7,
  },
  {
    id: "tf-8",
    title: "Total Lifestyle & Body Overhaul",
    category: "Recomposition",
    timeframe: "18 Weeks",
    metrics: "Replaced 12kg fat with lean muscle",
    src: "/images/before after 8.JPG",
    alt: "Client Transformation 8",
    objectPosition: "center 34%",
    quote: "Coach Divesh's discipline became my blueprint for life.",
    clientName: "Finance VP",
    order: 8,
  },
  {
    id: "tf-9",
    title: "Championship Foundation Coaching",
    category: "Muscle Gain",
    timeframe: "16 Weeks",
    metrics: "Gained 7 kg Lean Mass",
    src: "/images/before after 9 - Copy.JPG",
    alt: "Client Transformation 9",
    objectPosition: "center 10%",
    quote: "True natural bodybuilding science at its finest.",
    clientName: "Architect",
    order: 9,
  },
];

export function DataProvider({ children }) {
  const [content, setContent] = useState(defaultSiteData);
  const [transformations, setTransformations] = useState(defaultTransformations);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // 1. Initialize Public Data (site_content/main & transformations)
  useEffect(() => {
    let unsubscribeContent = null;
    let unsubscribeTrans = null;

    const initializePublicData = async () => {
      // 1. Read cached non-sensitive public configuration for instant UI render
      if (typeof window !== "undefined") {
        try {
          const cachedContent = localStorage.getItem(STORAGE_KEY_CONTENT);
          if (cachedContent) {
            setContent(JSON.parse(cachedContent));
          }

          const cachedTrans = localStorage.getItem(STORAGE_KEY_TRANSFORMATIONS);
          if (cachedTrans) {
            setTransformations(JSON.parse(cachedTrans));
          }
        } catch (e) {
          console.warn("LocalStorage read error:", e);
        }
      }

      // 2. Real-time Firestore sync for public documents
      if (isFirebaseConfigured && db) {
        try {
          setIsFirebaseConnected(true);

          // Public Site Content Listener (Hero, Workshop, Pricing, Brand)
          const contentDocRef = doc(db, "site_content", "main");
          unsubscribeContent = onSnapshot(
            contentDocRef,
            (snapshot) => {
              if (snapshot.exists()) {
                const data = snapshot.data();
                setContent((prev) => ({ ...prev, ...data }));
                if (typeof window !== "undefined") {
                  try {
                    localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(data));
                  } catch (e) {
                    // ignore quota errors
                  }
                }
              }
              setLastSyncTime(new Date());
            },
            (err) => {
              console.warn("Firestore public content listener:", err.message);
            }
          );

          // Public Transformations Listener
          const transColRef = collection(db, "transformations");
          const transQuery = query(transColRef, orderBy("order", "asc"));
          unsubscribeTrans = onSnapshot(
            transQuery,
            (snapshot) => {
              if (!snapshot.empty) {
                const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
                setTransformations(items);
                if (typeof window !== "undefined") {
                  try {
                    localStorage.setItem(STORAGE_KEY_TRANSFORMATIONS, JSON.stringify(items));
                  } catch (e) {
                    // ignore quota errors
                  }
                }
              }
            },
            (err) => {
              console.warn("Firestore transformations listener:", err.message);
            }
          );
        } catch (error) {
          console.warn("Firebase connection error:", error);
          setIsFirebaseConnected(false);
        }
      }

      setIsLoading(false);
    };

    initializePublicData();

    return () => {
      if (unsubscribeContent) unsubscribeContent();
      if (unsubscribeTrans) unsubscribeTrans();
    };
  }, []);

  // 2. Dedicated Applications / Leads Listener (ADMIN-ONLY)
  // Ensures public visitors never attempt to query applications collection
  useEffect(() => {
    let unsubscribeApps = null;
    let isMounted = true;

    if (!isFirebaseConfigured || !auth || !db) return;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user && isMounted) {
        try {
          // Verify admin role before attaching listener
          const userDocRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userDocRef);
          
          if (userSnap.exists() && userSnap.data()?.role === "admin" && isMounted) {
            const appsColRef = collection(db, "applications");
            const appsQuery = query(appsColRef, orderBy("createdAt", "desc"));
            
            unsubscribeApps = onSnapshot(
              appsQuery,
              (snapshot) => {
                if (!isMounted) return;
                const leads = snapshot.docs.map((d) => ({
                  id: d.id,
                  ...d.data(),
                }));
                setApplications(leads);
              },
              (err) => {
                console.warn("Admin applications listener error:", err.message);
              }
            );
          }
        } catch (e) {
          console.warn("Could not authenticate leads listener:", e.message);
        }
      } else {
        if (unsubscribeApps) {
          unsubscribeApps();
          unsubscribeApps = null;
        }
        if (isMounted) {
          setApplications([]);
        }
      }
    });

    return () => {
      isMounted = false;
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeApps) unsubscribeApps();
    };
  }, []);

  // Save Site Content updates (Hero, Workshop, Pricing, Brand Settings)
  const saveSiteContent = async (updatedFields) => {
    const merged = { ...content, ...updatedFields };
    setContent(merged);

    // Save non-sensitive config to local cache
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(merged));
      } catch (e) {
        // ignore quota
      }
    }

    // Persist to Firestore site_content/main
    if (isFirebaseConfigured && db) {
      try {
        const contentDocRef = doc(db, "site_content", "main");
        await setDoc(contentDocRef, merged, { merge: true });
        setLastSyncTime(new Date());
        return { success: true, message: "Saved to Firestore and updated live on website!" };
      } catch (err) {
        console.error("Error saving site content to Firestore:", err);
        return { success: false, message: `Save error: ${err.message}` };
      }
    }

    return { success: true, message: "Saved locally in cache (Firebase pending configuration)." };
  };

  // Submit a new lead from ApplicationModal (Public creation with schema enforcement)
  const saveApplicationLead = async (leadData) => {
    // Construct clean payload strictly adhering to firestore.rules schema
    const payload = {
      fullName: String(leadData.fullName || "Website Applicant").trim().slice(0, 200),
      contactNumber: String(leadData.contactNumber || "").trim().slice(0, 50),
      email: String(leadData.email || "").trim().slice(0, 200),
      selectedPackage: String(leadData.selectedPackage || "8 Weeks Protocol").slice(0, 150),
      packageId: String(leadData.packageId || "8-weeks").slice(0, 50),
      batchTiming: String(leadData.batchTiming || "Morning Batch").slice(0, 100),
      ageWeightHeight: String(leadData.ageWeightHeight || "").slice(0, 200),
      fitnessGoal: String(leadData.fitnessGoal || "").slice(0, 500),
      gymExperience: String(leadData.gymExperience || "").slice(0, 200),
      cardioHistory: String(leadData.cardioHistory || "").slice(0, 200),
      strengths: String(leadData.strengths || "").slice(0, 300),
      weakPoints: String(leadData.weakPoints || "").slice(0, 300),
      gymTimings: String(leadData.gymTimings || "").slice(0, 100),
      activityLevel: String(leadData.activityLevel || "lightly active").slice(0, 100),
      dietPreference: String(leadData.dietPreference || "").slice(0, 200),
      dislikedFoods: String(leadData.dislikedFoods || "").slice(0, 300),
      weeklyMealBudget: String(leadData.weeklyMealBudget || "").slice(0, 100),
      alcoholSmoke: String(leadData.alcoholSmoke || "None of the above").slice(0, 100),
      healthConditions: String(leadData.healthConditions || "").slice(0, 500),
      status: "new",
      createdAt: new Date().toISOString(),
    };

    // NOTE: Sensitive lead data is NEVER stored in localStorage or sessionStorage.

    if (isFirebaseConfigured && db) {
      try {
        const appsColRef = collection(db, "applications");
        const docRef = await addDoc(appsColRef, payload);
        return { success: true, id: docRef.id };
      } catch (e) {
        console.error("Firestore lead submission error:", e);
        return { success: false, error: e.message };
      }
    }

    return { success: true, message: "Lead submitted." };
  };

  // Update lead status in CMS (Admin only)
  const updateLeadStatus = async (leadId, newStatus, adminNote = "") => {
    const updated = applications.map((app) =>
      app.id === leadId ? { ...app, status: newStatus, adminNote: adminNote || app.adminNote } : app
    );
    setApplications(updated);

    if (isFirebaseConfigured && db) {
      try {
        const leadRef = doc(db, "applications", leadId);
        await updateDoc(leadRef, {
          status: newStatus,
          ...(adminNote ? { adminNote } : {}),
          updatedAt: new Date().toISOString(),
        });
      } catch (e) {
        console.warn("Error updating lead status in Firestore:", e);
      }
    }
  };

  // Delete a lead (Admin only)
  const deleteLead = async (leadId) => {
    const updated = applications.filter((app) => app.id !== leadId);
    setApplications(updated);

    if (isFirebaseConfigured && db) {
      try {
        const leadRef = doc(db, "applications", leadId);
        await deleteDoc(leadRef);
      } catch (e) {
        console.warn("Error deleting lead from Firestore:", e);
      }
    }
  };

  // Transformations Management (Admin only)
  const addTransformation = async (item) => {
    const newItem = {
      ...item,
      id: item.id || `tf_${Date.now()}`,
      order: transformations.length + 1,
    };
    const updated = [...transformations, newItem];
    setTransformations(updated);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_TRANSFORMATIONS, JSON.stringify(updated));
      } catch (e) {
        // ignore quota
      }
    }

    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, "transformations", newItem.id);
        await setDoc(docRef, newItem);
      } catch (e) {
        console.warn("Error adding transformation to Firestore:", e);
      }
    }
  };

  const updateTransformation = async (id, updatedFields) => {
    const updated = transformations.map((t) => (t.id === id ? { ...t, ...updatedFields } : t));
    setTransformations(updated);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_TRANSFORMATIONS, JSON.stringify(updated));
      } catch (e) {
        // ignore quota
      }
    }

    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, "transformations", id);
        await updateDoc(docRef, updatedFields);
      } catch (e) {
        console.warn("Error updating transformation in Firestore:", e);
      }
    }
  };

  const deleteTransformation = async (id) => {
    const updated = transformations.filter((t) => t.id !== id);
    setTransformations(updated);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_TRANSFORMATIONS, JSON.stringify(updated));
      } catch (e) {
        // ignore quota
      }
    }

    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, "transformations", id);
        await deleteDoc(docRef);
      } catch (e) {
        console.warn("Error deleting transformation in Firestore:", e);
      }
    }
  };

  // Certifications Management (Admin only)
  const addCertification = async (item) => {
    const currentCertifications = content?.certifications || defaultSiteData.certifications;
    const currentItems = currentCertifications?.items || [];
    const newItem = {
      ...item,
      id: item.id || `cert_${Date.now()}`,
    };
    const updatedItems = [newItem, ...currentItems];
    const updatedCertifications = {
      ...currentCertifications,
      items: updatedItems,
    };
    return await saveSiteContent({ certifications: updatedCertifications });
  };

  const updateCertification = async (id, updatedFields) => {
    const currentCertifications = content?.certifications || defaultSiteData.certifications;
    const currentItems = currentCertifications?.items || [];
    const updatedItems = currentItems.map((c) => (c.id === id ? { ...c, ...updatedFields } : c));
    const updatedCertifications = {
      ...currentCertifications,
      items: updatedItems,
    };
    return await saveSiteContent({ certifications: updatedCertifications });
  };

  const deleteCertification = async (id) => {
    const currentCertifications = content?.certifications || defaultSiteData.certifications;
    const currentItems = currentCertifications?.items || [];
    const updatedItems = currentItems.filter((c) => c.id !== id);
    const updatedCertifications = {
      ...currentCertifications,
      items: updatedItems,
    };
    return await saveSiteContent({ certifications: updatedCertifications });
  };

  const saveCertificationsConfig = async (config) => {
    const currentCertifications = content?.certifications || defaultSiteData.certifications;
    const updatedCertifications = {
      ...currentCertifications,
      ...config,
    };
    return await saveSiteContent({ certifications: updatedCertifications });
  };

  // Seed initial siteData into Firestore
  const seedInitialData = async () => {
    try {
      setContent(defaultSiteData);
      setTransformations(defaultTransformations);

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(defaultSiteData));
          localStorage.setItem(STORAGE_KEY_TRANSFORMATIONS, JSON.stringify(defaultTransformations));
        } catch (e) {
          // ignore quota
        }
      }

      if (isFirebaseConfigured && db) {
        // Save main content doc to Firestore
        const contentDocRef = doc(db, "site_content", "main");
        await setDoc(contentDocRef, defaultSiteData, { merge: true });

        // Save default transformations to Firestore
        for (const item of defaultTransformations) {
          const itemDocRef = doc(db, "transformations", item.id);
          await setDoc(itemDocRef, item, { merge: true });
        }
      }

      return { success: true, message: "Firestore database successfully initialized with default site data and transformations!" };
    } catch (e) {
      console.error("Error seeding initial data:", e);
      return { success: false, message: `Seeding error: ${e.message}` };
    }
  };

  return (
    <DataContext.Provider
      value={{
        content,
        transformations,
        applications,
        isLoading,
        isFirebaseConnected,
        lastSyncTime,
        saveSiteContent,
        saveApplicationLead,
        updateLeadStatus,
        deleteLead,
        addTransformation,
        updateTransformation,
        deleteTransformation,
        addCertification,
        updateCertification,
        deleteCertification,
        saveCertificationsConfig,
        seedInitialData,
        coachWhatsAppNumber: content?.COACH_WHATSAPP_NUMBER || defaultSiteData.COACH_WHATSAPP_NUMBER || COACH_WHATSAPP_NUMBER,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useSiteContent must be used within a DataProvider");
  }
  return context;
}
