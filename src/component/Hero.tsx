import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, easeIn, easeOut } from 'framer-motion'
import { youngSerif, inter } from '@/lib/font'

function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Transform scroll progress to role index
  const roleIndex = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 1, 2, 3, 4, 5])

  const roles = [
    "web developer",
    "UI/UX designer", 
    "full-stack developer",
    "frontend engineer",
    "creative coder"
  ]

  // Update current role based on scroll
  useEffect(() => {
    const unsubscribe = roleIndex.on("change", (latest) => {
      const index = Math.round(latest)
      if (index !== currentRole && index >= 0 && index < roles.length) {
        setCurrentRole(index)
      }
    })
    return () => unsubscribe()
  }, [roleIndex, currentRole, roles.length])

  // Initialize Lenis
  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default
      
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      })

      function raf(time: number): void {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => lenis.destroy()
    }

    initLenis()
  }, [])

  // Animation variants
  const containerVariants = {
    initial: { opacity: 1 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  }

  const roleVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: easeOut
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: easeIn
      }
    }
  }

  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.4])
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -150])

  return (
    <motion.div 
      ref={containerRef}
      className='w-full h-screen px-6 md:px-7 rounded-b-2xl sm:rounded-b-3xl flex-col md:rounded-b-4xl lg:px-10 flex items-start justify-between bg-white relative overflow-hidden'
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Easter egg with subtle animation */}
      <motion.p 
        className='text-xs text-stone-400 select-none'
        variants={itemVariants}
        whileHover={{ scale: 1.05, color: '#78716c' }}
        transition={{ duration: 0.2 }}
      >
        Easter egg : You are not supposed to see this bruh 🤫
      </motion.p>

      {/* Main content */}
      <div className='flex w-full items-center justify-center'>
        <motion.div 
          className='space-y-1 sm:space-y-2 text-center'
          style={{ scale: nameScale, y: nameY }}
        >
          <motion.p 
            className={`${inter.className} text-base font-bold text-stone-700`}
            variants={itemVariants}
          >
            Hello, I am
          </motion.p>
          
          <motion.h1 
            className={`${youngSerif.className} text-4xl sm:text-5xl md:text-6xl text-stone-800 font-bold`}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Mohammed Irfan
          </motion.h1>
        </motion.div>
      </div>

      {/* Role with scroll-based changes */}
      <motion.div 
        className='w-full flex py-10'
        variants={itemVariants}
      >
        <div className='relative h-8 flex items-center'>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentRole}
              className={`${inter.className} text-lg md:text-xl whitespace-nowrap font-semibold text-stone-600 absolute`}
              variants={roleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {roles[currentRole]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Hero

{/* <div className={`py-2 sm:py-3 md:py-4 lg:py-5 text-base font-semibold ${inter.className} text-stone-700`}> */}