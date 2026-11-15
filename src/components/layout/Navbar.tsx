import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Link, NavLink, useLocation } from "react-router-dom";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const prevRect = useRef<{ left: number; width: number } | null>(null);

  const navLinks = [
    { to: "/", label: "ABOUT" },
    { to: "/education", label: "EDUCATION" },
    { to: "/domains", label: "DOMAINS" },
    { to: "/projects", label: "PROJECTS" },
    { to: "/contact", label: "CONTACT" },
  ];

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Slide the black box to the active menu item
  useLayoutEffect(() => {
    const place = (animate: boolean) => {
      const nav = navRef.current;
      const el = indicatorRef.current;
      if (!nav || !el) return;

      const active = nav.querySelector<HTMLElement>('a[aria-current="page"]');
      if (!active || active.offsetWidth === 0) {
        el.style.display = "none";
        prevRect.current = null;
        return;
      }

      const next = { left: active.offsetLeft, width: active.offsetWidth };
      el.style.display = "block";
      el.style.left = next.left + "px";
      el.style.width = next.width + "px";

      if (animate && prevRect.current) {
        el.animate(
          [
            { left: prevRect.current.left + "px", width: prevRect.current.width + "px" },
            { left: next.left + "px", width: next.width + "px" },
          ],
          { duration: 500, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
        );
      }
      prevRect.current = next;
    };

    place(true);
    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [location.pathname]);

  return (
    <>
      {/* Skip to Content Accessible Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[110] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:font-mono focus:text-xs focus:uppercase focus:font-bold border-2 border-background"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 left-0 w-full z-40 bg-background border-b-2 border-foreground relative">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
          {/* Brand Wordmark Zone */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/"
              className="w-10 h-10 border-2 border-foreground bg-foreground text-background flex items-center justify-center font-mono text-sm tracking-widest font-bold hover:bg-background hover:text-foreground transition-colors! duration-300! cursor-pointer focus-visible:outline focus-visible:outline-[3px] outline-offset-[3px]"
              aria-label="Deepak H About page"
            >
              DH
            </Link>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-mono text-xs uppercase font-bold text-foreground tracking-widest">
                Deepak H
              </span>
              <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider">
                Portfolio
              </span>
            </div>
          </div>

          {/* Nav Links Zone (Desktop) */}
          <nav
            ref={navRef}
            aria-label="Primary Navigation"
            className="relative hidden xl:flex items-center gap-2 text-xs font-mono uppercase tracking-widest shrink-0 xl:translate-x-35"
          >
            {/* Sliding black box */}
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="hidden absolute top-0 bottom-0 bg-foreground pointer-events-none"
            />

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to !== "/domains"}
                className={({ isActive }) =>
                  `relative z-10 px-4 py-2 border-2 font-bold cursor-pointer transition-colors duration-500 focus-visible:outline focus-visible:outline-[3px] outline-offset-[3px] outline-foreground ${
                    isActive
                      ? "border-transparent text-background"
                      : "border-transparent text-foreground hover:border-foreground"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Zone */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="xl:hidden w-10 h-10 border-2 border-foreground bg-background text-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-none cursor-pointer focus-visible:outline focus-visible:outline-[3px] outline-offset-[3px] outline-foreground"
            >
              {mobileMenuOpen ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div
              id="mobile-navigation"
              role="dialog"
              aria-label="Mobile Navigation"
              className="absolute right-4 top-full z-50 w-64 max-w-[calc(100vw-2rem)] border-2 border-foreground bg-foreground text-background p-3 sm:right-8"
            >
              <div className="flex items-center justify-between border-b border-neutral-700 pb-2 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-300">
                  Navigation
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="w-10 h-10 flex items-center justify-center text-background hover:bg-background hover:text-foreground transition-colors"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>
              <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to !== "/domains"}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `min-h-10 px-3 py-2 font-mono text-sm uppercase tracking-wider flex items-center justify-between border-l-2 transition-colors ${
                        isActive
                          ? "border-background bg-background text-foreground"
                          : "border-transparent text-background hover:border-neutral-400 hover:bg-neutral-800"
                      }`
                    }
                  >
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};