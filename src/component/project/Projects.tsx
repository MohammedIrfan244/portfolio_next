"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { youngSerif } from '@/lib/font'
import projects from '@/lib/data/projects'
import ProjectCard from './ProjectCard'
import useEmblaCarousel from 'embla-carousel-react'
import { LuCircleChevronLeft ,LuCircleChevronRight } from "react-icons/lu";

interface LenisOptions {
  duration: number
  easing: (t: number) => number
  smooth: boolean
}

function Projects() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: false, margin: "100px 0px -20% 0px" })
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
    breakpoints: {
      '(min-width: 768px)': { dragFree: false }
    }
  })
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()
  
  const onSelect = () => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }
  
  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi])
  
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
  
  const text: string = "My Works"
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
  
  return (
    <div id='projects' className='px-4 sm:px-6 md:px-7 lg:px-10 py-12 sm:py-16 md:py-20 space-y-8 sm:space-y-10 md:space-y-14 lg:space-y-20 w-full'>
      <div ref={headingRef} className="relative">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white ${youngSerif.className}`}>
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
        </h1>
      </div>
      
      <div className='relative'>
        <div className='flex justify-end gap-2 mb-6'>
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className={`p-2 rounded-full transition-all duration-300 ${
              prevBtnEnabled 
                ? 'bg-white/20 hover:bg-white/30 text-white' 
                : 'bg-white/10 text-white/50 cursor-not-allowed'
            }`}
          >
            <LuCircleChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className={`p-2 rounded-full transition-all duration-300 ${
              nextBtnEnabled 
                ? 'bg-white/20 hover:bg-white/30 text-white' 
                : 'bg-white/10 text-white/50 cursor-not-allowed'
            }`}
          >
            <LuCircleChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div key={project.id + index} className="flex-none">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects