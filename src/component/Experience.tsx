"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  Variants,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
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
  const pathRef = useRef<SVGPathElement>(null);

  const [height, setHeight] = useState(0);

  // Measure the container height to dynamically generate the curved SVG path
  useEffect(() => {
    const updateHeight = () => {
      if (trackRef.current) {
        setHeight(trackRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Track the scroll progress relative to the experience track container
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });

  // Wrap the scroll progress in a spring to give it a bouncy feel
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 12,
    mass: 1,
  });

  // Dynamic SVG Path generation for an organic, thread-like look
  // It starts top center (25), swings right (80), swings left (-30), and loops down smoothly.
  const svgPath = `M 25 0 C 80 ${height * 0.2}, -30 ${height * 0.4}, 25 ${
    height * 0.5
  } C 80 ${height * 0.7}, -30 ${height * 0.9}, 25 ${height}`;

  // Motion values to animate the bouncing dot exactly along the SVG path
  const cx = useMotionValue(25);
  const cy = useMotionValue(0);

  useMotionValueEvent(springProgress, "change", (latest) => {
    if (pathRef.current && height > 0) {
      const totalLength = pathRef.current.getTotalLength();
      const point = pathRef.current.getPointAtLength(latest * totalLength);
      cx.set(point.x);
      cy.set(point.y);
    }
  });

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

      <div className="px-0 md:px-6">
        <div ref={trackRef} className="relative flex min-h-[400px]">
          {/* SVG Canvas for the curved thread */}
          <div className="absolute left-0 top-0 bottom-0 w-[50px] md:w-[80px]">
            {height > 0 && (
              <svg
                width="100%"
                height={height}
                className="overflow-visible"
                style={{ position: "absolute", left: 0, top: 0 }}
              >
                {/* Background dimmed thread */}
                <path
                  d={svgPath}
                  fill="transparent"
                  stroke="#292524"
                  strokeWidth="2"
                />

                {/* Active bright thread that draws itself on scroll */}
                <motion.path
                  ref={pathRef}
                  d={svgPath}
                  fill="transparent"
                  stroke="#a8a29e"
                  strokeWidth="2"
                  style={{ pathLength: springProgress }}
                />

                {/* The glowing dot tracking the path */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r="6"
                  fill="#f5f5f4"
                  className="shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                />
              </svg>
            )}
          </div>

          {/* Experience Items List */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20 flex-1 ml-16 sm:ml-20 md:ml-28 pb-6 pt-4">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ margin: "-50px" }}
              >
                <h4
                  className={`${inter.className} text-xl sm:text-2xl md:text-3xl font-bold text-stone-100 mb-2`}
                >
                  {exp.role}
                </h4>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mt-4">
                  <p
                    className={`${inter.className} text-sm sm:text-base md:text-lg text-stone-400 font-medium`}
                  >
                    {exp.company}
                  </p>
                  <motion.p
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#292524",
                      color: "#f5f5f4",
                    }}
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
