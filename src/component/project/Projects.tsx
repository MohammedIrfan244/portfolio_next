"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { playfairDisplay } from '@/lib/font'
import projects from '@/lib/data/projects'
import ProjectCard from './ProjectCard'

interface LenisOptions {
  duration: number
  easing: (t: number) => number
  smooth: boolean
}

function Projects() {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: false, margin: "100px 0px -20% 0px" })
  const isGridInView = useInView(gridRef, { once: true, margin: "0px 0px -20% 0px" })
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
      
      lenis.on('scroll', () => {
        if (headingRef.current) {
          const rect = headingRef.current.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const elementTop = rect.top
          const elementHeight = rect.height
          
          const startOffset = windowHeight * 0.8
          const endOffset = -elementHeight
          const totalDistance = startOffset - endOffset
          const currentDistance = startOffset - elementTop
          const calculatedProgress = Math.max(0, Math.min(1, currentDistance / totalDistance))
          
          setScrollProgress(calculatedProgress)
        }
      })
      return () => lenis.destroy()
    }
    
    initLenis()
  }, [])
  
  const text: string = "My Works."
  const letters: string[] = text.split('')
  
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

  const gridVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1],
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1]
      }
    }
  }
  
  const getLetterOpacity = (index: number): number => {
    if (!isInView) return 0
    const letterProgress: number = (index + 1) / letters.length
    const appearThreshold: number = letterProgress * 0.3 
    const disappearThreshold: number = 0.7 + (letterProgress * 0.3) 

    if (scrollProgress < appearThreshold) {
      return 0
    } else if (scrollProgress > disappearThreshold) {
      return Math.max(0, 1 - ((scrollProgress - disappearThreshold) / (1 - disappearThreshold)))
    } else {
      return 1
    }
  }
  
  const getColSpan = (index: number) => {
    switch(index) {
      case 0: return 'md:col-span-7 md:row-span-2' 
      case 1: return 'md:col-span-5 md:row-span-2' 
      case 2: return 'md:col-span-5 md:row-span-1' 
      case 3: return 'md:col-span-7 md:row-span-1' 
      default: return 'md:col-span-6 md:row-span-1'
    }
  }

  return (
    <div id='projects' className='px-4 sm:px-6 md:px-7 bg-black lg:px-10 py-12 sm:py-16 md:py-20 space-y-8 md:space-y-16 w-full'>
      <div ref={headingRef} className="relative">
        <h2 className={`font-thin text-7xl sm:text-8xl md:text-9xl text-white ${playfairDisplay.className}`}>
          {letters.map((letter: string, index: number) => {
            const opacity = getLetterOpacity(index)
            
            return (
              <motion.span
                key={`${letter}-${index}`}
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
        </h2>
      </div>
      
      <motion.div 
        ref={gridRef}
        variants={gridVariants}
        initial="hidden"
        animate={isGridInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 grid-flow-row-dense auto-rows-[350px] md:auto-rows-[300px]"
      >
        {projects.map((project, index) => {
          const isLarge = index === 0 || index === 1
          return (
            <motion.div 
              key={project.id} 
              variants={cardVariants}
              className={`${getColSpan(index)} h-full w-full`}
            >
              <ProjectCard project={project} variant={isLarge ? 'large' : 'small'} />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default Projects