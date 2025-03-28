import { Kanit } from 'next/font/google'
import React from 'react'

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
    return (
        <nav className='fixed top-0 left-0 w-screen h-16 items-center justify-between flex px-5'>
            {/* name */}
            <h2 className={`${kanit.className} text-3xl`}>irfan</h2>
            {/* navlinks for larger screen */}
            <div className='items-center justify-between gap-3 hidden sm:flex'>
                {links.map((link, index) => <li key={index + link.id} className='text-sm list-none hover:opacity-60 hover:cursor-pointer'>{index === links.length - 1 ? (
                    link.key
                ) : (
                    <>
                        {link.key} <span>&nbsp;&nbsp;&nbsp;&nbsp;/</span>
                    </>
                )}</li>)}
            </div>
            {/* resume downloader */}
        </nav>
    )
}

export default Navbar
