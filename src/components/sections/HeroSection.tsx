import React from "react";
import { ArrowRight, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import profileData from "../../data/profile.json";
import { useTypingEffect } from "../../hooks/useTypingEffect";
import { GlitchText } from "../ui/GlitchText";

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const currentTitle = useTypingEffect(profileData.titles, 70, 35, 1800);

  return (
    <section id="about-intro" className="w-full bg-background relative overflow-hidden pt-12 pb-24 md:pb-32">
      {/* Global paper noise & hairline horizontal lines */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none texture-horizontal-lines" />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none texture-noise" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Editorial Top Bar / Issue Marker */}
        <div className="flex flex-wrap items-center justify-between border-b-2 border-foreground pb-3 mb-10 font-mono text-xs uppercase tracking-widest text-foreground">
          <span className="flex items-center gap-2 font-bold">
            <span className="w-2.5 h-2.5 bg-foreground inline-block" />
            {profileData.dossierVolume}
          </span>
          <span className="hidden md:inline-block text-muted-foreground">
            FRONTEND DEVELOPMENT × DIGITAL DESIGN
          </span>
          <span className="font-bold">STATUS: {profileData.status}</span>
        </div>

        {/* Main Hero Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Massive Editorial Headline & Introduction */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="space-y-0">
              <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground leading-[0.95]">
                Hello, I&apos;m
              </h1>
              <h1 className="w-fit font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl italic font-bold tracking-tight text-foreground leading-[0.95] mt-1 sm:mt-2">
                <GlitchText text="Deepak H" underline />
              </h1>
            </div>

            {/* Dynamic Typing Title Badge */}
            <div className="mt-8 inline-flex items-center self-start border-2 border-foreground bg-background px-4 py-2">
              <span className="relative flex h-2 w-2 mr-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full bg-foreground opacity-80" />
                <span className="relative inline-flex h-2 w-2 bg-foreground" />
              </span>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-foreground font-bold min-h-[1.25rem]">
                {currentTitle}
              </span>
              <span className="inline-block w-2 h-4 bg-foreground ml-1.5 animate-pulse" />
            </div>

            {/* Professional Summary */}
            <p className="font-body text-lg sm:text-xl text-foreground max-w-2xl mt-6 leading-relaxed">
              {profileData.summary}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-4">
              <button
                onClick={() => navigate("/projects")}
                className="inline-flex items-center justify-center bg-foreground text-background border-2 border-foreground px-7 py-3.5 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-background hover:text-foreground transition-colors! duration-400! ease-in-out cursor-pointer focus-visible:outline focus-visible:outline-[3px] outline-offset-[3px] outline-foreground"
              >
                View Projects <ArrowRight size={16} className="ml-2" />
              </button>

              <a
                href={profileData.resumeUrl}
                download="Deepak_Haridass_Resume.pdf"
                className="inline-flex items-center justify-center bg-transparent text-foreground border-2 border-foreground px-7 py-3.5 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-foreground hover:text-background transition-colors! duration-400! ease-in-out cursor-pointer focus-visible:outline focus-visible:outline-[3px] outline-offset-[3px] outline-foreground"
              >
                Download Resume <Download size={16} className="ml-2" />
              </a>

              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center justify-center text-foreground font-mono text-xs sm:text-sm uppercase tracking-widest font-bold underline underline-offset-8 decoration-2 hover:decoration-4 transition-all py-3 cursor-pointer"
              >
                Contact / Inquire
              </button>
            </div>
          </div>

          {/* Right Column: Specimen Frame & Spec Sheet */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="relative border-2 border-foreground bg-card p-2">
              <div className="w-full aspect-square overflow-hidden bg-foreground relative grayscale contrast-125 hover:grayscale-0 transition-all duration-300">
                <img
                  src={profileData.profileImage}
                  alt="High-contrast studio portrait of Deepak H, Computer Science Engineer"
                  className="w-full h-full object-cover object-[center_20%]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to local high-contrast specimen silhouette if remote URL fails
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23000000'/%3E%3Ccircle cx='200' cy='150' r='70' fill='%23ffffff'/%3E%3Cpath d='M80 340 c0-70 50-110 120-110 s120 40 120 110 Z' fill='%23ffffff'/%3E%3Ctext x='200' y='380' font-family='monospace' font-size='16' fill='%23ffffff' text-anchor='middle'%3EFIG. 01 — SPECIMEN%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute bottom-2 left-2 bg-foreground text-background px-2 py-0.5 font-mono text-[11px] uppercase font-bold">
                  FIG. 01 — DEEPAK H
                </div>
              </div>
            </div>

            {/* Technical Metadata Spec Sheet */}
            <div className="border-2 border-foreground bg-card p-3 font-mono text-xs space-y-1.5">
              <div className="flex justify-between border-b border-border-light pb-1">
                <span className="text-muted-foreground">INDEX ID:</span>
                <span className="font-bold text-foreground">{profileData.indexId}</span>
              </div>
              <div className="flex justify-between border-b border-border-light pb-1">
                <span className="text-muted-foreground">DISCIPLINE:</span>
                <span className="font-bold text-foreground">FULL-STACK / UX / PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Delimiter Marker */}
        <div className="relative mt-20 flex items-center justify-center">
          <div className="w-full h-[4px] bg-foreground" />
          <div className="absolute bg-background px-4 flex items-center gap-2 border-2 border-foreground py-1">
            <div className="w-3 h-3 bg-foreground" />
            <span className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
              PROLOGUE
            </span>
            <div className="w-3 h-3 bg-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};
