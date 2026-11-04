"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  easeIn,
  easeOut,
} from "framer-motion";
import { playfairDisplay, inter } from "@/lib/font";

function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [timeString, setTimeString] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const firstName = "Mohammed";
  const lastName = "Irfan";

  const roleIndex = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 1, 2, 3, 4, 5]
  );

  const roles = [
    "Full-Stack Engineer",
    "MERN Stack Specialist",
    "Next.js Architect",
    "UI/UX Craft Developer",
    "Freelance Consultant",
  ];

  // Localized live clock (Kerala, India / IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = roleIndex.on("change", (latest) => {
      const index = Math.round(latest);
      if (index !== currentRole && index >= 0 && index < roles.length) {
        setCurrentRole(index);
      }
    });
    return () => unsubscribe();
  }, [roleIndex, currentRole, roles.length]);

  const containerVariants = {
    initial: { opacity: 1 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    initial: { y: 25, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const roleVariants = {
    initial: { y: 15, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: easeOut,
      },
    },
    exit: {
      y: -15,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: easeIn,
      },
    },
  };

  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.45]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <motion.div
      ref={containerRef}
      className="w-full pt-24 sm:pt-28 pb-8 select-none min-h-screen px-4 sm:px-6 md:px-7 rounded-b-3xl md:rounded-b-4xl lg:px-10 flex flex-col justify-between bg-[#fafaf8] relative overflow-hidden shadow-2xl"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Live Editorial Status Strip */}
      <motion.div
        variants={itemVariants}
        className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-200/80 pb-4 text-xs font-mono tracking-wider text-stone-500"
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="text-stone-800 font-semibold uppercase">
            Available For Opportunities
          </span>
          <span className="text-stone-300">/</span>
          <span className="hidden md:inline text-stone-400">Q1 2025</span>
        </div>

        <div className="flex items-center gap-4 text-stone-600 font-mono text-[11px] sm:text-xs">
          <span>KERALA, IN (GMT+5:30)</span>
          {timeString && (
            <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-800 font-semibold">
              {timeString}
            </span>
          )}
        </div>
      </motion.div>

      {/* Centerpiece Typographic Stage */}
      <div className="flex w-full items-center justify-center py-8 md:py-16">
        <motion.div
          className="space-y-3 sm:space-y-4 text-center max-w-4xl"
          style={{ scale: nameScale, y: nameY }}
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-widest text-stone-500 font-mono font-medium"
          >
            <span>[ SYSTEM DESIGN & FULL-STACK CRAFT ]</span>
          </motion.div>

          {/* Guaranteed 2-Line Name: Mohammed on Line 1, Irfan on Line 2 */}
          <motion.h1
            className={`${playfairDisplay.className} text-6xl sm:text-7xl md:text-8xl lg:text-[110px] text-stone-900 font-medium tracking-tight flex flex-col items-center leading-[0.92] sm:leading-[0.90]`}
            variants={itemVariants}
          >
            {/* Line 1: Mohammed */}
            <span className="whitespace-nowrap flex justify-center">
              {firstName.split("").map((char, i) => (
                <motion.span
                  key={`first-${i}`}
                  className="inline-block cursor-default"
                  whileHover={{
                    scale: 1.25,
                    y: -6,
                    color: "#050908",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 14,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Line 2: Irfan */}
            <span className="whitespace-nowrap flex justify-center mt-1 sm:mt-2">
              {lastName.split("").map((char, i) => (
                <motion.span
                  key={`last-${i}`}
                  className="inline-block cursor-default"
                  whileHover={{
                    scale: 1.25,
                    y: -6,
                    color: "#050908",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 14,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </motion.div>
      </div>

      {/* Bottom Editorial Strip: Discipline & Scroll Cue */}
      <motion.div
        className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-stone-200/80"
        variants={itemVariants}
      >
        <div className="flex items-center gap-3 h-8">
          <span className="font-mono text-xs text-stone-400 uppercase tracking-widest">
            {"// FOCUS:"}
          </span>
          <div className="relative overflow-hidden h-6 flex items-center min-w-[200px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRole}
                className={`${inter.className} text-sm sm:text-base font-bold text-stone-800 tracking-tight absolute`}
                variants={roleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {roles[currentRole]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Minimalist Scroll Cue */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-stone-400 uppercase">
          <span>Scroll to Explore</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="text-stone-700 font-bold"
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Hero;
