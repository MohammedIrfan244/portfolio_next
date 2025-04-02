import React from 'react'

function About() {
  return (
    <div id="about" className='px-5 py-10 my-10 sm:my-20'>
        <div className='flex items-center justify-between h-60'>
          <h1 className='text-9xl'>About Me</h1>
          <div className='w-1/2 flex flex-col justify-between h-full'>
          <h3 className='text-md font-semibold'>Love</h3>
          <p className=''>I&apos;m <span className='underline'>Mohammed Irfan</span>, a <span className='underline'>MERN stack developer</span> specializing in <span className='underline'>React, Node.js, Express, and Next.js</span>. I focus on building scalable and efficient web applications with a structured and optimized approach.</p>
          </div>
        </div>
        <div className='flex items-center justify-center h-60'>
          <h3 className=' font-semibold'>What do i do</h3>
          <p className=''>
          </p>
        </div>
    </div>
  )
}

export default About
