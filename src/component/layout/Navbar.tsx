"use client";

import React, { useState, useEffect, useRef } from "react";
import { inter } from "@/lib/font";
import { useLenis } from "@/component/providers/SmoothScrollProvider";

/**
 * Navbar with CSS-only morphing transition.
 *
 * Instead of Framer Motion animate (which interpolates discrete states),
 * we use a single element with CSS transition on:
 *   - max-width (full → pill width)
 *   - padding (controls the inset shrink)
 *   - border-radius (0 → pill)
 *   - background-color (transparent → dark glass)
 *   - backdrop-filter (none → blur)
 *
 * All transitions use the same cubic-bezier for a unified morph feel.
 */
function Navbar() {
  const lenis = useLenis();
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!lenis) return;
    const handleScroll = ({ scroll }: { scroll: number }) => {
      setIsScrolled(scroll > 50);
    };
    lenis.on("scroll", handleScroll);
    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 pointer-events-none">
      {/* Centering wrapper with top padding transition */}
      <div
        className="w-full flex justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          paddingTop: isScrolled ? "12px" : "0px",
          paddingLeft: isScrolled ? "16px" : "0px",
          paddingRight: isScrolled ? "16px" : "0px",
        }}
      >
        <nav
          ref={navRef}
          className={`
            pointer-events-auto flex items-center justify-between
            px-4 sm:px-6 py-3 sm:py-3.5 border
            transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${inter.className}
          `}
          style={{
            width: "100%",
            maxWidth: isScrolled ? "48rem" : "100%",
            backgroundColor: isScrolled
              ? "rgba(12, 12, 12, 0.85)"
              : "rgba(255, 255, 255, 0)",
            borderRadius: isScrolled ? "9999px" : "0px",
            borderColor: isScrolled
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0)",
            backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
            WebkitBackdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
            boxShadow: "none",
          }}
        >
          {/* Monogram: IRFAN */}
          <a
            href="#"
            onClick={(e) => handleSmoothScroll(e, "top")}
            className="group flex items-center gap-2 cursor-pointer select-none"
          >
            <span
              className={`font-mono text-xs sm:text-sm font-bold tracking-widest transition-colors duration-700 ${
                isScrolled
                  ? "text-stone-100 group-hover:text-stone-300"
                  : "text-stone-900 group-hover:text-stone-950"
              }`}
            >
              IRFAN
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </a>

          {/* Navigation Links */}
          <div className="flex items-center gap-0.5 sm:gap-1.5">
            {[
              { label: "Work", href: "#projects" },
              { label: "About", href: "#profile" },
              { label: "Experience", href: "#experience" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`relative px-2.5 sm:px-3.5 py-1 text-xs sm:text-sm font-medium tracking-wide rounded-full select-none transition-colors duration-700 ${
                  isScrolled
                    ? "text-stone-300 hover:text-stone-100 hover:bg-white/10"
                    : "text-stone-600 hover:text-stone-950 hover:bg-stone-200/50"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
