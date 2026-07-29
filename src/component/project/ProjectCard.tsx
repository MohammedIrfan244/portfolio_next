"use client"
import React from 'react'
import { playfairDisplay, inter } from '@/lib/font'
import { IProject } from '@/lib/types'
import Image from 'next/image'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface ProjectCardProps {
    project: IProject;
    variant: 'large' | 'small';
}

function ProjectCard({ project, variant }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, margin: "-100px" }}
            className={`group relative overflow-hidden bg-stone-900 rounded-none w-full h-full flex flex-col justify-end cursor-pointer ${playfairDisplay.className}`}
        >
            {/* Background Image */}
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                <Image
                    src={project.cover}
                    alt={`${project.title} cover`}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-40 group-hover:grayscale transition-all duration-500"
                />
            </div>
            
            {/* Dark Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content Container */}
            <div className="relative z-10 p-5 sm:p-6 md:p-8 flex flex-col h-full justify-end">
                
                {/* Header (Links & Title) */}
                <div className="flex flex-col gap-3 mb-4">
                    <div className="flex gap-3 justify-start">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Repository"
                            className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                        >
                            <span className="sr-only">GitHub Repository</span>
                            <FiGithub className="w-4 h-4 text-white" />
                        </a>
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Live Demo"
                            className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                        >
                            <span className="sr-only">Live Demo</span>
                            <FiExternalLink className="w-4 h-4 text-white" />
                        </a>
                    </div>
                    
                    <h3 className={`text-2xl sm:text-3xl md:text-4xl text-white tracking-wide ${variant === 'large' ? 'font-medium' : 'font-light'}`}>
                        {project.title}
                    </h3>
                </div>

                {/* Conditional Body based on Variant */}
                {variant === 'large' ? (
                    <div className="space-y-4">
                        <p className={`text-sm sm:text-base text-gray-200 line-clamp-3 ${inter.className}`}>
                            {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            {project.dep.map((tech) => (
                                <span 
                                    key={tech.id}
                                    className={`px-3 py-1 text-xs text-white ${tech.color} ${inter.className}`}
                                >
                                    {tech.tool}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={`space-y-2 mt-2 ${inter.className}`}>
                        <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
                            {project.bullets?.map((bullet, idx) => (
                                <li key={idx} className="line-clamp-2">{bullet}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default ProjectCard