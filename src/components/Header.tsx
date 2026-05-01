"use client";

import Link from "next/link";
import { Vote, Calendar, MessageSquare, Info, LogOut, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, loginWithGoogle, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Home - Election Guide">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg">
            <Vote size={24} aria-hidden="true" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Election Guide
          </span>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6 text-sm font-medium" aria-label="Main Navigation">
          <Link href="/chat" className="flex items-center gap-2 text-foreground/80 hover:text-brand-600 transition-colors" aria-label="Chat Assistant">
            <MessageSquare size={18} className="hidden sm:block" aria-hidden="true" />
            <span className="hidden sm:block">Assistant</span>
          </Link>
          <Link href="/timeline" className="flex items-center gap-2 text-foreground/80 hover:text-brand-600 transition-colors" aria-label="Election Timeline">
            <Calendar size={18} className="hidden sm:block" aria-hidden="true" />
            <span className="hidden sm:block">Timeline</span>
          </Link>
          <Link href="/faq" className="flex items-center gap-2 text-foreground/80 hover:text-brand-600 transition-colors" aria-label="Frequently Asked Questions">
            <Info size={18} className="hidden sm:block" aria-hidden="true" />
            <span className="hidden sm:block">FAQ</span>
          </Link>
          
          <div className="h-6 w-px bg-border mx-1"></div>
          
          {user ? (
            <button 
              onClick={logout}
              className="flex items-center gap-2 text-sm font-medium bg-brand-50 text-brand-700 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="Logout"
            >
              <LogOut size={16} aria-hidden="true" />
              <span className="hidden sm:block">Logout</span>
            </button>
          ) : (
            <button 
              onClick={loginWithGoogle}
              className="flex items-center gap-2 text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="Sign in with Google"
            >
              <LogIn size={16} aria-hidden="true" />
              <span className="hidden sm:block">Sign In</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
