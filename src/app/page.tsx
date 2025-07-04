import Contact from '@/component/Contact';
import Hero from '@/component/hero';
import Profile from '@/component/profile';
import Projects from '@/component/Projects';
import React from 'react';

export default function Home() {
  return (
    <>
      <Hero/>
      <Projects/>
      <Profile/>
      <Contact/>
    </>
  );
}
