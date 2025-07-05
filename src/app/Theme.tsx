import Contact from '@/component/Contact'
import Hero from '@/component/hero'
import Navbar from '@/component/layout/Navbar'
import Profile from '@/component/profile'
import Projects from '@/component/Projects'
import React from 'react'

function Theme() {
  return (
    <div>
        <Navbar/>
      <Hero/>
      <Projects/>
      <Profile/>
      <Contact/>
    </div>
  )
}

export default Theme
