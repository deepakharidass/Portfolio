import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} editorial mode`}
      className="w-10 h-10 border-2 border-foreground bg-background text-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-none cursor-pointer focus-visible:outline focus-visible:outline-[3px] outline-offset-[3px] outline-foreground"
    >
      {theme === "light" ? (
        <Moon size={18} strokeWidth={1.5} />
      ) : (
        <Sun size={18} strokeWidth={1.5} />
      )}
    </button>
  );
};
