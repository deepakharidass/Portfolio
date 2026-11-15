import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import profileData from "../../data/profile.json";

export const Footer: React.FC = () => {
  const creatorName = profileData.name.toUpperCase().replace(/\s+/g, "_");

  return (
    <footer className="w-full bg-background text-foreground border-t border-foreground transition-colors duration-150">
      <div className="flex flex-col items-center text-center gap-3 px-6 py-8">
        <p className="font-mono text-xs uppercase tracking-wider font-bold">
          © {new Date().getFullYear()} {profileData.name.toUpperCase()}. ALL RIGHTS RESERVED.
        </p>
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">
          CRAFTED_BY_{creatorName} // SYSTEM_UPTIME_100% // [V.1.0.1-STABLE]
        </p>

        <nav aria-label="Social links" className="flex items-center gap-6 pt-2">
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Deepak H on GitHub"
            className="inline-flex items-center justify-center p-2 border-2 border-transparent text-foreground hover:bg-foreground hover:text-background transition-colors duration-600">
            <Github size={20} strokeWidth={1.8} aria-hidden="true" />
          </a>
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Deepak H on LinkedIn"
            className="inline-flex items-center justify-center p-2 border-2 border-transparent text-foreground hover:bg-foreground hover:text-background transition-colors duration-600">
            <Linkedin size={20} strokeWidth={1.8} aria-hidden="true" />
          </a>
          <a
            href={`mailto:${profileData.email}`}
            aria-label="Send email to Deepak H"
            className="inline-flex items-center justify-center p-2 border-2 border-transparent text-foreground hover:bg-foreground hover:text-background transition-colors duration-600">
            <Mail size={20} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </footer>
  );
};
