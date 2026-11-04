"use client";

import React, { useState, useEffect } from "react";
import { inter } from "@/lib/font";
import { motion } from "framer-motion";
import { useLenis } from "@/component/providers/SmoothScrollProvider";

function Navbar() {
  const lenis = useLenis();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!lenis) return;
    const handleScroll = ({ scroll }: { scroll: number }) => {
      setIsScrolled(scroll > 60);
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
    <header className="fixed top-0 left-0 w-full z-40 px-3 sm:px-6 md:px-8 py-3 sm:py-5 pointer-events-none flex justify-center">
      {/* The single morphing navbar container with physics-based spring morphing */}
      <motion.nav
        layout
        initial={false}
        animate={{
          maxWidth: isScrolled ? "660px" : "100%",
          backgroundColor: isScrolled ? "rgba(10, 10, 10, 0.82)" : "rgba(255, 255, 255, 0)",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0)",
          boxShadow: isScrolled ? "0 12px 36px rgba(0, 0, 0, 0.55)" : "0 0 0 rgba(0, 0, 0, 0)",
          backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
          paddingLeft: isScrolled ? "1.5rem" : "0.75rem",
          paddingRight: isScrolled ? "1.5rem" : "0.75rem",
          paddingTop: isScrolled ? "0.6rem" : "0.4rem",
          paddingBottom: isScrolled ? "0.6rem" : "0.4rem",
          y: isScrolled ? 6 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 26,
          mass: 0.8,
        }}
        className={`pointer-events-auto w-full flex items-center justify-between rounded-full border border-transparent ${inter.className}`}
      >
        {/* Monogram Brand Mark: IRFAN */}
        <a
          href="#"
          onClick={(e) => handleSmoothScroll(e, "top")}
          className="group flex items-center gap-2 cursor-pointer select-none"
        >
          <span
            className={`font-mono text-xs sm:text-sm font-bold tracking-widest transition-colors duration-300 ${
              isScrolled
                ? "text-white group-hover:text-stone-300"
                : "text-stone-900 group-hover:text-black"
            }`}
          >
            IRFAN
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2">
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
              className={`relative px-2.5 sm:px-3.5 py-1 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 rounded-full hover:scale-105 select-none ${
                isScrolled
                  ? "text-stone-300 hover:text-white hover:bg-white/10"
                  : "text-stone-700 hover:text-black hover:bg-stone-900/5"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.nav>
    </header>
  );
}

export default Navbar;
