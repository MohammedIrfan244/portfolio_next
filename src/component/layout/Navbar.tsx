"use client";

import React, { useState, useEffect } from "react";
import { inter } from "@/lib/font";
import { motion } from "framer-motion";
import { useLenisScroll } from "@/lib/hooks/useLenisScroll";

function Navbar() {
  const lenis = useLenisScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (lenis) {
      lenis.on("scroll", ({ scroll }: { scroll: number }) => {
        setIsScrolled(scroll > 50);
      });
    }
  }, [lenis]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return (
    <motion.div
      className={`fixed select-none w-full flex justify-between items-center py-5 md:py-7 lg:py-7 px-6 md:px-7 lg:px-10 font-bold text-black z-30 transition-all duration-300 ${inter.className} ${
        isScrolled ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="relative inline-block">
        <motion.a
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          href="#"
          onClick={(e) => handleSmoothScroll(e, "top")}
          className="text-lg tracking-tighter cursor-none relative px-4 py-1 rounded-xl overflow-hidden"
        >
          Irfan
        </motion.a>
      </div>

      {/* Nav links */}
      <div className="flex gap-3 md:gap-5 lg:gap-6 text-base">
        {[
          { label: "Work", href: "#projects", delay: 0.1 },
          { label: "About", href: "#profile", delay: 0.2 },
          { label: "Contact", href: "#contact", delay: 0.3 },
        ].map((item) => (
          <div key={item.label} className="relative inline-block">
            <motion.a
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.delay }}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="text-sm cursor-none relative z-10 px-4 py-1 rounded-xl overflow-hidden"
            >
              {item.label}
            </motion.a>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Navbar;
