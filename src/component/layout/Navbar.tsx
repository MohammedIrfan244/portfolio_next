import React from 'react'
import { montserrat } from '@/lib/font'

function Navbar() {
  return (
    <div className={`fixed w-full flex justify-between items-center py-5 md:py-7 lg:py-7 font-bold text-stone-700 ${montserrat.className}`}>
      <a className='text-lg tracking-tighter hover:cursor-pointer mix-blend-difference hover:opacity-75'>Mohammed Irfan</a>
      <div className='flex gap-3 md:gap-5 lg:gap-6 text-base'>
        <a className='text-sm hover:cursor-pointer hover:opacity-75'>Work</a>
        <a className='text-sm hover:cursor-pointer hover:opacity-75'>About</a>
        <a className='text-sm hover:cursor-pointer hover:opacity-75'>Contact</a>
      </div>
    </div>
  )
}

export default Navbar
