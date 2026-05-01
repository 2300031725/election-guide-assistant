"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  quickReplies?: string[];
};

const INITIAL_QUICK_REPLIES = [
  "Register to Vote",
  "Election Timeline",
  "Can I Vote?",
  "What documents are needed?",
  "Where is my booth?",
  "I lost my voter card"
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello 👋\nI’m your Election Guide Assistant.\nI can help with:\n\n✅ Registration\n✅ Voting dates\n✅ Required documents\n✅ Booth location\n✅ Election steps",
      quickReplies: INITIAL_QUICK_REPLIES
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const generateMockResponse = async (text: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const lowerInput = text.toLowerCase();
    
    let botResponse = "I’ll help you understand how to vote step by step. What specifically would you like to know about the election process?";
    let quickReplies = ["Register to Vote", "Election Timeline", "Can I Vote?"];

    if (lowerInput.includes("register")) {
      botResponse = "To register, follow these steps:\n\n1. Visit the official voter portal\n2. Fill out Form 6\n3. Upload ID and address proof\n4. Submit application\n5. Track status\n\nWould you like the official link or do you need to correct existing details?";
      quickReplies = ["First-time voter", "Need correction", "Transfer address", "Can I Vote?"];
    } else if (lowerInput.includes("date") || lowerInput.includes("timeline") || lowerInput.includes("when")) {
      botResponse = "The upcoming voting day for your region is currently scheduled for:\n\n📅 May 15, 2026\n\nWould you like a reminder?";
      quickReplies = ["Yes, remind me", "Show timeline dates", "Where is my booth?"];
    } else if (lowerInput.includes("can i vote") || lowerInput.includes("eligible") || lowerInput.includes("eligibility")) {
      botResponse = "To be eligible, you must answer 'Yes' to these questions:\n\n1. Are you 18 years or older?\n2. Are you a citizen?\n3. Are you registered as a voter?\n\nIf you answer Yes to all, you are eligible to vote! ✅";
      quickReplies = ["Register to Vote", "What documents are needed?", "Where is my booth?"];
    } else if (lowerInput.includes("document")) {
      botResponse = "You may need the following documents:\n\n✅ Voter ID (EPIC)\n✅ Aadhaar Card\n✅ Passport\n✅ Driving License\n✅ PAN Card (if accepted)\n\nWould you like registration documents or voting day documents?";
      quickReplies = ["Registration documents", "Voting day documents", "I lost my voter card"];
    } else if (lowerInput.includes("booth") || lowerInput.includes("where")) {
      botResponse = "You can find your polling booth on the official election portal. Typically, it will be the closest Government School or public building to your registered address.\n\n📍 Example: Government School, Main Road.";
      quickReplies = ["Can I Vote?", "What documents are needed?"];
    } else if (lowerInput.includes("lost") || lowerInput.includes("card")) {
      botResponse = "No problem 👍 If you lost your voter card, you can still vote!\n\nYou can:\n- Download a digital voter slip\n- Reapply for a duplicate card\n- Use an alternate ID proof (like Aadhaar) on voting day.\n\nWould you like reissue steps?";
      quickReplies = ["Reissue steps", "What documents are needed?"];
    } else if (lowerInput.includes("remind") || lowerInput.includes("yes")) {
      botResponse = "Saved successfully ✅\n\nI will remind you 3 days before voting day. Is there anything else you need help with?";
      quickReplies = ["Register to Vote", "Election Timeline", "No, thank you"];
    } else if (lowerInput.includes("confused") || lowerInput.includes("help")) {
      botResponse = "No worries 👍 I’ll explain in simple steps. Let's start from the beginning. Are you already registered to vote?";
      quickReplies = ["Yes, I am registered", "No, I need to register"];
    } else if (lowerInput.includes("first time")) {
      botResponse = "That’s great 🎉 I’ll guide you completely. The first step is to get registered. Do you have an Aadhaar card or Passport ready for ID proof?";
      quickReplies = ["Yes, I have ID", "What documents are needed?"];
    }

    return { text: botResponse, quickReplies };
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    // Remove quick replies from previous messages
    setMessages((prev) => 
      prev.map(msg => msg.role === "assistant" ? { ...msg, quickReplies: undefined } : msg)
    );

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await generateMockResponse(text);
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: "assistant", 
        content: response.text,
        quickReplies: response.quickReplies
      };
      
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 md:py-8 h-[calc(100vh-4rem)]">
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto mb-4 bg-card border border-border rounded-2xl shadow-sm p-4 flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={18} />
                </div>
              )}
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 mt-1">
                  <User size={18} />
                </div>
              )}
              <div className={`px-5 py-3.5 rounded-2xl shadow-sm ${msg.role === "user" ? "bg-brand-600 text-white rounded-tr-none" : "bg-brand-50 dark:bg-brand-900/20 text-foreground rounded-tl-none border border-brand-100 dark:border-brand-900/50"}`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
            
            {/* Quick Replies below assistant message */}
            {msg.role === "assistant" && msg.quickReplies && msg.quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 ml-11">
                {msg.quickReplies.map((reply, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleSend(reply)}
                    disabled={isLoading}
                    className="inline-flex items-center gap-1.5 text-sm bg-card border border-brand-200 dark:border-brand-800 px-4 py-2 rounded-full hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-all text-brand-700 dark:text-brand-300 font-medium disabled:opacity-50 shadow-sm"
                  >
                    <Sparkles size={14} />
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 flex items-center justify-center shrink-0">
              <Bot size={18} />
            </div>
            <div className="px-5 py-4 rounded-2xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-900/50 rounded-tl-none flex items-center gap-3 text-brand-600 dark:text-brand-400 shadow-sm">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm font-medium">Checking my sources...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="bg-card border border-border rounded-2xl p-2 shadow-sm flex items-end gap-2 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask me anything about elections..."
          className="flex-1 max-h-32 min-h-[44px] bg-transparent outline-none resize-none px-3 py-3 text-foreground"
          rows={1}
        />
        <button 
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="h-[44px] w-[44px] rounded-xl bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 disabled:opacity-50 disabled:hover:bg-brand-600 transition-colors shrink-0 shadow-sm"
        >
          <Send size={18} />
        </button>
      </div>

    </div>
  );
}
