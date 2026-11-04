"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { playfairDisplay } from "@/lib/font";
import projects from "@/lib/data/projects";
import ProjectCard from "./ProjectCard";
import { useLenis } from "@/component/providers/SmoothScrollProvider";

function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: false, margin: "100px 0px -20% 0px" });
  const isGridInView = useInView(gridRef, { once: true, margin: "0px 0px -15% 0px" });
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const lenis = useLenis();

  // Listen to the single shared root Lenis instance
  useEffect(() => {
    if (!lenis) return;

    const handleScroll = () => {
      if (!headingRef.current) return;
      const rect = headingRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      const startOffset = windowHeight * 0.85;
      const endOffset = -elementHeight;
      const totalDistance = startOffset - endOffset;
      const currentDistance = startOffset - elementTop;
      const calculatedProgress = Math.max(0, Math.min(1, currentDistance / totalDistance));

      setScrollProgress(calculatedProgress);
    };

    lenis.on("scroll", handleScroll);
    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  const text: string = "My Works.";
  const letters: string[] = text.split("");

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.2,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.015,
        duration: 0.35,
        ease: [0.42, 0, 0.58, 1],
      },
    }),
  };

  const gridVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1],
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const getLetterOpacity = (index: number): number => {
    if (!isInView) return 0;
    const letterProgress: number = (index + 1) / letters.length;
    const appearThreshold: number = letterProgress * 0.3;
    const disappearThreshold: number = 0.7 + letterProgress * 0.3;

    if (scrollProgress < appearThreshold) {
      return 0;
    } else if (scrollProgress > disappearThreshold) {
      return Math.max(0, 1 - (scrollProgress - disappearThreshold) / (1 - disappearThreshold));
    } else {
      return 1;
    }
  };

  const getColSpan = (index: number) => {
    switch (index) {
      case 0:
        return "md:col-span-7 md:row-span-2";
      case 1:
        return "md:col-span-5 md:row-span-2";
      case 2:
        return "md:col-span-5 md:row-span-1";
      case 3:
        return "md:col-span-7 md:row-span-1";
      default:
        return "md:col-span-6 md:row-span-1";
    }
  };

  return (
    <section
      id="projects"
      className="relative px-4 sm:px-6 md:px-7 lg:px-10 py-16 sm:py-20 md:py-28 space-y-10 md:space-y-16 w-full bg-[#050908] overflow-hidden"
    >
      {/* Subtle ambient lighting behind grid */}
      <div className="ambient-glow -top-32 -left-32 w-96 h-96 bg-stone-700/10" />
      <div className="ambient-glow top-1/2 -right-32 w-[500px] h-[500px] bg-stone-500/5" />

      {/* Editorial Header Section */}
      <div className="space-y-4">
        {/* Architectural Metadata Bar */}
        <div className="flex items-center justify-between text-xs font-mono tracking-widest text-stone-500 border-b border-stone-800/80 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-stone-300 font-semibold">// 01</span>
            <span>ARCHIVE & ENGINEERING</span>
          </div>
          <div className="hidden sm:block">
            <span>[ {String(projects.length).padStart(2, "0")} SELECTED PRODUCTIONS ]</span>
          </div>
        </div>

        {/* Massive Serif Title */}
        <div ref={headingRef} className="relative pt-2">
          <h2
            className={`font-thin text-7xl sm:text-8xl md:text-9xl text-white ${playfairDisplay.className} tracking-tight`}
          >
            {letters.map((letter: string, index: number) => {
              const opacity = getLetterOpacity(index);

              return (
                <motion.span
                  key={`${letter}-${index}`}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  style={{
                    display: "inline-block",
                    opacity,
                    transform: `translateY(${(1 - opacity) * 20}px)`,
                  }}
                  className="relative"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              );
            })}
          </h2>
        </div>
      </div>

      {/* Interactive Project Showcase Grid */}
      <motion.div
        ref={gridRef}
        variants={gridVariants}
        initial="hidden"
        animate={isGridInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 md:gap-7 grid-flow-row-dense auto-rows-[380px] md:auto-rows-[340px]"
      >
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
      </motion.div>
    </section>
  );
}

export default Projects;
