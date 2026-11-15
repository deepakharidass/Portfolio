import React, { useState, useEffect } from "react";

export const LoadingScreen: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    // If reduced motion, skip loading screen immediately
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoaded(true);
      setUnmounted(true);
      return;
    }

    const timer = setTimeout(() => {
      setLoaded(true);
      setTimeout(() => setUnmounted(true), 300);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (unmounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] bg-black text-white flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-none ${
        loaded ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center space-y-4 px-6 max-w-md w-full">
        <div className="font-mono text-xs uppercase tracking-widest text-neutral-400">
          EDITORIAL DOSSIER • COMPREHENSIVE REPOSITORY
        </div>
        <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-tighter font-bold">
          DEEPAK H
        </h1>
        <div className="w-full h-[2px] bg-neutral-800 overflow-hidden relative">
          <div className="h-full bg-white animate-[pulse_0.6s_ease-in-out_infinite] w-full" />
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
          INITIALIZING ARCHITECTURAL GRID // 2026
        </div>
      </div>
    </div>
  );
};
