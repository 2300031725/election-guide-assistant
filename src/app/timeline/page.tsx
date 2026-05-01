import { CheckCircle2, Circle, Clock, AlertTriangle } from "lucide-react";

type Milestone = {
  id: string;
  title: string;
  date: string;
  description: string;
  status: "completed" | "current" | "upcoming";
};

const timelineData: Milestone[] = [
  {
    id: "1",
    title: "Voter Registration Opens",
    date: "Jan 15, 2026",
    description: "The official portal for new voter registration and corrections opens online and offline.",
    status: "completed",
  },
  {
    id: "2",
    title: "Last Date for Registration",
    date: "March 30, 2026",
    description: "Final deadline to submit your voter registration. After this date, you cannot vote in the upcoming election.",
    status: "completed",
  },
  {
    id: "3",
    title: "Candidate Nominations",
    date: "April 10 - April 20, 2026",
    description: "Political candidates submit their official nomination papers to the Election Commission.",
    status: "current",
  },
  {
    id: "4",
    title: "Campaign Period Ends",
    date: "May 13, 2026",
    description: "All public campaigning must stop 48 hours before the voting day begins.",
    status: "upcoming",
  },
  {
    id: "5",
    title: "Voting Day",
    date: "May 15, 2026",
    description: "Go to your designated polling booth and cast your vote. Carry your Voter ID or approved alternate ID.",
    status: "upcoming",
  },
  {
    id: "6",
    title: "Result Declaration",
    date: "May 20, 2026",
    description: "Counting of votes and official declaration of the election results.",
    status: "upcoming",
  }
];

export default function TimelinePage() {
  return (
    <div className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-foreground">Election Timeline</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Keep track of important dates to ensure you are ready for the upcoming elections. Missing a deadline might prevent you from voting.
        </p>
      </div>

      <div className="relative border-l-2 border-brand-200 ml-4 md:ml-8">
        {timelineData.map((item, index) => (
          <div key={item.id} className="mb-12 ml-8 relative group">
            
            {/* Timeline Icon / Dot */}
            <span className={`absolute -left-[41px] flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-background ${
              item.status === "completed" ? "bg-accent-500 text-white" :
              item.status === "current" ? "bg-brand-500 text-white animate-pulse-slow" :
              "bg-slate-200 text-slate-500"
            }`}>
              {item.status === "completed" ? <CheckCircle2 size={20} /> :
               item.status === "current" ? <Clock size={20} /> :
               <Circle size={14} fill="currentColor" />}
            </span>

            {/* Content Card */}
            <div className={`p-6 bg-card border rounded-2xl shadow-sm transition-all hover:shadow-md ${
              item.status === "current" ? "border-brand-300 ring-1 ring-brand-100 dark:ring-brand-900" : "border-border"
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  item.status === "completed" ? "bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400" :
                  item.status === "current" ? "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400" :
                  "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}>
                  {item.date}
                </span>
              </div>
              <p className="text-foreground/70 leading-relaxed">
                {item.description}
              </p>
              
              {item.status === "current" && (
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-3 py-2 rounded-lg w-full">
                  <AlertTriangle size={16} />
                  We are currently in this phase.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
