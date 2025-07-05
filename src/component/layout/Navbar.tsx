import React from 'react'
import { inter } from '@/lib/font'
import { motion } from 'framer-motion'
import { useLenisScroll } from '@/lib/hooks/useLenisScroll'

function Navbar() {
  const lenis = useLenisScroll()

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
    <div
     className={`fixed w-full flex justify-between items-center py-5 md:py-7 lg:py-7 px-6 md:px-7 lg:px-10 font-bold text-stone-700 z-50 ${inter.className}`}>
      <motion.a
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      href='#'
      onClick={(e) => handleSmoothScroll(e, 'top')}
       className='text-lg tracking-tighter hover:cursor-pointer mix-blend-difference hover:opacity-75'>Mohammed Irfan</motion.a>
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
    </div>
  )
}

export default Navbar