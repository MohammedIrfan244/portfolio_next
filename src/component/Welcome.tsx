import React from 'react'
import { Young_Serif } from 'next/font/google'


const youngSerif = Young_Serif({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-youngSerif'
})

function Welcome() {
  return (
    <div className={`w-full h-full flex items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${youngSerif.className}`}>
      Welcome
    </div>
  )
}

export default Welcome
