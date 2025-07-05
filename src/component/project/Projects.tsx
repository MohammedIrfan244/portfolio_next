"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { youngSerif } from '@/lib/font'
import projects from '@/lib/data/projects'
import ProjectCard from './ProjectCard'


// Type for Lenis constructor options
interface LenisOptions {
  duration: number
  easing: (t: number) => number
  smooth: boolean
}

function Projects() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: false, margin: "100px 0px -20% 0px" })
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  
  useEffect(() => {
    
    
    const initLenis = async () => {
        const Lenis = (await import('lenis')).default
       const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
        } as LenisOptions)
        
        function raf(time: number): void {
          lenis?.raf(time)
          requestAnimationFrame(raf)
        }
        
        requestAnimationFrame(raf)
        
        // Listen for scroll events
        lenis.on('scroll', () => {
          if (headingRef.current) {
            const rect = headingRef.current.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const elementTop = rect.top
            const elementHeight = rect.height
            
            // Calculate scroll progress for the heading
            const startOffset = windowHeight * 0.8
            const endOffset = -elementHeight
            const totalDistance = startOffset - endOffset
            const currentDistance = startOffset - elementTop
            const calculatedProgress = Math.max(0, Math.min(1, currentDistance / totalDistance))
            
            setScrollProgress(calculatedProgress)
          }
        })
        return ()=> lenis.destroy()
    }
    
    initLenis()
    
  }, [])
  
  const text: string = "My Works"
  const letters: string[] = text.split('')
  
  // Animation variants for letters
  const letterVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.2 
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.01,
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1]
      }
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: -30,
      scale: 0.4,
      transition: {
        delay: i * 0.02,
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1]
      }
    })
  }
  
  // Calculate which letters should be visible based on scroll progress
  const getLetterOpacity = (index: number): number => {
    if (!isInView) return 0

    const letterProgress: number = (index + 1) / letters.length
    const appearThreshold: number = letterProgress * 0.3 // Letters appear in first 30% of scroll
    const disappearThreshold: number = 0.7 + (letterProgress * 0.3) // Letters disappear in last 30% of scroll

    if (scrollProgress < appearThreshold) {
      return 0
    } else if (scrollProgress > disappearThreshold) {
      return Math.max(0, 1 - ((scrollProgress - disappearThreshold) / (1 - disappearThreshold)))
    } else {
      return 1
    }
  }
  
  return (
    <div id='projects' className='px-6 md:px-7 lg:px-10 py-10 sm:py-12 md:py-14 space-y-10 sm:space-y-14 md:space-y-20 w-full'>
      <div ref={headingRef} className="relative">
        <h1 className={`text-6xl sm:text-7xl md:text-8xl text-white ${youngSerif.className}`}>
          {letters.map((letter: string, index: number) => {
            const opacity = getLetterOpacity(index)
            
            return (
              <motion.span
                key={`${letter}-${index}`} // Better key for duplicate letters
                custom={index}
                variants={letterVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{
                  display: 'inline-block',
                  opacity,
                  transform: `translateY(${(1 - opacity) * 20}px)`,
                }}
                className="relative"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            )
          })}
        </h1>
      </div>
      
      <div className='text-white'>
        {/* Your project cards here */}
        {projects.map((project, index) => (
          <ProjectCard key={project.id || index} project={project} />
        ))}
      </div>
    </div>
  )
}

export default Projects