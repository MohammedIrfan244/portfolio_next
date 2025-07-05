import Contact from '@/component/Contact'
import Hero from '@/component/Hero'
import Navbar from '@/component/layout/Navbar'
import Profile from '@/component/Profile'
import Projects from '@/component/Projects'
import React from 'react'

function Theme() {
  return (
    <>
        <Navbar/>
      <Hero/>
      <Projects/>
      <Profile/>
      <Contact/>
    </>
  )
}

export default Theme
