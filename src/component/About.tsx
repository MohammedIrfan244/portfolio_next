import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'


function About() {
  return (
    <div className='w-full h-full flex justify-start items-start flex-col'>
      {/* profile  */}
      <div className='w-full flex-grow flex items-center justify-center'>
        <Image
        src={"/images/profile.png"}
        alt="Profile Image"
        width={200}
        height={200}
        className="rounded-full border-2 border-stone-800"
        />
      </div>
        <div className='flex flex-col items-start justify-center space-y-2'>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-lg font-semibold"
      >
        Mohammed Irfan
      </motion.h2>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-2xl font-semibold"
      >
        Mern-stack developer
      </motion.h3>
      <motion.p 
        className='text-justify font-semibold'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Hello there, fellow, I ma web developer who love to build stuff.
      </motion.p>
      <p>Fullstack developer-Bridgeon Solution , 2024 - present</p>
      <p>Bachelor of Science, Mathematics , University of calicut , 2021 - 2024</p>
        </div>
    </div>
  )
}

export default About