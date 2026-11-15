import React, { useState, useEffect } from "react";

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const top = doc.scrollTop || document.body.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total > 0) {
        setProgress((top / total) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-[3px] bg-border-light z-[100] pointer-events-none"
    >
      <div
        className="h-full bg-foreground transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
