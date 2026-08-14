"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { AdminAuthProvider, useAdminAuth } from "@/context/AdminAuthContext";
import { useSiteContent } from "@/context/DataContext";
import {
  Shield,
  ExternalLink,
  LogOut,
  User,
  Database,
  CheckCircle2,
  AlertCircle,
  Flame,
  LayoutDashboard,
  Layers,
  Sparkles,
} from "lucide-react";

function AdminLayoutInner({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAdmin, adminUser, loading, logout } = useAdminAuth();
  const { isFirebaseConnected } = useSiteContent();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !isAdmin && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [isAdmin, loading, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-near-black flex items-center justify-center text-off-white font-mono">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-2 border-khaki border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-khaki">AUTHENTICATING COMMAND SESSION...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-near-black text-off-white tactical-texture selection:bg-khaki selection:text-near-black">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-deep-olive/95 border-b border-muted-olive/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & CMS Title */}
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 bg-khaki text-near-black font-geo font-black flex items-center justify-center text-sm tracking-tighter">
                AM
              </div>
              <div className="flex flex-col">
                <span className="font-geo font-black text-base tracking-wider uppercase text-off-white group-hover:text-khaki transition-colors">
                  AISH MEHAN // CMS
                </span>
                <span className="text-[10px] font-mono text-khaki uppercase tracking-widest leading-none">
                  ADMIN DASHBOARD
                </span>
              </div>
            </Link>

            {/* Database Status Indicator */}
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 bg-near-black/60 border border-muted-olive/50 text-[11px] font-mono">
              <Database className="w-3.5 h-3.5 text-khaki" />
              <span>DB:</span>
              {isFirebaseConnected ? (
                <span className="text-emerald-400 font-bold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>FIRESTORE LIVE</span>
                </span>
              ) : (
                <span className="text-yellow-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <span>LOCAL / FALLBACK</span>
                </span>
              )}
            </div>
          </div>

          {/* Right Action Links */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 bg-near-black/80 border border-muted-olive/60 hover:border-khaki text-off-white hover:text-khaki text-xs font-mono uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
            >
              <span>VIEW WEBSITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-off-white/80 border-l border-muted-olive/40 pl-3">
              <User className="w-3.5 h-3.5 text-khaki" />
              <span>{adminUser?.email || "Admin"}</span>
            </div>

            <button
              onClick={logout}
              className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 text-red-300 text-xs font-mono uppercase tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Logout from CMS"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LOGOUT</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  );
}
