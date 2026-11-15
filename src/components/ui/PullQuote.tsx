import React from "react";
import { CARD_HOVER_CLASSES } from "./cardHover";

interface PullQuoteProps {
  quote: string;
  attribution?: string;
  reference?: string;
  className?: string;
}

export const PullQuote: React.FC<PullQuoteProps> = ({
  quote,
  attribution,
  reference,
  className = "",
}) => {
  return (
    <div
      className={`group ${CARD_HOVER_CLASSES} bg-card p-6 sm:p-8 border-2 border-foreground ${className}`}
    >
      <span
        aria-hidden="true"
        className="font-display text-7xl sm:text-8xl text-foreground absolute top-1 left-2 opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity"
      >
        “
      </span>
      <span
        aria-hidden="true"
        className="font-display text-7xl sm:text-8xl text-foreground absolute bottom-1 right-2 opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity"
      >
        ”
      </span>
      <blockquote className="font-display text-xl sm:text-2xl italic text-foreground relative z-10 leading-snug">
        {quote}
      </blockquote>
      {(attribution || reference) && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border-light pt-3">
          {attribution && (
            <span className="font-mono text-xs uppercase font-bold text-foreground tracking-wider">
              {attribution}
            </span>
          )}
          {reference && (
            <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
              {reference}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
