"use client";

import React, { useRef } from "react";
import { playfairDisplay, inter } from "@/lib/font";
import { IProject } from "@/lib/types";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ProjectCardProps {
  project: IProject;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  // Smooth 3D tilt springs
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 220, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 220, damping: 25 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
      cardRef.current.style.setProperty("--glare-opacity", "0.15");
    }
  };

  // High-performance mousemove: updates CSS variables directly, ZERO React re-renders, ZERO reflows
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current;
    if (!rect || !cardRef.current) return;

    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;

    x.set(posX / rect.width - 0.5);
    y.set(posY / rect.height - 0.5);

    cardRef.current.style.setProperty("--glare-x", `${posX}px`);
    cardRef.current.style.setProperty("--glare-y", `${posY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rectRef.current = null;
    if (cardRef.current) {
      cardRef.current.style.setProperty("--glare-opacity", "0");
    }
  };

  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-[85vw] sm:w-[520px] md:w-[580px] lg:w-[640px] h-[64vh] sm:h-[66vh] md:h-[68vh] flex-shrink-0"
    >
      <motion.div
        ref={cardRef}
        data-cursor="view"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative overflow-hidden bg-stone-950 border border-white/[0.08] hover:border-white/25 transition-colors duration-300 w-full h-full flex flex-col justify-between cursor-pointer rounded-2xl select-none"
      >
        {/* Background Project Image */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <Image
            src={project.cover}
            alt={`${project.title} cover`}
            fill
            sizes="(max-width: 768px) 85vw, 640px"
            className="object-cover opacity-50 group-hover:opacity-70 transition-all duration-700 ease-out"
          />
        </div>

        {/* Cinematic Multi-Stop Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050908] via-[#050908]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050908]/70 via-transparent to-transparent" />

        {/* High-Performance Direct CSS Glare Layer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: "var(--glare-opacity, 0)",
            background:
              "radial-gradient(550px circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.18), transparent 60%)",
          }}
        />

        {/* Top Metadata Strip */}
        <div className="relative z-10 p-5 sm:p-7 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs md:text-sm font-semibold tracking-widest text-stone-200">
              {formattedIndex}
            </span>
            <span className="w-6 h-[1px] bg-stone-700/80" />
            <span className="font-mono text-[11px] md:text-xs tracking-wider uppercase text-stone-400">
              {project.category || "Selected Work"}
            </span>
          </div>

          {/* Quick Action Links */}
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 bg-white/[0.08] hover:bg-white/20 border border-white/[0.1] backdrop-blur-md text-stone-200 hover:text-white transition-all duration-300 transform hover:scale-110 rounded-full"
              >
                <FiGithub className="w-3.5 h-3.5" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Demo"
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 bg-white/[0.08] hover:bg-white/20 border border-white/[0.1] backdrop-blur-md text-stone-200 hover:text-white transition-all duration-300 transform hover:scale-110 rounded-full flex items-center gap-1.5"
              >
                <FiExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Bottom Content Container */}
        <div className="relative z-10 p-5 sm:p-7 flex flex-col justify-end space-y-3 sm:space-y-4">
          {/* Project Title */}
          <div>
            <h3
              className={`${playfairDisplay.className} text-2xl sm:text-3xl md:text-4xl text-white tracking-wide font-medium group-hover:text-stone-100 transition-colors flex items-center justify-between`}
            >
              <span>{project.title}</span>
              <FiArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-stone-300" />
            </h3>
          </div>

          {/* Description */}
          <p
            className={`${inter.className} text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-3`}
          >
            {project.description}
          </p>

          {/* Tech Stack Pills (Frosted Glass Monospace) */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
            {project.dep.map((tech) => (
              <span
                key={tech.id}
                className="px-2.5 py-1 text-[10px] sm:text-[11px] font-mono tracking-wider text-stone-300 bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm uppercase rounded-md transition-colors group-hover:border-white/15"
              >
                {tech.tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProjectCard;
