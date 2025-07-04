import React from 'react'
import { montserrat } from '@/lib/font'

function Navbar() {
  return (
    <div className={`fixed flex py-5 px-6 md:py-7 md:px-7 lg:py-7 lg:px-10 text-2xl text-stone-800 ${montserrat.className}`}>
      Irfan
    </div>
  )
}

export default Navbar
