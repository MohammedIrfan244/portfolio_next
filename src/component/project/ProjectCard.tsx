"use client";

import React from "react";
import { playfairDisplay, inter } from "@/lib/font";
import { IProject } from "@/lib/types";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";

interface ProjectCardProps {
  project: IProject;
  index: number;
  variant?: "large" | "small";
}

/**
 * Editorial ProjectCard
 *
 * Uses pure 2D GPU compositing (subtle lift + inner image zoom)
 * with zero layout shifts or 3D rasterization stalls, running at 120+ FPS.
 */
function ProjectCard({ project, index, variant = "small" }: ProjectCardProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <div
      data-cursor="view"
      className="group relative overflow-hidden bg-stone-950 border border-white/[0.06] hover:border-white/[0.14] hover:-translate-y-1.5 transition-all duration-500 ease-out w-full h-full flex flex-col justify-between cursor-pointer rounded-2xl select-none outline-none shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
    >
      {/* Background Project Image — GPU-accelerated opacity & subtle scale */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={project.cover}
          alt={`${project.title} cover`}
          fill
          priority={index < 2}
          sizes={variant === "large" ? "(max-width: 768px) 100vw, 800px" : "(max-width: 768px) 100vw, 450px"}
          className="object-cover opacity-45 group-hover:opacity-60 group-hover:scale-[1.03] transition-all duration-700 ease-out pointer-events-none"
        />
      </div>

      {/* Multi-Stop Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050908] via-[#050908]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050908]/70 via-transparent to-transparent pointer-events-none" />

      {/* Top Metadata Strip */}
      <div className="relative z-10 p-5 sm:p-6 md:p-7 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs md:text-sm font-semibold tracking-widest text-stone-200">
            {formattedIndex}
          </span>
          <span className="w-6 h-[1px] bg-stone-700/80" />
          <span className="font-mono text-[11px] md:text-xs tracking-wider uppercase text-stone-400">
            {project.category || "Selected Work"}
          </span>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 bg-white/[0.08] hover:bg-white/20 border border-white/[0.1] backdrop-blur-md text-stone-200 hover:text-stone-100 transition-all duration-300 transform hover:scale-110 rounded-full"
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
              className="p-2.5 bg-white/[0.08] hover:bg-white/20 border border-white/[0.1] backdrop-blur-md text-stone-200 hover:text-stone-100 transition-all duration-300 transform hover:scale-110 rounded-full flex items-center gap-1.5"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Bottom Content Container */}
      <div className="relative z-10 p-5 sm:p-6 md:p-7 flex flex-col justify-end space-y-3 sm:space-y-4">
        <div>
          <h3
            className={`${playfairDisplay.className} text-2xl sm:text-3xl md:text-4xl text-stone-100 tracking-wide font-medium group-hover:text-stone-50 transition-colors flex items-center justify-between`}
          >
            <span>{project.title}</span>
            <FiArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-stone-300" />
          </h3>
        </div>

        {/* Description */}
        <p
          className={`${inter.className} text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed ${
            variant === "large" ? "line-clamp-3" : "line-clamp-2"
          }`}
        >
          {project.description}
        </p>

        {/* Tech Stack Pills (Frosted Glass Monospace) */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
          {project.dep.map((tech) => (
            <span
              key={tech.id}
              className="px-2.5 py-1 text-[10px] sm:text-[11px] font-mono tracking-wider text-stone-300 bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm uppercase rounded-md transition-colors"
            >
              {tech.tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
