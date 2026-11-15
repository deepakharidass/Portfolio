import React from "react";
import { FaEnvelope, FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import profileData from "../../data/profile.json";
import { PullQuote } from "../ui/PullQuote";
import { getWhatsAppUrl } from "../../utils/contact";
import { CARD_HOVER_CLASSES } from "../ui/cardHover";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full bg-background relative pt-12 pb-20 md:pt-20 md:pb-32">
      {/* 40px Architectural Grid Texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none texture-grid" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs uppercase bg-foreground text-background px-2.5 py-1 font-bold">
            DOSSIER
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            ARCHITECTURAL PROFILE &amp; PHILOSOPHY
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Biography with Boxed Drop Cap */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase text-foreground leading-tight mb-6">
                The Architecture of Purposeful Code.
              </h2>
              <div className="font-body text-base sm:text-lg text-foreground leading-relaxed space-y-4">
                <p>
                  <span className="float-left font-display text-4xl sm:text-5xl leading-[0.8] pr-3 pt-1 font-bold text-foreground border-2 border-foreground p-2 mr-3 bg-card">
                    I
                  </span>
                    am a Computer Science and Engineering graduate with an interest in building meaningful digital experiences through technology, creativity, and structured problem-solving. I focus on frontend development, responsive web design, intuitive user interfaces, and creating solutions that balance functionality with visual clarity.
                </p>
                <p>
                  My background combines technical development with project coordination and analytical thinking. From developing responsive web applications and exploring modern technologies to organizing project workflows and understanding user requirements, I aim to transform ideas into practical, user-focused digital solutions.
                </p>
              </div>
            </div>

            {/* Core Engineering Pillars Chips */}
            <div className="mt-8 pt-6 border-t-2 border-foreground">
              <span className="font-mono text-xs uppercase text-muted-foreground font-bold tracking-wider block mb-3">
                Core Engineering Pillars:
              </span>
              <div className="flex flex-wrap gap-2">
                {profileData.corePillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="inline-block border-2 border-foreground px-3 py-1 font-mono text-xs uppercase font-bold bg-card text-foreground hover:bg-foreground hover:text-background transition-colors! duration-200! ease-in-out cursor-default"                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pull Quote & Social Dispatch */}
          <div className="lg:col-span-7 flex flex-col justify-between border-l-0 lg:border-l-2 lg:border-foreground lg:pl-10">
            {/* Oversized Editorial Pull Quote */}
            <PullQuote
              quote={profileData.creed}
              attribution="DEEPAK H — PERSONAL CREED"
              reference="REF: ENG-2026"
            />

            {/* Secondary Narrative */}
            <div className="my-6 font-body text-base sm:text-lg text-muted-foreground leading-relaxed">
              {profileData.detailedBio}
            </div>

            {/* Social Connectivity Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Deepak H on LinkedIn"
                className={`${CARD_HOVER_CLASSES} hover:bg-foreground hover:text-background border-2 border-foreground p-3 flex flex-col items-center justify-center text-foreground focus-visible:outline focus-visible:outline-[3px] outline-offset-[2px]`}
              >
                <FaLinkedinIn size={16} aria-hidden="true" className="mb-1" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider mb-1">
                  LINKEDIN
                </span>
              </a>

              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Deepak H on GitHub"
                className={`${CARD_HOVER_CLASSES} hover:bg-foreground hover:text-background border-2 border-foreground p-3 flex flex-col items-center justify-center text-foreground focus-visible:outline focus-visible:outline-[3px] outline-offset-[2px]`}
              >
                <FaGithub size={16} aria-hidden="true" className="mb-1" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider mb-1">
                  GITHUB
                </span>
              </a>

              <a
                href={`mailto:${profileData.email}`}
                aria-label="Send email to Deepak H"
                className={`${CARD_HOVER_CLASSES} hover:bg-foreground hover:text-background border-2 border-foreground p-3 flex flex-col items-center justify-center text-foreground focus-visible:outline focus-visible:outline-[3px] outline-offset-[2px]`}
              >
                <FaEnvelope size={16} aria-hidden="true" className="mb-1" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider mb-1">
                  EMAIL
                </span>
              </a>

              <a
                href={getWhatsAppUrl("Hi, I visited your portfolio")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Deepak H on WhatsApp"
                className={`${CARD_HOVER_CLASSES} hover:bg-foreground hover:text-background border-2 border-foreground p-3 flex flex-col items-center justify-center text-foreground focus-visible:outline focus-visible:outline-[3px] outline-offset-[2px]`}
              >
                <FaWhatsapp size={16} aria-hidden="true" className="mb-1" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  WHATSAPP
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
