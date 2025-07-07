import React from 'react'
import { playfairDisplay } from '@/lib/font' 

function Profile() {
  return (
    <div id='profile' className=' px-6 md:px-7 lg:px-10 rounded-3xl md:rounded-4xl w-full bg-white'>
      <h1 className={`${playfairDisplay.className} text-[200px] sm:text-[250px] md:text-[300px] lg:text-[350px]`}>Me</h1>
    </div>
  )
}

export default Profile
