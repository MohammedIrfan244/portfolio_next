"use client"
import React, { useState } from 'react'
import Nav from './Nav'
import Sections from './Sections'

function Container() {
    const [selected,setSelected]=useState<string>("hello");
    const onClick = (value: string) => {
        setSelected(value);
        console.log(value,selected)
    }
  return (
    <div className='flex flex-col md:flex-row md:pb-10 h-screen'>
      <Nav selected={selected} onClick={onClick}/>
      <Sections selected={selected} />
    </div>
  )
}

export default Container
