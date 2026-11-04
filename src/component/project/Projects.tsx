"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { playfairDisplay, inter } from "@/lib/font";
import projects from "@/lib/data/projects";
import ProjectCard from "./ProjectCard";
import { FiGithub, FiArrowRight } from "react-icons/fi";

function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: false, margin: "100px 0px -20% 0px" });
  const isGridInView = useInView(gridRef, { once: true, margin: "0px 0px -10% 0px" });

  const text: string = "My Works.";
  const letters: string[] = text.split("");

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.8,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.02,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const gridVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const getColSpan = (index: number) => {
    switch (index) {
      case 0:
        return "md:col-span-7 md:row-span-2";
      case 1:
        return "md:col-span-5 md:row-span-2";
      case 2:
        return "md:col-span-4 md:row-span-1";
      case 3:
        return "md:col-span-4 md:row-span-1";
      default:
        return "md:col-span-4 md:row-span-1";
    }
  };

  return (
    <section
      id="projects"
      className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-28 space-y-8 md:space-y-12 w-full bg-[#050908] overflow-hidden"
    >
      {/* Subtle ambient lighting behind grid */}
      <div className="ambient-glow -top-32 -left-32 w-96 h-96 bg-stone-700/10 pointer-events-none" />
      <div className="ambient-glow top-1/2 -right-32 w-[500px] h-[500px] bg-stone-500/5 pointer-events-none" />

      {/* Editorial Header Section */}
      <div className="space-y-3">
        {/* Architectural Metadata Bar */}
        <div className="flex items-center justify-between text-xs font-mono tracking-widest text-stone-500 border-b border-stone-800/80 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-stone-300 font-semibold">{"// 01"}</span>
            <span>ARCHIVE & ENGINEERING</span>
          </div>
          <div>
            <span>[ 04 SELECTED PRODUCTIONS + OPEN SOURCE ]</span>
          </div>
        </div>

        {/* Massive Serif Title */}
        <div ref={headingRef} className="relative pt-2">
          <h2
            className={`font-thin text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white ${playfairDisplay.className} tracking-tight`}
          >
            {letters.map((letter: string, index: number) => (
              <motion.span
                key={`${letter}-${index}`}
                custom={index}
                variants={letterVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h2>
        </div>
      </div>

      {/* Asymmetric Editorial Grid */}
      <motion.div
        ref={gridRef}
        variants={gridVariants}
        initial="hidden"
        animate={isGridInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 grid-flow-row-dense auto-rows-[360px] md:auto-rows-[320px]"
      >
        {/* 4 Featured Projects */}
        {projects.map((project, index) => {
          const isLarge = index === 0 || index === 1;
          return (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className={`${getColSpan(index)} h-full w-full`}
            >
              <ProjectCard project={project} index={index} variant={isLarge ? "large" : "small"} />
            </motion.div>
          );
        })}

        {/* 5th Card: GitHub Archive & Repositories Card */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-4 md:row-span-1 h-full w-full"
        >
          <div className="group relative overflow-hidden bg-stone-950 border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-300 w-full h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl select-none outline-none shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {/* Top Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-stone-500">
              <span className="text-stone-300 tracking-widest font-semibold">05</span>
              <span className="w-6 h-[1px] bg-stone-700/80" />
              <span className="uppercase tracking-wider text-stone-400">Open Source</span>
              <div className="p-2 rounded-full bg-white/[0.08] text-white">
                <FiGithub className="w-4 h-4" />
              </div>
            </div>

            {/* Middle Title & Description */}
            <div className="space-y-2">
              <h3 className={`${playfairDisplay.className} text-2xl sm:text-3xl text-white font-medium`}>
                More on GitHub.
              </h3>
              <p className={`${inter.className} text-stone-400 text-xs sm:text-sm leading-relaxed line-clamp-3`}>
                Explore 20+ additional microservices, CLI tools, libraries, and open-source contributions.
              </p>
            </div>

            {/* Bottom Button */}
            <a
              href="https://github.com/MohammedIrfan244"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 rounded-xl text-white transition-all duration-300 group-hover:border-white/20"
            >
              <span className="font-mono text-xs font-semibold tracking-wider">
                Visit @MohammedIrfan244
              </span>
              <FiArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Projects;
