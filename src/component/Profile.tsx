"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { playfairDisplay, inter } from "@/lib/font";

interface WordRevealProps {
  children: string;
  className?: string;
}

function WordReveal({ children, className = "" }: WordRevealProps) {
  const words = children.split(" ");
  return (
    <p className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.25, y: 3 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-10% 0px -15% 0px", once: false }}
          transition={{ duration: 0.4, delay: (i % 8) * 0.02, ease: "easeOut" }}
          className="inline-block mr-1.5 transition-colors"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

const skills = [
  { name: "Next.js 15", category: "Framework", tag: "App Router / SSR" },
  { name: "TypeScript", category: "Language", tag: "Strict Architecture" },
  { name: "Node.js", category: "Runtime", tag: "REST & Microservices" },
  { name: "MongoDB", category: "Database", tag: "Aggregations / Mongoose" },
  { name: "Prisma ORM", category: "Data Layer", tag: "Schema & Migrations" },
  { name: "Express.js", category: "Backend", tag: "Security & Auth" },
  { name: "Socket.io", category: "Real-Time", tag: "Bi-directional Events" },
  { name: "Capacitor", category: "Mobile", tag: "Android Distribution" },
  { name: "Tailwind CSS", category: "Styling", tag: "Design Systems" },
  { name: "Zustand & Redux", category: "State", tag: "Predictable Stores" },
];

function Profile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // GPU-accelerated scroll transforms without manual DOM querying
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const headingScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.15]);
  const headingX = useTransform(scrollYProgress, [0, 1], [-20, 0]);

  const blockVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      ref={containerRef}
      id="profile"
      className="relative px-6 md:px-7 lg:px-10 py-16 sm:py-20 md:py-28 rounded-3xl md:rounded-4xl w-full bg-[#fafaf8] text-stone-900 overflow-hidden shadow-2xl"
    >
      {/* Editorial Meta Bar */}
      <div className="flex items-center justify-between text-xs font-mono tracking-widest text-stone-400 border-b border-stone-200 pb-4 mb-8 sm:mb-12">
        <div className="flex items-center gap-3">
          <span className="text-stone-800 font-semibold">{"// 02"}</span>
          <span>BIOGRAPHY & CAPABILITIES</span>
        </div>
        <div className="hidden sm:block">
          <span>[ PERSPECTIVE & ENGINEERING ]</span>
        </div>
      </div>

      {/* Massive Editorial Header */}
      <div className="w-full overflow-x-hidden hide-scrollbar mb-12 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${playfairDisplay.className} text-[50px] sm:text-[70px] md:text-[90px] lg:text-[110px] text-stone-900 font-bold tracking-tight leading-none`}
        >
          About
        </motion.h2>
        <motion.h2
          ref={headingRef}
          style={{ scale: headingScale, x: headingX, transformOrigin: "left bottom" }}
          className={`${playfairDisplay.className} text-[160px] sm:text-[240px] md:text-[320px] lg:text-[380px] text-stone-900 leading-none -mt-4 sm:-mt-8 md:-mt-12 font-medium tracking-tighter`}
        >
          Me.
        </motion.h2>
      </div>

      {/* Editorial Story Layout */}
      <div className={`${inter.className} space-y-16 sm:space-y-20 md:space-y-24 max-w-5xl`}>
        {/* Story 01: Who Am I */}
        <motion.div
          variants={blockVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-4 md:space-y-6 border-l-2 border-stone-200 pl-6 sm:pl-8"
        >
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-stone-400 uppercase">
            <span>{"// 02.1"}</span>
            <h3 className="font-bold text-stone-800 text-sm">Who Am I</h3>
          </div>
          <WordReveal className="text-stone-700 text-base sm:text-lg md:text-xl font-medium leading-relaxed">
            I am Mohammed Irfan — a full-stack engineer and freelance developer focused on building scalable, resilient web platforms with Next.js, Node.js, and TypeScript.
          </WordReveal>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed pt-2">
            Previously, I engineered production-scale ERP and CRM platforms at{" "}
            <span className="font-bold text-stone-900 border-b border-stone-800/30 pb-0.5">
              Willowy Infotech
            </span>
            , streamlining complex business workflows, and spent a rigorous year delivering production MERN solutions during an intensive development tenure at{" "}
            <span className="font-bold text-stone-900 border-b border-stone-800/30 pb-0.5">
              BridgeOn
            </span>
            .
          </p>
        </motion.div>

        {/* Story 02: What I Do (Tactile Capabilities Grid) */}
        <motion.div
          variants={blockVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6 md:space-y-8 border-l-2 border-stone-200 pl-6 sm:pl-8"
        >
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-stone-400 uppercase">
            <span>{"// 02.2"}</span>
            <h3 className="font-bold text-stone-800 text-sm">Architectural Stack & Capabilities</h3>
          </div>
          <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
            I specialize in full-lifecycle system architecture: from normalized database models and high-throughput REST APIs to fluid, accessible user interfaces with sub-second page loads.
          </p>

          {/* Interactive Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                whileHover={{ y: -4, backgroundColor: "#f5f5f4" }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex flex-col justify-between space-y-2 cursor-default transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span className="uppercase">{skill.category}</span>
                  <span>#{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <div className="font-bold text-stone-900 text-base">{skill.name}</div>
                <div className="text-xs font-mono text-stone-500">{skill.tag}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story 03: Outside the Terminal */}
        <motion.div
          variants={blockVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-4 md:space-y-6 border-l-2 border-stone-200 pl-6 sm:pl-8"
        >
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-stone-400 uppercase">
            <span>{"// 02.3"}</span>
            <h3 className="font-bold text-stone-800 text-sm">Outside the Terminal</h3>
          </div>
          <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
            When the IDE is closed, music is perpetually in the background. I read widely, observe design systems in everyday objects, and sketch scenes and portraits in pencil — exploring how structure, balance, and negative space work beyond the screen.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Profile;
