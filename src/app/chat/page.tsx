"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();
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

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    // Remove quick replies from previous messages
    setMessages((prev) => 
      prev.map(msg => msg.role === "assistant" ? { ...msg, quickReplies: undefined } : msg)
    );

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Connect to Gemini Backend API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: "assistant", 
        content: data.text || "I'm having trouble connecting right now. Please try again.",
        quickReplies: data.quickReplies || []
      };
      
      setMessages((prev) => [...prev, botMsg]);

      // TODO: Save to Firestore if user is authenticated
      if (user) {
        // await saveToFirestore(user.uid, newMessages, botMsg);
      }

    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 md:py-8 h-[calc(100vh-4rem)]" aria-label="Chat Interface">
      
      {/* Chat Area */}
      <section className="flex-1 overflow-y-auto mb-4 bg-card border border-border rounded-2xl shadow-sm p-4 flex flex-col gap-4" aria-live="polite" aria-atomic="false">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 flex items-center justify-center shrink-0 mt-1" aria-hidden="true">
                  <Bot size={18} />
                </div>
              )}
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 mt-1" aria-hidden="true">
                  <User size={18} />
                </div>
              )}
              <div className={`px-5 py-3.5 rounded-2xl shadow-sm ${msg.role === "user" ? "bg-brand-600 text-white rounded-tr-none" : "bg-brand-50 dark:bg-brand-900/20 text-foreground rounded-tl-none border border-brand-100 dark:border-brand-900/50"}`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
            
            {/* Quick Replies below assistant message */}
            {msg.role === "assistant" && msg.quickReplies && msg.quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 ml-11" aria-label="Suggested quick replies">
                {msg.quickReplies.map((reply, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleSend(reply)}
                    disabled={isLoading}
                    className="inline-flex items-center gap-1.5 text-sm bg-card border border-brand-200 dark:border-brand-800 px-4 py-2 rounded-full hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-all text-brand-700 dark:text-brand-300 font-medium disabled:opacity-50 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    aria-label={`Ask: ${reply}`}
                  >
                    <Sparkles size={14} aria-hidden="true" />
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start" aria-live="assertive">
            <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 flex items-center justify-center shrink-0" aria-hidden="true">
              <Bot size={18} />
            </div>
            <div className="px-5 py-4 rounded-2xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-900/50 rounded-tl-none flex items-center gap-3 text-brand-600 dark:text-brand-400 shadow-sm">
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              <span className="text-sm font-medium">Checking my sources...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </section>

      {/* Input Area */}
      <section className="bg-card border border-border rounded-2xl p-2 shadow-sm flex items-end gap-2 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
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
          aria-label="Ask election question"
          className="flex-1 max-h-32 min-h-[44px] bg-transparent outline-none resize-none px-3 py-3 text-foreground"
          rows={1}
        />
        <button 
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          aria-label="Send Message"
          className="h-[44px] w-[44px] rounded-xl bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 disabled:opacity-50 disabled:hover:bg-brand-600 transition-colors shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <Send size={18} aria-hidden="true" />
        </button>
      </section>

    </main>
  );
}
