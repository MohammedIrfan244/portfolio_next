"use client"
import Contact from '@/component/Contact'
import Hero from '@/component/Hero'
import Navbar from '@/component/layout/Navbar'
import Profile from '@/component/Profile'
import Projects from '@/component/project/Projects'
import { useLenisScroll } from '@/lib/hooks/useLenisScroll'
import React from 'react'

function Theme() {
  useLenisScroll()
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
