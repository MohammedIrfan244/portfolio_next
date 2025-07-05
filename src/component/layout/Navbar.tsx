import React, { useState, useEffect } from 'react'
import { inter } from '@/lib/font'
import { motion } from 'framer-motion'
import { useLenisScroll } from '@/lib/hooks/useLenisScroll'

function Navbar() {
  const lenis = useLenisScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (lenis) {
      lenis.on('scroll', ({ scroll }: { scroll: number }) => {
        setIsScrolled(scroll > 50)
      })
    }
  }, [lenis])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    }
  }

  return (
    <motion.div
     className={`fixed w-full flex justify-between items-center py-5 md:py-7 lg:py-7 px-6 md:px-7 lg:px-10 font-bold text-stone-700 z-50 transition-all duration-300 ${inter.className} ${isScrolled?'bg-transparent':'bg-white'}`}>
      <motion.a
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      href='#'
      onClick={(e) => handleSmoothScroll(e, 'top')}
       className='text-lg tracking-tighter hover:cursor-pointer hover:opacity-75'>Irfan</motion.a>
      <div className='flex gap-3 md:gap-5 lg:gap-6 text-base'>
        <motion.a
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        href='#projects'
        onClick={(e) => handleSmoothScroll(e, '#projects')}
         className='text-sm hover:cursor-pointer hover:opacity-75'>Work</motion.a>
        <motion.a
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        href='#profile'
        onClick={(e) => handleSmoothScroll(e, '#profile')}
         className='text-sm hover:cursor-pointer hover:opacity-75'>About</motion.a>
        <motion.a
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        href='#contact'
        onClick={(e) => handleSmoothScroll(e, '#contact')}
         className='text-sm hover:cursor-pointer hover:opacity-75'>Contact</motion.a>
      </div>
    </motion.div>
  )
}

export default Navbar