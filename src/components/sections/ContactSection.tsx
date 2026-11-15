import React, { useState } from "react";
import { Check, AlertCircle, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import profileData from "../../data/profile.json";
import { ContactFormData } from "../../types";
import { getWhatsAppUrl } from "../../utils/contact";
import { CARD_ACTION_HOVER_CLASSES, CARD_HOVER_CLASSES } from "../ui/cardHover";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus("idle");
    setStatusMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Honeypot bot protection
    if (formData.honeypot) {
      setStatus("success");
      setStatusMessage("Transmission received and verified.");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setStatus("error");
      setStatusMessage("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setStatus("error");
      setStatusMessage("Enter a valid email address so I can reply to you.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result: { success?: boolean; message?: string; error?: string } =
        await response.json();

      if (!response.ok || !result.success) {
        setStatus("error");
        setStatusMessage(result.error || "Message delivery failed. Please try again.");
        return;
      }

      setStatus("success");
      setStatusMessage(result.message || "Your message was delivered successfully.");
      setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
      setStatusMessage("Unable to deliver your message right now. Please try again.");
    }
  };

  return (
    <section id="contact" className="w-full bg-background pt-12 pb-20 md:pt-20 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Heading Bar */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs uppercase bg-foreground text-background px-2.5 py-1 font-bold">
            CONTACT
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            I’D LOVE TO HEAR FROM YOU
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Editorial Title & Direct Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl uppercase text-foreground leading-tight mb-4">
                Let’s talk.
              </h2>
              <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                Have a question, opportunity, or idea? Send me a message and I’ll get back to you as soon as I can.
              </p>
            </div>

          <div className={`${CARD_HOVER_CLASSES} border-2 border-foreground bg-card p-6 space-y-4 font-mono text-xs`}>
              <div>
                <span className="text-muted-foreground uppercase font-bold block mb-1">
                  TRANSMITTING DATA TO
                </span>
                <a
                  href={`mailto:${profileData.email}`}
                  className={`${CARD_ACTION_HOVER_CLASSES} font-bold text-foreground select-all text-sm hover:underline`}
                >
                  {profileData.email}
                </a>
              </div>
              
            <div>
                <span className="text-muted-foreground uppercase font-bold block mb-1">
                  AVAILABILITY
                </span>
                <span className="text-foreground">
                    Based in India (IST) • Open to full-time opportunities
                </span>
            </div>

            <div>
                <span className="text-muted-foreground uppercase font-bold block mb-1">
                  LOCATION
                </span>
                <span className="text-muted-foreground font-mono text-[11px] break-all">
                  Vellore, Tamil Nadu • Open to opportunities in Chennai and Bengaluru, and to relocation
                </span>
            </div>
          </div>
        </div>

          {/* High-Precision Transmission Form */}
          <div className={`${CARD_HOVER_CLASSES} lg:col-span-7 border-2 border-foreground bg-card p-6 sm:p-10`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Spam Honeypot Field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="font-mono text-xs uppercase font-bold text-foreground mb-1.5"
                  >
                    NAME *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    minLength={2}
                    maxLength={100}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-transparent border-b-2 border-foreground py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground placeholder:italic focus:outline-none focus:border-b-4 focus:border-foreground transition-all rounded-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="font-mono text-xs uppercase font-bold text-foreground mb-1.5"
                  >
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    maxLength={100}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-transparent border-b-2 border-foreground py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground placeholder:italic focus:outline-none focus:border-b-4 focus:border-foreground transition-all rounded-none"
                  />
                </div>
              </div>

              {/* Row 2: Subject */}
              <div className="flex flex-col">
                <label
                  htmlFor="subject"
                  className="font-mono text-xs uppercase font-bold text-foreground mb-1.5"
                >
                  SUBJECT *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  minLength={2}
                  maxLength={150}
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="w-full bg-transparent border-b-2 border-foreground py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground placeholder:italic focus:outline-none focus:border-b-4 focus:border-foreground transition-all rounded-none"
                />
              </div>

              {/* Row 3: Message Body */}
              <div className="flex flex-col">
                <label
                  htmlFor="message"
                  className="font-mono text-xs uppercase font-bold text-foreground mb-1.5"
                >
                  MESSAGE *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  minLength={10}
                  maxLength={2500}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full bg-transparent border-b-2 border-foreground py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground placeholder:italic focus:outline-none focus:border-b-4 focus:border-foreground transition-all rounded-none resize-none"
                />
              </div>

              {/* Status Notifications */}
              {status === "success" && (
                <div className="border-2 border-foreground p-4 bg-muted font-mono text-xs text-foreground flex items-center gap-3">
                  <Check size={18} className="text-foreground shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === "error" && (
                <div className="border-2 border-foreground p-4 bg-background font-mono text-xs text-foreground flex items-center gap-3">
                  <AlertCircle size={18} className="text-foreground shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Submit Section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t-2 border-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-foreground" />
                  <span className="font-mono text-xs uppercase text-muted-foreground font-semibold">
                    Your message will be sent directly to my inbox.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center bg-foreground text-background border-2 border-foreground px-8 py-3.5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-background hover:text-foreground cursor-pointer disabled:opacity-50 focus-visible:outline focus-visible:outline-[3px] outline-offset-[3px] outline-foreground"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 border-2 border-background border-t-transparent animate-spin" />
                      DISPATCHING...
                    </span>
                  ) : (
                    <span className="transition-colors! duration-250! flex items-center gap-2">
                      Send Message <Send size={14} />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <a
          href={getWhatsAppUrl("Hi, I visited your portfolio")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect with Deepak H on WhatsApp"
          className={`${CARD_HOVER_CLASSES} mt-8 w-full border-2 border-foreground bg-card text-foreground hover:bg-foreground! hover:text-background! p-5 flex items-center justify-center gap-3 font-mono text-sm uppercase tracking-widest font-bold`}
        >
          <FaWhatsapp size={20} aria-hidden="true" />
          Connect via WhatsApp
        </a>
      </div>
    </section>
  );
};
