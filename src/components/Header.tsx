import Link from "next/link";
import { Vote, FileText, Calendar, MessageSquare, Info } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg">
            <Vote size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Election Guide
          </span>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6 text-sm font-medium">
          <Link href="/chat" className="flex items-center gap-2 text-foreground/80 hover:text-brand-600 transition-colors">
            <MessageSquare size={18} className="hidden sm:block" />
            <span>Assistant</span>
          </Link>
          <Link href="/timeline" className="flex items-center gap-2 text-foreground/80 hover:text-brand-600 transition-colors">
            <Calendar size={18} className="hidden sm:block" />
            <span>Timeline</span>
          </Link>
          <Link href="/faq" className="flex items-center gap-2 text-foreground/80 hover:text-brand-600 transition-colors">
            <Info size={18} className="hidden sm:block" />
            <span>FAQ</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
