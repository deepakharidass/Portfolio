import { useState, useEffect, useRef } from "react";

export function useTypingEffect(
  phrases: string[],
  typingSpeed: number = 70,
  deletingSpeed: number = 35,
  pauseTime: number = 1600
): string {
  const [displayText, setDisplayText] = useState<string>(phrases[0] || "");
  const phraseIndexRef = useRef<number>(0);
  const charIndexRef = useRef<number>(phrases[0] ? phrases[0].length : 0);
  const isDeletingRef = useRef<boolean>(true); // start ready to transition after initial display

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    let timeoutId: NodeJS.Timeout;

    const tick = () => {
      const currentPhrase = phrases[phraseIndexRef.current] || "";

      if (!isDeletingRef.current) {
        // Typing letters forward
        charIndexRef.current += 1;
        setDisplayText(currentPhrase.substring(0, charIndexRef.current));

        if (charIndexRef.current >= currentPhrase.length) {
          // Finished typing full phrase, pause so user can read it
          isDeletingRef.current = true;
          timeoutId = setTimeout(tick, pauseTime);
          return;
        }
        timeoutId = setTimeout(tick, typingSpeed);
      } else {
        // Deleting letters backward
        charIndexRef.current -= 1;
        setDisplayText(currentPhrase.substring(0, Math.max(0, charIndexRef.current)));

        if (charIndexRef.current <= 0) {
          // Finished deleting, switch to next domain
          isDeletingRef.current = false;
          phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
          timeoutId = setTimeout(tick, 350);
          return;
        }
        timeoutId = setTimeout(tick, deletingSpeed);
      }
    };

    // After viewing the first domain for pauseTime, begin the deletion and rotation
    timeoutId = setTimeout(tick, pauseTime);

    return () => clearTimeout(timeoutId);
  }, [phrases, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}
