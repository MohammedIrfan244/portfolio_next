import React from 'react'
import Image from 'next/image'
import me from '@/assets/me_circ.png'


function Navbar() {
  return (
    <div className='fixed top-0 left-0 w-screen h-20 flex'>
      <Image src={me} height={30} width={30} alt='Irfan'/>
      <div className='navigations flex items-center justify-between gap-3'>
        
      </div>
    </div>
  )
}

export default Navbar
