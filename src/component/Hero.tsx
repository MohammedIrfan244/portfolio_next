import React from 'react'
import { youngSerif , inter } from '@/lib/font'

function Hero() {
  return (
    <div className='w-full h-screen px-6 md:px-7 rounded-b-2xl sm:rounded-b-3xl flex-col md:rounded-b-4xl lg:px-10 flex items-start justify-between bg-white'>
      <p>Easter egg : You are not supposed to see this bruh 🤫</p>
      <div className='flex flex-col items-start justify-center gap-2'>
        <p className={`${inter.className}`}>Hello, I am</p>
        <h1 className={`${youngSerif.className}`}>Mohammed Irfan</h1>
      </div>
      <div>
        <p>web dev</p>
      </div>
    </div>
  )
}

export default Hero
