"use client";

import React, { useRef, useState } from "react";
import { playfairDisplay, inter } from "@/lib/font";
import { IProject } from "@/lib/types";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ProjectCardProps {
  project: IProject;
  index: number;
  variant: "large" | "small";
}

function ProjectCard({ project, index, variant }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glare, setGlare] = useState({ x: 0, y: 0, opacity: 0 });

  // Spring-smoothed 3D perspective tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 180, damping: 22 });
  const mouseY = useSpring(y, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;

    x.set(posX / rect.width - 0.5);
    y.set(posY / rect.height - 0.5);

    setGlare({
      x: posX,
      y: posY,
      opacity: 0.15,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full h-full"
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
        className="group relative overflow-hidden bg-stone-950/90 border border-white/[0.08] hover:border-white/25 transition-colors duration-500 w-full h-full flex flex-col justify-between cursor-pointer rounded-none"
      >
        {/* Background Project Image */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <Image
            src={project.cover}
            alt={`${project.title} cover`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-45 group-hover:opacity-65 transition-all duration-700 ease-out"
          />
        </div>

        {/* Cinematic Multi-Stop Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050908] via-[#050908]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050908]/60 via-transparent to-transparent" />

        {/* Dynamic Specular Glare Layer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(550px circle at ${glare.x}px ${glare.y}px, rgba(255,255,255,0.18), transparent 60%)`,
          }}
        />

        {/* Top Metadata Strip */}
        <div className="relative z-10 p-5 sm:p-6 md:p-7 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs md:text-sm font-semibold tracking-widest text-stone-300">
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
                className="p-2.5 bg-white/[0.06] hover:bg-white/20 border border-white/[0.1] backdrop-blur-md text-stone-200 hover:text-white transition-all duration-300 transform hover:scale-110"
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
                className="p-2.5 bg-white/[0.06] hover:bg-white/20 border border-white/[0.1] backdrop-blur-md text-stone-200 hover:text-white transition-all duration-300 transform hover:scale-110 flex items-center gap-1.5"
              >
                <FiExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Bottom Content Container */}
        <div className="relative z-10 p-5 sm:p-6 md:p-7 flex flex-col justify-end space-y-4">
          {/* Project Title */}
          <div>
            <h3
              className={`${playfairDisplay.className} text-2xl sm:text-3xl md:text-4xl text-white tracking-wide font-medium group-hover:text-stone-100 transition-colors flex items-center justify-between`}
            >
              <span>{project.title}</span>
              <FiArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-stone-300" />
            </h3>
          </div>

          {/* Description or Bullets */}
          {variant === "large" ? (
            <p
              className={`${inter.className} text-stone-300 text-sm sm:text-base leading-relaxed line-clamp-3`}
            >
              {project.description}
            </p>
          ) : (
            <div className={`${inter.className} text-xs sm:text-sm text-stone-300 space-y-1`}>
              {project.bullets ? (
                <ul className="space-y-1">
                  {project.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 line-clamp-2">
                      <span className="text-stone-500 font-mono">→</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="line-clamp-2">{project.description}</p>
              )}
            </div>
          )}

          {/* Tech Stack Pills (Frosted Glass Monospace) */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
            {project.dep.map((tech) => (
              <span
                key={tech.id}
                className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-stone-300 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm uppercase transition-colors group-hover:border-white/15"
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
