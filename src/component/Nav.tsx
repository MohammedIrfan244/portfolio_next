"use client"
import React from 'react'
import { INavigation } from '@/lib/types'
import { Young_Serif } from 'next/font/google'


const youngSerif = Young_Serif({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-youngSerif'
})

interface INavProp {
    onClick: (value: string) => void;
    selected: string
}

const navigation: INavigation[] = [
    {
        id: "aboutMe",
        name: "About Me",
        value: "aboutMe"
    },
    {
        id: "skills",
        name: "Skills",
        value: "skills"
    },
    {
        id: "projects",
        name: "Projects",
        value: "projects"
    },
    {
        id: "contact",
        name: "Contact",
        value: "contact"
    }
]

function Nav({ onClick, selected }: INavProp) {
    return (
        <div className='p-10 flex flex-row justify-between md:flex-col'>
            <h1 className={`${youngSerif.className} text-2xl sm:text-3xl md:text-4xl`}>Irfan</h1>
            <div className='md:space-y-6 text-stone-800 font-semibold text-sm space-x-4 flex flex-row md:flex-col'>
                {navigation.map(nav => (
                    <button className={`text-start hover:cursor-pointer transition-all duration-200 ease-in-out text-nowrap hover:text-stone-500 ${selected === nav.value ? 'text-black font-bold text-base' : null}`} onClick={() => onClick(nav.value)} key={nav.id}>{nav.name}</button>
                ))}
            </div>
        </div>
    )
}

export default Nav
