"use client";
import React, { useRef } from "react";
import { motion, Variants, useScroll, useSpring, useTransform } from "framer-motion";
import { playfairDisplay, inter } from "@/lib/font";

const experiences = [
  {
    id: 1,
    role: "Freelance Web Developer",
    company: "Remote",
    date: "February 2026 – Present",
  },
  {
    id: 2,
    role: "Full-Stack Developer",
    company: "Willowy Infotech Pvt. Ltd., Calicut, Kerala, India",
    date: "August 2025 – February 2026",
  },
  {
    id: 3,
    role: "Web Developer Intern",
    company: "BridgeOn, Malappuram, Kerala, India",
    date: "August 2024 – August 2025",
  },
];

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      mass: 1,
    },
  },
};

function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress relative to the experience track container
  const { scrollYProgress } = useScroll({
    target: trackRef,
    // "start center" means progress is 0 when the top of trackRef hits center of screen.
    // "end center" means progress is 1 when bottom of trackRef hits center of screen.
    offset: ["start center", "end center"],
  });

  // Wrap the scroll progress in a spring to give it a bouncy feel
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 12,
    mass: 1,
  });

  // Map the spring 0-1 value to a CSS top percentage (0% to 100%)
  const dotTop = useTransform(springProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      id="experience"
      className="px-6 md:px-7 lg:px-10 py-10 sm:py-16 md:py-20 w-full text-white"
    >
      <div className="w-full overflow-x-hidden hide-scrollbar mb-10 sm:mb-16">
        <motion.h3
          initial={{ opacity: 0, y: 50, rotate: -2, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className={`${playfairDisplay.className} text-[50px] sm:text-[70px] md:text-[90px] lg:text-[100px] text-stone-200 font-bold px-3`}
        >
          Experience.
        </motion.h3>
      </div>

      <div className="px-3 md:px-10">
        <div ref={trackRef} className="relative flex">
          {/* Global Continuous Line */}
          <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-[2px] bg-stone-800">
            {/* The Bouncy Scroll-Tracking Dot */}
            <motion.div
              style={{ top: dotTop }}
              className="absolute w-4 h-4 rounded-full bg-stone-200 left-[-7px] -translate-y-1/2 z-10 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            />
          </div>

          <div className="space-y-12 sm:space-y-16 md:space-y-20 flex-1 ml-8 md:ml-12 pb-6">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ margin: "-50px" }}
              >
                <h4 className={`${inter.className} text-xl sm:text-2xl md:text-3xl font-bold text-stone-100 mb-2`}>
                  {exp.role}
                </h4>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mt-4">
                  <p className={`${inter.className} text-sm sm:text-base md:text-lg text-stone-400 font-medium`}>
                    {exp.company}
                  </p>
                  <motion.p
                    whileHover={{ scale: 1.05, backgroundColor: "#292524", color: "#f5f5f4" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`${inter.className} text-xs sm:text-sm md:text-base text-stone-500 font-semibold px-4 py-2 bg-stone-900/50 rounded-full w-fit cursor-default`}
                  >
                    {exp.date}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
