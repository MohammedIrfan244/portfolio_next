import About from '@/components/about/about'
import Hero from '@/components/hero/hero'
import Navbar from '@/components/layout/navbar'
import React from 'react'

function page() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <About/>
    </>
  )
}

export default page
