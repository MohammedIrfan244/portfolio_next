"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { HiOutlineDocumentDownload } from "react-icons/hi";

function About() {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div className='w-full h-full flex justify-start items-start flex-col'>
      {/* profile section */}
      <div className='w-full flex-grow flex flex-col items-center gap-6 justify-center'>
        <motion.div
          initial={{ opacity: 0, y: -80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut",
            y: { duration: 0.8, ease: "easeOut" },
            scale: { duration: 0.6, ease: "easeOut" }
          }}
        >
          <Image
            src={"/images/profil.png"}
            alt="Profile Image"
            width={200}
            height={200}
            className="rounded-full border-2 border-stone-300 shadow-sm"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.2,
            ease: "easeInOut",
            y: { duration: 0.7, ease: "easeOut" }
          }}
        >
          <a 
            onMouseEnter={() => setIsHovering(true)} 
            onMouseLeave={() => setIsHovering(false)} 
            download="MohammedIrfan.pdf" 
            href='/files/MohammedIrfan.pdf' 
            className={`
              ${isHovering ? "text-sm px-4 py-2 rounded-full bg-stone-800 text-white" : "px-3 py-2 rounded-full text-stone-800"} 
              border-2 border-stone-800 transition-all duration-1000 ease-out 
              inline-flex items-center gap-2 font-medium hover:shadow-md
              text-nowrap
            `}
          >
            {isHovering ? "Download Resume" : <HiOutlineDocumentDownload className="w-4 h-4" />}
          </a>
        </motion.div>
      </div>
      
      {/* content section */}
      <div className='flex flex-col items-start justify-center space-y-4 w-full'>
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.4,
            ease: "easeInOut",
            y: { duration: 0.8, ease: "easeOut" }
          }}
          className="text-2xl font-bold text-stone-800 font-serif"
        >
          Mohammed Irfan
        </motion.h2>
        
        <motion.h3
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.5,
            ease: "easeInOut",
            y: { duration: 0.7, ease: "easeOut" }
          }}
          className="text-lg font-semibold text-stone-600"
        >
          MERN Stack Developer
        </motion.h3>
        
        <motion.p 
          className='text-justify text-stone-700 leading-relaxed font-medium max-w-2xl'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.6,
            ease: "easeInOut",
            y: { duration: 0.7, ease: "easeOut" }
          }}
        >
          Hello there, fellow, I&apos;m a web developer who loves to build stuff.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.7,
            ease: "easeInOut",
            y: { duration: 0.7, ease: "easeOut" }
          }}
          className="space-y-2 pt-4"
        >
          <p className="text-sm text-stone-600 font-medium">
            <span className="text-stone-800 font-semibold">Current:</span> Fullstack Developer - Bridgeon Solution, 2024 - present
          </p>
          
          <p className="text-sm text-stone-600 font-medium">
            <span className="text-stone-800 font-semibold">Education:</span> Bachelor of Science, Mathematics - University of Calicut, 2021 - 2024
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default About