"use client"
import { Kanit } from 'next/font/google'
import React, { useState } from 'react'
import Download from '../ui/downloadButton'
import ToggleButton from '../ui/toggleButton'
import Link from 'next/link'

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
        <nav className='fixed top-0 backdrop-opacity-10 z-50 left-0 w-screen h-16 sm:h-20 md:h-24 items-center justify-between flex px-5'>
            {/* name */}
            <Link href={"#hero"} className={`${kanit.className} hover:cursor-pointer text-3xl`}>irfan</Link>
            {/* navlinks for larger screen */}
            <div className="card example-2">
            <div className='items-center inner border border-gray-700 justify-between gap-5 hidden sm:flex'>
                {links.map((link, index) => <Link key={index + link.id} href={"#"+link.id} scroll={true} className='text-sm list-none hover:opacity-60 hover:cursor-pointer'>
                        {link.key} </Link>)}
            </div>
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