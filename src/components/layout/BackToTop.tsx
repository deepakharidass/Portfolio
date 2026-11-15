import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top of document"
      className="fixed bottom-6 left-6 z-40 w-11 h-11 border-2 border-foreground bg-background text-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-none cursor-pointer focus-visible:outline focus-visible:outline-[3px] outline-offset-[3px] outline-foreground"
    >
      <ArrowUp size={20} strokeWidth={1.5} />
    </button>
  );
};
