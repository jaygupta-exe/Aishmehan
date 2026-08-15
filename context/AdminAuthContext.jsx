"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const isVerifyingRef = useRef(false);

  // Verify whether the Firebase-authenticated user has the "admin" role in Firestore users/{uid}
  const verifyAdminRole = useCallback(async (user) => {
    if (!user) {
      setIsAdmin(false);
      setAdminUser(null);
      return false;
    }

    if (isVerifyingRef.current) return false;
    isVerifyingRef.current = true;

    const isKnownSuperAdmin =
      user.email && user.email.toLowerCase() === "aishfitness8@gmail.com";

    // If Firestore db instance isn't available or network fails, grant access for primary superadmin
    if (!db) {
      if (isKnownSuperAdmin) {
        setIsAdmin(true);
        setAdminUser({
          uid: user.uid,
          email: user.email,
          role: "admin",
          name: user.displayName || "Aish Mehan (Admin)",
        });
        setAuthError("");
        isVerifyingRef.current = false;
        return true;
      }
      setIsAdmin(false);
      setAdminUser(null);
      isVerifyingRef.current = false;
      return false;
    }

    try {
      // 4-second timeout to prevent Firestore network hangs
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Database role verification timed out")), 4000)
      );

      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await Promise.race([getDoc(userDocRef), timeoutPromise]);

      if (userSnapshot && userSnapshot.exists()) {
        const userData = userSnapshot.data();
        if (userData?.role === "admin" || isKnownSuperAdmin) {
          setIsAdmin(true);
          setAdminUser({
            uid: user.uid,
            email: user.email,
            role: "admin",
            name: userData.name || user.displayName || "Aish Mehan (Admin)",
            ...userData,
          });
          setAuthError("");
          isVerifyingRef.current = false;
          return true;
        }
      } else if (isKnownSuperAdmin) {
        // Auto-provision Firestore admin profile document for the primary owner
        setIsAdmin(true);
        setAdminUser({
          uid: user.uid,
          email: user.email,
          role: "admin",
          name: user.displayName || "Aish Mehan (Admin)",
        });
        setAuthError("");
        isVerifyingRef.current = false;
        try {
          await setDoc(
            userDocRef,
            {
              email: user.email,
              role: "admin",
              name: "Aish Mehan",
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (e) {
          console.warn("Auto-provision admin doc error:", e.message);
        }
        return true;
      }

      // User exists in Firebase Auth but does NOT possess the "admin" role
      if (auth) {
        try {
          await firebaseSignOut(auth);
        } catch (e) {
          // ignore signout errors
        }
      }
      setIsAdmin(false);
      setAdminUser(null);
      setAuthError("Access denied: Your account does not have administrator privileges in Firestore (users/{uid}.role != 'admin').");
      isVerifyingRef.current = false;
      return false;
    } catch (err) {
      console.warn("Admin role verification check:", err.message);
      if (isKnownSuperAdmin) {
        // Fail-safe for superadmin in case of transient network timeout
        setIsAdmin(true);
        setAdminUser({
          uid: user.uid,
          email: user.email,
          role: "admin",
          name: user.displayName || "Aish Mehan (Admin)",
        });
        setAuthError("");
        isVerifyingRef.current = false;
        return true;
      }
      if (auth) {
        try {
          await firebaseSignOut(auth);
        } catch (e) {
          // ignore signout errors
        }
      }
      setIsAdmin(false);
      setAdminUser(null);
      setAuthError(
        err.message?.includes("timed out")
          ? "Database connection timed out while checking admin role. Please refresh or check Firestore permissions."
          : "Access denied: Could not verify administrator privileges."
      );
      isVerifyingRef.current = false;
      return false;
    }
  }, []);

  // Listen to Firebase Auth state on mount
  useEffect(() => {
    let unsubscribe = null;
    let isMounted = true;

    // Safety fallback timer to guarantee loading state never hangs
    const safetyTimer = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
      }
    }, 1500);

    if (isFirebaseConfigured && auth) {
      try {
        unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (!isMounted) return;
          if (user) {
            await verifyAdminRole(user);
          } else {
            setIsAdmin(false);
            setAdminUser(null);
          }
          if (isMounted) {
            clearTimeout(safetyTimer);
            setLoading(false);
          }
        });
      } catch (err) {
        console.warn("Auth state observer error:", err);
        clearTimeout(safetyTimer);
        if (isMounted) setLoading(false);
      }
    } else {
      clearTimeout(safetyTimer);
      setLoading(false);
    }

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
      if (unsubscribe) unsubscribe();
    };
  }, [verifyAdminRole]);

  // Login via Firebase Authentication (Email + Password)
  const login = async (email, password) => {
    setAuthError("");

    if (!isFirebaseConfigured || !auth) {
      const errorMsg = "Firebase is not configured. Please check your Firebase credentials in .env.local.";
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // Verify admin role in Firestore
      const isRoleValid = await verifyAdminRole(user);
      if (isRoleValid) {
        router.replace("/admin");
        return { success: true };
      } else {
        return { success: false, error: "Unauthorized: Admin role required." };
      }
    } catch (err) {
      let friendlyMessage = err.message || "Failed to sign in.";
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        friendlyMessage = "Invalid email or password. Please check your credentials.";
      } else if (err.code === "auth/too-many-requests") {
        friendlyMessage = "Too many failed login attempts. Please try again later.";
      } else if (err.code === "auth/network-request-failed") {
        friendlyMessage = "Network error: Unable to connect to Firebase. Check your internet connection.";
      }
      setAuthError(friendlyMessage);
      return { success: false, error: friendlyMessage };
    }
  };

  // Sign out
  const logout = async () => {
    setIsAdmin(false);
    setAdminUser(null);
    setAuthError("");

    if (isFirebaseConfigured && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (e) {
        console.warn("Sign out error:", e);
      }
    }
    router.replace("/admin/login");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdmin,
        adminUser,
        loading,
        authError,
        setAuthError,
        login,
        logout,
        isFirebaseConfigured,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
