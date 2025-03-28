"use client"
import { Kanit } from 'next/font/google'
import React, { useState } from 'react'
import Download from '../ui/downloadButton'
import ToggleButton from '../ui/toggleButton'

const kanit = Kanit({
    subsets: ["latin"],
    weight: ['400']
})

interface ILink {
    id: string
    key: string
}
const links: ILink[] = [{ id: "about", key: "About Me" }, { id: "project", key: "Projects" }, { id: "skill", key: "Skills" }, { id: "exp", key: "Experience" }, { id: "contact", key: "Contact" }]

function Navbar() {
    const [drop, setDrop] = useState<boolean>(false)
    return (
        <nav className='fixed top-0 z-50 left-0 w-screen h-16 items-center justify-between flex px-5'>
            {/* name */}
            <h2 className={`${kanit.className} text-3xl`}>irfan</h2>
            {/* navlinks for larger screen */}
            <div className='items-center border rounded-4xl border-gray-700 py-3 px-5 justify-between gap-5 hidden sm:flex'>
                {links.map((link, index) => <a key={index + link.id} href={link.id} className='text-sm list-none hover:opacity-60 hover:cursor-pointer'>
                        {link.key} </a>)}
            </div>
            <div onClick={() => setDrop((drop) => !drop)} className='text-sm list-none sm:hidden hover:opacity-60 hover:cursor-pointer'>
                <ToggleButton/>
            </div>
            {/* resume downloader */}
            <Download hidden={true} />
            {/* navlinks for smaller screen */}
            <div
                className={`
                    fixed top-16 left-0 w-screen bg-[#161616] 
                    sm:hidden 
                    transition-all duration-300 ease-in-out 
                    ${drop
                        ? 'opacity-100 translate-y-0 visible'
                        : 'opacity-0 -translate-y-full invisible'
                    }
                `}
            >
                <div className="flex flex-col gap-5 py-5 px-5">
                    {links.map((link, index) => (
                        <a
                            key={index + link.id}
                            href={link.id}
                            className='text-sm list-none hover:opacity-60 hover:cursor-pointer'
                        >
                            {link.key}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar