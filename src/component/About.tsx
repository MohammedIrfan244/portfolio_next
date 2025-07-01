import React from 'react'
import { motion } from 'framer-motion'

function About() {
  return (
    <div className='w-full h-full flex justify-start items-end'>
        <div className='flex flex-col items-start justify-center space-y-4'>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl"
      >
        Mohammed Irfan
      </motion.h2>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-2xl"
      >
        Mern-stack developer
      </motion.h3>
      <motion.p 
        className='text-justify text-lg'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Hello there, fellow, I ma web developer who love to build stuff.
      </motion.p>
        </div>
    </div>
  )
}

export default About