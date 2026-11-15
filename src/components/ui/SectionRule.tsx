import React from "react";

interface SectionRuleProps {
  label?: string;
  thick?: boolean;
}

export const SectionRule: React.FC<SectionRuleProps> = ({ label, thick = true }) => {
  if (label) {
    return (
      <div className="relative w-full my-8 flex items-center justify-center">
        <div className={`w-full ${thick ? "h-[4px]" : "h-[2px]"} bg-foreground transition-colors`} />
        <div className="absolute bg-background px-4 flex items-center gap-2 border border-foreground py-0.5">
          <div className="w-2.5 h-2.5 bg-foreground" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-foreground">
            {label}
          </span>
          <div className="w-2.5 h-2.5 bg-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`w-full ${thick ? "h-[4px]" : "h-[2px]"} bg-foreground transition-colors`}
    />
  );
};
