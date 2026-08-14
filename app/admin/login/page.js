"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  Lock,
  Mail,
  Shield,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronLeft,
  KeyRound,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, authError, setAuthError, isFirebaseConfigured, isAdmin, loading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated as admin, go straight to CMS
  useEffect(() => {
    if (!loading && isAdmin) {
      router.replace("/admin");
    }
  }, [isAdmin, loading, router]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setAuthError("Please enter both your Admin Email and Password.");
      return;
    }
    setIsSubmitting(true);
    await login(email, password);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-near-black text-off-white flex flex-col justify-between tactical-texture relative selection:bg-khaki selection:text-near-black">
      {/* Subtle Military Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-khaki/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-deep-olive/40 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-off-white/60 hover:text-khaki uppercase tracking-widest transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>BACK TO LIVE WEBSITE</span>
        </Link>
        <div className="flex items-center space-x-2 px-3 py-1 bg-deep-olive/60 border border-muted-olive/50 text-[11px] font-mono text-khaki uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5" />
          <span>COMMAND CMS PORTAL</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
        <div className="bg-near-black/95 border-2 border-muted-olive/70 shadow-2xl p-6 sm:p-8 relative clip-chamfer-btn">
          {/* Top Notch Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-khaki via-khaki/80 to-army-olive" />

          {/* Brand Header */}
          <div className="text-center mb-6 pt-2">
            <div className="w-12 h-12 bg-deep-olive border border-khaki/60 flex items-center justify-center mx-auto mb-3 text-khaki shadow-glow-khaki">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-geo text-2xl sm:text-3xl font-black uppercase tracking-wider text-off-white">
              AISH MEHAN // CMS
            </h1>
            <p className="text-xs font-mono text-off-white/60 uppercase tracking-widest mt-1">
              ADMINISTRATOR AUTHENTICATION
            </p>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="mb-5 p-3.5 bg-red-950/70 border border-red-500/70 text-red-200 text-xs font-mono flex items-start space-x-2.5 rounded-none shadow-md">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
              <div className="flex-1 leading-relaxed">{authError}</div>
            </div>
          )}

          {/* Firebase Setup Warning */}
          {!isFirebaseConfigured && (
            <div className="mb-5 p-3 bg-yellow-950/40 border border-yellow-500/50 text-yellow-200 text-xs font-mono flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-yellow-400" />
              <span>
                Firebase environment variables are pending in <code className="text-yellow-300 font-bold">.env.local</code>. Please configure Firebase Authentication and Firestore.
              </span>
            </div>
          )}

          {/* Firebase Email & Password Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                ADMINISTRATOR EMAIL
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aishmehan.in"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-deep-olive/90 border border-muted-olive/60 text-off-white font-mono text-sm placeholder-off-white/30 focus:outline-none focus:border-khaki transition-colors"
                />
                <Mail className="w-4 h-4 text-off-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                ADMIN PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 bg-deep-olive/90 border border-muted-olive/60 text-off-white font-mono text-sm placeholder-off-white/30 focus:outline-none focus:border-khaki transition-colors"
                />
                <KeyRound className="w-4 h-4 text-off-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-off-white/50 hover:text-khaki cursor-pointer transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-khaki text-near-black font-geo font-black text-sm uppercase tracking-widest clip-chamfer-btn hover:bg-off-white transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-glow-khaki disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? "VERIFYING CREDENTIALS..." : "ENTER COMMAND CMS"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="relative z-10 text-center py-6 text-xs font-mono text-off-white/40 uppercase tracking-widest">
        AISH MEHAN ELITE COACHING CMS • PRODUCTION SECURITY ARCHITECTURE
      </footer>
    </div>
  );
}
