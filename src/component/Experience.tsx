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
    role: "Freelance Web Developer & Systems Consultant",
    company: "Independent Client Engagements",
    location: "Remote",
    date: "February 2026 – Present",
    highlights: [
      "Architecting custom full-stack web applications with Next.js 15, TypeScript, and MongoDB",
      "Building high-performance SSR portals with sub-second LCP and headless CMS integrations",
      "Crafting Awwwards-caliber interactive interfaces with Framer Motion and custom physics",
    ],
  },
  {
    id: 2,
    role: "Full-Stack Developer",
    company: "Willowy Infotech Pvt. Ltd.",
    location: "Calicut, Kerala, India",
    date: "August 2025 – February 2026",
    highlights: [
      "Engineered multi-tenant ERP & CRM platforms handling complex transactional workflows",
      "Designed secure RESTful API architectures with role-based access control (RBAC)",
      "Optimized MongoDB aggregations and Prisma queries, cutting critical report load times by 40%",
    ],
  },
  {
    id: 3,
    role: "Web Developer Intern",
    company: "BridgeOn",
    location: "Malappuram, Kerala, India",
    date: "August 2024 – August 2025",
    highlights: [
      "Delivered production-grade MERN stack applications adhering to agile sprint cycles",
      "Implemented real-time bidirectional communication features via WebSockets and Socket.io",
      "Built responsive, accessible frontend component systems with React and Tailwind CSS",
    ],
  },
];

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 14,
      mass: 0.8,
    },
  },
};

function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [height, setHeight] = useState(0);

  // Dynamically measure track container height for the responsive SVG thread
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

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 14,
    mass: 1,
  });

  // Dynamic SVG Path generation for an organic, thread-like look
  const svgPath = `M 25 0 C 80 ${height * 0.2}, -30 ${height * 0.4}, 25 ${
    height * 0.5
  } C 80 ${height * 0.7}, -30 ${height * 0.9}, 25 ${height}`;

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
    <section
      ref={containerRef}
      id="experience"
      className="relative px-6 md:px-7 lg:px-10 py-16 sm:py-20 md:py-28 w-full text-white bg-[#050908] overflow-hidden"
    >
      {/* Editorial Meta Bar */}
      <div className="flex items-center justify-between text-xs font-mono tracking-widest text-stone-500 border-b border-stone-800/80 pb-4 mb-8 sm:mb-12">
        <div className="flex items-center gap-3">
          <span className="text-stone-300 font-semibold">// 03</span>
          <span>TIMELINE & INDUSTRY TRACK</span>
        </div>
        <div className="hidden sm:block">
          <span>[ 03 MILESTONES ]</span>
        </div>
      </div>

      {/* Massive Editorial Header */}
      <div className="w-full overflow-x-hidden hide-scrollbar mb-12 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
          className={`${playfairDisplay.className} text-[50px] sm:text-[70px] md:text-[90px] lg:text-[105px] text-stone-100 font-bold px-1 tracking-tight`}
        >
          Experience.
        </motion.h2>
      </div>

      <div className="px-0 md:px-4">
        <div ref={trackRef} className="relative flex min-h-[450px]">
          {/* SVG Thread Canvas */}
          <div className="absolute left-0 top-0 bottom-0 w-[50px] md:w-[80px]">
            {height > 0 && (
              <svg
                width="100%"
                height={height}
                className="overflow-visible"
                style={{ position: "absolute", left: 0, top: 0 }}
              >
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Background Dimmed Organic Thread */}
                <path
                  d={svgPath}
                  fill="transparent"
                  stroke="#262322"
                  strokeWidth="2.5"
                />

                {/* Active Light Thread tracking scroll */}
                <motion.path
                  ref={pathRef}
                  d={svgPath}
                  fill="transparent"
                  stroke="#d6d3d1"
                  strokeWidth="2.5"
                  style={{ pathLength: springProgress }}
                />

                {/* Glowing Tracking Bead */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r="7"
                  fill="#ffffff"
                  filter="url(#glow)"
                />
              </svg>
            )}
          </div>

          {/* Experience Cards */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20 flex-1 ml-16 sm:ml-20 md:ml-28 pb-8 pt-2">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ margin: "-50px" }}
                className="group relative p-6 sm:p-8 bg-stone-950/60 border border-white/[0.07] hover:border-white/20 transition-all duration-300 rounded-none space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
                  <div>
                    <span className="font-mono text-xs text-stone-500 uppercase tracking-widest block mb-1">
                      MILESTONE // 0{idx + 1}
                    </span>
                    <h3
                      className={`${inter.className} text-xl sm:text-2xl md:text-3xl font-bold text-stone-100 group-hover:text-white transition-colors`}
                    >
                      {exp.role}
                    </h3>
                  </div>

                  <span
                    className={`${inter.className} text-xs sm:text-sm font-mono text-stone-300 px-3 py-1.5 bg-white/[0.05] border border-white/[0.1] rounded-none w-fit self-start sm:self-center`}
                  >
                    {exp.date}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-stone-400 font-mono text-xs sm:text-sm">
                  <span className="text-stone-200 font-semibold">{exp.company}</span>
                  <span>•</span>
                  <span>{exp.location}</span>
                </div>

                {/* Key Achievements */}
                <ul className="space-y-2 pt-2 text-sm text-stone-300 leading-relaxed font-sans">
                  {exp.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5">
                      <span className="text-stone-500 font-mono text-xs mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
