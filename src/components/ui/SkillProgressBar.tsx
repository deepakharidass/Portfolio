import React, { useState, useEffect, useRef } from "react";

interface SkillProgressBarProps {
  name: string;
  percentage: number;
  years?: string;
  category?: string;
}

export const SkillProgressBar: React.FC<SkillProgressBarProps> = ({
  name,
  percentage,
  years,
  category,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full space-y-1.5 font-mono text-xs">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(5rem,auto)] items-start gap-x-3 gap-y-1 uppercase">
        <div className="min-w-0">
          <div className="font-semibold text-foreground tracking-wider break-words">
            {name}
          </div>
          {category && (
            <div className="mt-1 text-[10px] text-muted-foreground font-normal leading-snug">
              [{category}]
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-col items-end text-right">
          {years && (
            <span className="max-w-36 text-muted-foreground text-[10px] leading-snug break-words">
              {years}
            </span>
          )}
          <span className="mt-1 font-bold text-foreground tabular-nums whitespace-nowrap">
            {percentage}%
          </span>
        </div>
      </div>
      <div className="w-full h-2.5 border border-foreground bg-muted p-[2px]">
        <div
          className="h-full bg-foreground transition-all duration-700 ease-out"
          style={{ width: isVisible ? `${percentage}%` : "0%" }}
        />
      </div>
    </div>
  );
};
