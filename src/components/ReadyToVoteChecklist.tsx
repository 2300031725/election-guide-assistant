"use client";

import { useState, useEffect } from "react";
import { Check, Circle } from "lucide-react";

type ChecklistItem = {
  id: string;
  text: string;
};

const ITEMS: ChecklistItem[] = [
  { id: "reg", text: "Are you registered to vote?" },
  { id: "id", text: "Do you have your Voter ID or approved alternate ID ready?" },
  { id: "booth", text: "Do you know where your polling booth is?" },
  { id: "date", text: "Is the election date saved in your calendar?" }
];

export default function ReadyToVoteChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("voterChecklist");
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleItem = (id: string) => {
    const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(newChecked);
    localStorage.setItem("voterChecklist", JSON.stringify(newChecked));
  };

  const progress = Math.round((Object.values(checkedItems).filter(Boolean).length / ITEMS.length) * 100) || 0;

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="w-full max-w-xl mx-auto bg-card rounded-3xl p-8 border border-border shadow-lg mt-16 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800">
        <div 
          className="h-full bg-brand-500 transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Am I Ready to Vote?</h2>
        <p className="text-foreground/70">Check off the steps below to ensure you're fully prepared for election day.</p>
      </div>

      <div className="space-y-3">
        {ITEMS.map((item) => {
          const isChecked = !!checkedItems[item.id];
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-center p-4 rounded-xl border text-left transition-all ${
                isChecked 
                  ? "bg-brand-50 border-brand-200 shadow-inner dark:bg-brand-900/30 dark:border-brand-800" 
                  : "bg-card border-border hover:border-brand-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <div className={`flex items-center justify-center w-6 h-6 rounded-full mr-4 shrink-0 transition-colors ${
                isChecked ? "bg-brand-500 text-white" : "border-2 border-slate-300 text-transparent"
              }`}>
                {isChecked ? <Check size={14} strokeWidth={3} /> : <Circle size={14} className="opacity-0" />}
              </div>
              <span className={`font-medium ${isChecked ? "text-brand-900 line-through opacity-70" : "text-foreground"}`}>
                {item.text}
              </span>
            </button>
          );
        })}
      </div>

      {progress === 100 && (
        <div className="mt-6 p-4 rounded-xl bg-accent-50 border border-accent-200 text-accent-700 text-center font-bold animate-in fade-in zoom-in duration-500">
          🎉 Awesome! You are 100% ready to vote. 
        </div>
      )}
    </div>
  );
}
