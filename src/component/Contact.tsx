'use client'
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import { playfairDisplay, inter } from '@/lib/font'
import { FiPhoneCall , FiGithub , FiLinkedin , FiDownload } from "react-icons/fi";

function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full px-6 py-10 sm:py-16 md:py-24 lg:py-28 md:px-7 space-y-20 md:space-y-24 lg:px-10 text-white rounded-3xl md:rounded-4xl"
    >
      <motion.h1
        className={`flicker text-[100px] sm:text-[150px] md:text-[200px] leading-none md:leading-tight text-center ${playfairDisplay.className}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Where to find me.
      </motion.h1>

      <motion.div
        className="mt-6 sm:mt-8 md:mt-10 space-y-10 sm:space-y-16 md:space-y-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.p
          className={`text-base sm:text-lg md:text-xl lg:text-2xl ${inter.className} font-medium`}
        >
          Drop a mail at :
        </motion.p>
        <div className='space-y-8 md:space-y-12'>
        <motion.a
          href="mailto:irfanndmb@gmail.com"
          className={`inline-block text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold hover:cursor-pointer ${playfairDisplay.className}`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          irfanndmb@gmail.com
        </motion.a>
        <div className='w-full flex items-center justify-center gap-4 sm:gap-8 md:gap-12'>
          <a target='_blank' href="tel:+918891555811" className='flex font-semibold items-center gap-2 rounded-2xl py-1.5 px-3 hover:scale-[1.02] text-sm bg-green-900 hover:bg-green-800'><FiPhoneCall className='w-3 h-3 stroke-3' /> +91 889155 5811</a>
          <a target='_blank' href='https://github.com/MohammedIrfan244' className='p-2 rounded-full hover:scale-105 bg-stone-900 hover:bg-stone-800' ><FiGithub /></a>
          <a target='_blank' href='https://www.linkedin.com/in/mohammed-irfan-n' className='p-2 rounded-full hover:scale-105 bg-blue-900 hover:bg-blue-700' ><FiLinkedin /></a>
          <a target='_blank' href='/files/MohammedIrfan.pdf' title='Download My Resume' download={true} className='p-2 rounded-full hover:scale-105 bg-teal-900 hover:bg-teal-700' ><FiDownload /></a>
        </div>
        </div>
      </motion.div>
      <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 , ease:"easeOut" }}
       className={`text-xs sm:text-sm md:text-base lg:text-lg text-center pt-10 sm:pt-12 md:pt-14 lg:pt-16 ${playfairDisplay.className}`}>Thank you for checking out</motion.p>
    </motion.div>
  )
}

export default Contact
