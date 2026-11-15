import React from "react";

interface GlitchTextProps {
  text: string;
  underline?: boolean;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, underline = false }) => (
  <span
    className={`glitch-text${underline ? " glitch-text--underline" : ""}`}
    data-text={text}
    aria-label={text}
  >
    <span className="glitch-text__source">{text}</span>
    <span className="glitch-text__blue" aria-hidden="true">
      {text}
    </span>
  </span>
);
