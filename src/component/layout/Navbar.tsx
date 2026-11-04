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
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-4 sm:px-6 md:px-8 py-4 sm:py-6 pointer-events-none flex justify-center">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 rounded-full ${
          isScrolled
            ? "w-full max-w-2xl px-5 sm:px-6 py-2.5 bg-stone-950/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "w-full px-2 sm:px-4 py-2 bg-transparent"
        } ${inter.className}`}
      >
        {/* Monogram Brand Mark */}
        <a
          href="#"
          onClick={(e) => handleSmoothScroll(e, "top")}
          className="group flex items-center gap-2 cursor-pointer"
        >
          <span
            className={`font-mono text-xs sm:text-sm font-bold tracking-widest transition-colors ${
              isScrolled
                ? "text-white group-hover:text-stone-300"
                : "text-stone-900 group-hover:text-black"
            }`}
          >
            M. IRFAN
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
              className={`relative px-2.5 sm:px-3.5 py-1 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 rounded-full hover:scale-105 ${
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
