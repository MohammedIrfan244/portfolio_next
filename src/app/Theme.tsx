import Contact from '@/component/Contact'
import Hero from '@/component/Hero'
import Navbar from '@/component/layout/Navbar'
import Profile from '@/component/Profile'
import Projects from '@/component/Projects'
import React from 'react'

function Theme() {
  return (
    <div className=' px-6 md:px-7 lg:px-10 w-full'>
        <Navbar/>
      <Hero/>
      <Projects/>
      <Profile/>
      <Contact/>
    </div>
  )
}

export default Theme
