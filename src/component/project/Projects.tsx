/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { playfairDisplay, inter } from "@/lib/font";
import projects from "@/lib/data/projects";
import ProjectCard from "./ProjectCard";
import { FiGithub, FiArrowRight } from "react-icons/fi";

function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Map vertical scroll progress of this 320vh section into horizontal translateX
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Calculate horizontal translation across all cards
  // Smooth GPU translation from 0% to -68%
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={targetRef}
      id="projects"
      className="relative bg-[#050908] text-white w-full h-[320vh]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12 select-none">
        {/* Subtle Ambient Specular Background */}
        <div className="ambient-glow -top-32 -left-32 w-96 h-96 bg-stone-700/10 pointer-events-none" />
        <div className="ambient-glow bottom-0 right-0 w-[500px] h-[500px] bg-stone-500/5 pointer-events-none" />

        {/* Top Header & Architectural Meta */}
        <div className="relative z-10 w-full flex flex-col gap-3 border-b border-stone-800/80 pb-4">
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-stone-500">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-stone-200 font-semibold">// 01</span>
              <span>SELECTED PRODUCTIONS</span>
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <span className="hidden sm:inline">[ HORIZONTAL ARCHIVE ]</span>
              <span>04 FEATURED</span>
            </div>
          </div>

          <div className="flex items-baseline justify-between">
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight ${playfairDisplay.className}`}
            >
              My Works.
            </h2>
            <span className="text-xs font-mono text-stone-400 uppercase tracking-widest hidden md:inline-block">
              Scroll to explore reel →
            </span>
          </div>
        </div>

        {/* Horizontal Reel Track (Driven by vertical scroll with GPU hardware acceleration) */}
        <div className="relative z-10 w-full flex items-center overflow-visible py-2 sm:py-4">
          <motion.div
            style={{ x }}
            className="flex gap-5 sm:gap-7 md:gap-8 items-center will-change-transform"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}

            {/* Final Slide: GitHub & Comprehensive Archive Link */}
            <div className="w-[80vw] sm:w-[420px] md:w-[460px] h-[64vh] sm:h-[66vh] md:h-[68vh] flex-shrink-0 flex items-center justify-center">
              <div className="w-full h-full p-8 sm:p-10 bg-stone-950/80 border border-white/[0.08] hover:border-white/20 transition-all duration-300 rounded-2xl flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="font-mono text-xs text-stone-500 uppercase tracking-widest block">
                    ARCHIVE // MORE
                  </span>
                  <h3
                    className={`${playfairDisplay.className} text-3xl sm:text-4xl text-white font-medium`}
                  >
                    Explore my Github.
                  </h3>
                  <p className={`${inter.className} text-stone-400 text-sm leading-relaxed pt-2`}>
                    Browse client tools, open-source utilities, full-stack microservices, and experiments on GitHub.
                  </p>
                </div>

                <a
                  href="https://github.com/MohammedIrfan244"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 rounded-xl text-white transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <FiGithub className="w-5 h-5" />
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider">
                      github.com/MohammedIrfan244
                    </span>
                  </div>
                  <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Status & Progress Indicator Bar */}
        <div className="relative z-10 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-stone-800/80 text-xs font-mono text-stone-500">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="uppercase tracking-widest text-stone-400">Reel Progress:</span>
            {/* Horizontal progress bar */}
            <div className="h-[2px] w-36 sm:w-48 bg-stone-800 rounded-full overflow-hidden">
              <motion.div
                style={{ width: progressBarWidth }}
                className="h-full bg-stone-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-stone-400">
            <span>[ 01 — 04 ]</span>
            <span>•</span>
            <span>NEXT SECTION: ABOUT ME ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
