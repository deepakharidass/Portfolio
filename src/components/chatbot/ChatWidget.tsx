import React, { useState, useEffect, useRef } from "react";
import { Bot, X, Trash2, ArrowUp } from "lucide-react";
import chatbotData from "../../data/chatbotData.json";
import { ChatMessage } from "../../types";
import { CARD_ACTION_HOVER_CLASSES, CARD_HOVER_CLASSES } from "../ui/cardHover";

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro-msg",
      role: "assistant",
      content:
        "Greetings. I am Deepak's automated portfolio concierge. How may I assist your review of his engineering accomplishments?",
      timestamp: "00:01",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  // Esc key closes chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const getTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSendMessage = async (userText: string) => {
    const text = userText.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.reply || getLocalGroundedResponse(text);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content: reply,
            timestamp: getTime(),
          },
        ]);
      } else {
        // Fallback to local grounded knowledge base
        const reply = getLocalGroundedResponse(text);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content: reply,
            timestamp: getTime(),
          },
        ]);
      }
    } catch {
      // Offline fallback
      const reply = getLocalGroundedResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: reply,
          timestamp: getTime(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Local knowledge-based answer generator strictly answering from portfolio data
  const getLocalGroundedResponse = (query: string): string => {
    const q = query.toLowerCase();

    // Check exact FAQ matches first
    for (const item of chatbotData.faq) {
      if (
        q.includes(item.q.toLowerCase().replace("?", "").slice(0, 15)) ||
        (q.includes("skill") && item.q.toLowerCase().includes("skill")) ||
        (q.includes("frontend project") && item.q.toLowerCase().includes("frontend")) ||
        (q.includes("management tool") && item.q.toLowerCase().includes("management")) ||
        (q.includes("ui/ux") && item.q.toLowerCase().includes("ui/ux"))
      ) {
        return item.a;
      }
    }

    if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("cgpa")) {
      return `${chatbotData.profile.education}`;
    }

    if (q.includes("frontend") || q.includes("react") || q.includes("next") || q.includes("typescript")) {
      return `Deepak's Frontend competencies include ${chatbotData.skillsSummary.frontend} Featured frontend systems include 'Aether Financial Analytics Core' and 'Broadsheet: Text Composition Studio'.`;
    }

    if (q.includes("project management") || q.includes("agile") || q.includes("scrum") || q.includes("jira")) {
      return `Deepak is a Certified Scrum Master (CSM). His project management proficiencies include ${chatbotData.skillsSummary.projectManagement} Notable PM systems include 'Orchestrate: Agile Sprint Engine' and 'Vanguard SRE Incident Matrix'.`;
    }

    if (q.includes("ui") || q.includes("ux") || q.includes("figma") || q.includes("design system") || q.includes("prototype")) {
      return `Deepak's UI/UX expertise includes ${chatbotData.skillsSummary.uiux} Notable UI/UX systems include 'Kinesis Minimalist Token Library' and 'Apex Micro-Investment Gateway'.`;
    }

    if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach") || q.includes("phone")) {
      return `${chatbotData.profile.contact} ${chatbotData.profile.availability}`;
    }

    if (q.includes("deepak") || q.includes("who") || q.includes("about") || q.includes("summary")) {
      return `${chatbotData.profile.summary} Career objective: ${chatbotData.profile.careerObjective} Located in ${chatbotData.profile.location}.`;
    }

    if (q.includes("project") || q.includes("work") || q.includes("case")) {
      return `Deepak has completed 6 flagship works across three pillars: 1) Aether Financial Analytics Core (Next.js 14/WebSockets); 2) Orchestrate Agile Sprint Engine (Linear/Jira); 3) Kinesis Minimalist Token Library (Figma/Tailwind); 4) Broadsheet Composition Studio (React/Web Workers); 5) Vanguard SRE Incident Matrix (Grafana/PagerDuty); and 6) Apex Micro-Investment Gateway (Figma/WCAG 2.1 AAA).`;
    }

    return "That information isn't available in Deepak's portfolio. You may inquire directly via email at deepakharidass1@gmail.com or use the Contact form.";
  };

  const clearChat = () => {
    setMessages([
      {
        id: "intro-msg",
        role: "assistant",
        content:
          "Conversation history reset. How may I assist your inspection of Deepak's engineering dossier?",
        timestamp: getTime(),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="AI Portfolio Concierge"
          className={`${CARD_HOVER_CLASSES} mb-3 w-[calc(100vw-3rem)] sm:w-96 max-h-[80vh] h-[540px] border-4 border-foreground bg-card flex flex-col`}
        >
          {/* Header Bar (Inverted) */}
          <div className="bg-foreground text-background p-3 flex items-center justify-between border-b-2 border-foreground shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-background animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold">
                DH-AI // EDITORIAL AGENT
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                title="Clear chat history"
                aria-label="Clear chat history"
                className={`${CARD_ACTION_HOVER_CLASSES} text-background hover:opacity-70 p-1 cursor-pointer`}
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close AI chat modal"
                className={`${CARD_ACTION_HOVER_CLASSES} text-background hover:opacity-70 p-1 cursor-pointer`}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div
            aria-live="polite"
            className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs bg-background"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 border-2 ${
                  msg.role === "user"
                    ? "bg-foreground text-background border-foreground ml-6"
                    : "bg-card text-foreground border-foreground mr-4"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1 opacity-70 uppercase font-bold">
                  <span>{msg.role === "user" ? "INQUIRER" : "ASSISTANT"}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="leading-relaxed font-body text-sm font-normal">
                  {msg.content}
                </p>
              </div>
            ))}

            {/* Stepped Blinking Indicator */}
            {isTyping && (
              <div className="border-2 border-foreground bg-card p-3 mr-6 inline-block">
                <div className="flex items-center gap-1.5 py-1">
                  <span className="w-2 h-2 bg-foreground animate-ping" />
                  <span className="w-2 h-2 bg-foreground animate-pulse" />
                  <span className="w-2 h-2 bg-foreground" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Strip */}
          <div className="p-2 border-t-2 border-foreground bg-muted flex flex-col gap-1.5 shrink-0 max-h-28 overflow-y-auto">
            <span className="font-mono text-[10px] uppercase text-muted-foreground font-bold">
              SUGGESTED DISPATCHES:
            </span>
            <div className="flex flex-wrap gap-1">
              {chatbotData.suggestedPrompts.slice(0, 3).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className={`${CARD_ACTION_HOVER_CLASSES} text-left border border-foreground px-2 py-1 bg-card hover:bg-foreground hover:text-background text-[10px] font-mono uppercase font-semibold cursor-pointer`}
                >
                  › {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="border-t-2 border-foreground p-2.5 bg-card flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="TRANSMIT QUERY..."
              className="w-full bg-background border-2 border-foreground px-3 py-2 font-mono text-xs text-foreground uppercase placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send query to AI"
              className={`${CARD_ACTION_HOVER_CLASSES} bg-foreground text-background w-10 h-10 border-2 border-foreground flex items-center justify-center hover:bg-background hover:text-foreground cursor-pointer disabled:opacity-50 shrink-0`}
            >
              <ArrowUp size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Portfolio Concierge"
        aria-expanded={isOpen}
        className="hover:bg-background hover:text-foreground transition-colors! duration-300! border-2 border-foreground bg-foreground text-background px-5 py-3 flex items-center gap-2.5 hover:bg-background hover:text-foreground transition-none font-mono text-xs uppercase font-bold tracking-widest cursor-pointer focus-visible:outline focus-visible:outline-[3px] outline-offset-[3px] outline-foreground">
        <Bot size={18} strokeWidth={1.5} />
        <span>ASK AI</span>
      </button>
    </div>
  );
};
