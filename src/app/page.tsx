import Link from "next/link";
import { ArrowRight, Bot, Calendar, FileText, CheckCircle2, MapPin } from "lucide-react";
import ReadyToVoteChecklist from "@/components/ReadyToVoteChecklist";
import MapLocator from "@/components/MapLocator";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-brand-50 to-background w-full">
      
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-200/40 blur-3xl mix-blend-multiply opacity-50 z-0" aria-hidden="true"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-200/40 blur-3xl mix-blend-multiply opacity-50 z-0" aria-hidden="true"></div>

      <div className="container px-4 py-24 mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm text-brand-600 mb-8" role="status">
          <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2 animate-pulse" aria-hidden="true"></span>
          Your Smart Voting Companion
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 max-w-4xl">
          Understand Elections. <br className="hidden md:block" aria-hidden="true"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600">
            Vote with Confidence.
          </span>
        </h1>

        <p className="text-xl text-foreground/70 mb-10 max-w-2xl">
          An AI-powered assistant designed to simplify the election process. 
          Check your eligibility, find important dates, and get all your questions answered instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full justify-center max-w-md mx-auto">
          <Link href="/chat" className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-4 text-white font-semibold shadow-lg shadow-brand-600/30 hover:bg-brand-700 transition-all hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" aria-label="Open Chat Assistant">
            <Bot size={20} aria-hidden="true" />
            Ask Assistant
          </Link>
          <Link href="/timeline" className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-card border border-border px-8 py-4 text-card-foreground font-semibold hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/30 dark:hover:text-brand-300 transition-all hover:-translate-y-1 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" aria-label="View Election Timeline">
            <Calendar size={20} aria-hidden="true" />
            View Timeline
          </Link>
        </div>

        {/* Feature Cards */}
        <section aria-label="App Features" className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <FeatureCard 
            icon={<CheckCircle2 className="text-accent-500" size={32} aria-hidden="true" />}
            title="Step-by-Step Guide"
            description="From voter registration to election day, know exactly what to do."
          />
          <FeatureCard 
            icon={<Bot className="text-brand-500" size={32} aria-hidden="true" />}
            title="Smart Chatbot"
            description="Ask questions in natural language and get instant, accurate answers."
          />
          <FeatureCard 
            icon={<FileText className="text-purple-500" size={32} aria-hidden="true" />}
            title="Document Checklist"
            description="Never miss a requirement. See exactly what documents you need."
          />
        </section>

        <div className="w-full mt-12 mb-8">
          <MapLocator />
        </div>

        <ReadyToVoteChecklist />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <article className="flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 p-4 rounded-full bg-brand-50 dark:bg-brand-900/30">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </article>
  );
}
