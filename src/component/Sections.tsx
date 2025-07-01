import React from 'react'
import Welcome from './Welcome'
import About from './About'
import Skill from './Skill'
import Projects from './Projects'
import Contact from './Contact'

interface ISectionProps {
    selected:string
}

function Sections({selected}:ISectionProps) {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      {
        selected === 'aboutMe' ? <About/> :
        selected === 'skills' ? <Skill/> :
        selected === 'projects' ? <Projects/> :
        selected === 'contact' ? <Contact/> :
        <Welcome/>
      }
    </div>
  )
}

export default Sections
