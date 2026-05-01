"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
  category: string;
};

const faqs: FAQ[] = [
  {
    category: "Eligibility & Registration",
    question: "Who can vote in the elections?",
    answer: "Any citizen who is 18 years of age or older on the qualifying date (usually Jan 1st of the election year) and is enrolled in the voter list can vote. People of unsound mind or those convicted of certain criminal offenses are disqualified from voting."
  },
  {
    category: "Eligibility & Registration",
    question: "How do I register to vote?",
    answer: "You can register online through the National Voters' Service Portal or offline by filling out Form 6 and submitting it to your Electoral Registration Officer (ERO) or Booth Level Officer (BLO)."
  },
  {
    category: "Eligibility & Registration",
    question: "Can NRIs (Non-Resident Indians) vote?",
    answer: "Yes, an NRI who is a citizen of India, hasn't acquired citizenship of any other country, and is otherwise eligible can vote. You must register using Form 6A and cast your vote in person at your designated polling booth in India."
  },
  {
    category: "Voting Process",
    question: "What if my voter ID card is lost?",
    answer: "If you lose your voter ID (EPIC), you can still vote if your name is on the electoral roll. You will need to show an alternative photo ID document (like Aadhaar, Passport, Driving License, PAN card, etc.) at the polling booth."
  },
  {
    category: "Voting Process",
    question: "Can I vote without a Voter ID card?",
    answer: "Yes, as long as your name is on the official voter list (electoral roll) for your constituency. You must carry one of the officially approved alternative photo identity cards to prove your identity."
  },
  {
    category: "Voting Process",
    question: "How do I find my polling booth?",
    answer: "You can find your polling booth online using the Electoral Search portal by entering your EPIC number or personal details. Alternatively, you can use the Voter Helpline app or text your EPIC number to the designated SMS helpline."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  let globalIndex = 0;

  return (
    <div className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
      
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-600 mb-6">
          <MessageCircleQuestion size={32} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-foreground">Frequently Asked Questions</h1>
        <p className="text-lg text-foreground/70">
          Find quick answers to common questions about the voting process, eligibility, and required documents.
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
          <div key={category} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-brand-700 dark:text-brand-300 border-b border-border pb-2">{category}</h2>
            <div className="space-y-3">
              {categoryFaqs.map((faq) => {
                const currentIndex = globalIndex++;
                const isOpen = openIndex === currentIndex;
                
                return (
                  <div key={currentIndex} className="border border-border rounded-xl overflow-hidden transition-all duration-200">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : currentIndex)}
                      className="flex w-full items-center justify-between p-4 text-left font-semibold text-foreground hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {faq.question}
                      <ChevronDown 
                        className={`text-brand-500 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`} 
                        size={20} 
                      />
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-4 pt-0 text-foreground/70 leading-relaxed border-t border-border mt-2 bg-brand-50/30 dark:bg-brand-900/10">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
