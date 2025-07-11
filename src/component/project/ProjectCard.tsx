"use client"
import React, { useEffect, useState } from 'react'
import { playfairDisplay , inter } from '@/lib/font'
import { IProject } from '@/lib/types'
import Image from 'next/image'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import {motion} from 'framer-motion'

function ProjectCard({ project }: { project: IProject }) {
    const [isPressed, setIsPressed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        
        return () => window.removeEventListener('resize', checkMobile)
    }, [project])

    const handleTouchStart = () => {
        if (isMobile) {
            setIsPressed(true)
        }
    }

    const handleTouchEnd = () => {
        if (isMobile) {
            setTimeout(() => setIsPressed(false), 6000) 
        }
    }

    return (
        <motion.div 
        initial ={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:0.5,ease:'easeIn'}}
            className={`${playfairDisplay.className} w-[400px] select-none sm:w-[450px] md:w-[500px] lg:w-[550px] h-[500px] sm:h-[450px] md:h-[400px] lg:h-[450px] overflow-hidden relative rounded-lg group transition-shadow duration-300`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className={`absolute inset-0 transition-all duration-500 ease-out ${
                isMobile 
                    ? (isPressed ? 'scale-110 opacity-0' : 'scale-100 opacity-100')
                    : 'group-hover:scale-110 group-hover:opacity-0'
            }`}>
                <Image
                    src={project.cover}
                    alt={`${project.title} cover`}
                    fill
                    className="object-cover"
                />
            </div>
            
            <div className={`absolute inset-0 transition-all duration-500 ease-out ${
                isMobile 
                    ? (isPressed ? 'opacity-100 scale-110' : 'opacity-0 scale-100')
                    : 'opacity-0 group-hover:opacity-100 group-hover:scale-110'
            }`}>
                <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                />
            </div>

            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                isMobile 
                    ? (isPressed ? 'bg-black/60' : 'bg-black/40')
                    : 'group-hover:bg-black/60'
            }`} />

            <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 md:p-5 lg:p-6 z-10">
                <div className="flex gap-2 sm:gap-3 justify-start">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:cursor-pointer bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                    >
                        <FiGithub className="w-3 h-3 text-white" />
                    </a>
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:cursor-pointer bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                    >
                        <FiExternalLink className="w-3 h-3 text-white" />
                    </a>
                </div>

                <div className="flex-1 flex items-end">
                    <div className='text-white space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-3'>
                    <h3 className="text-sm md:text-base font-thin transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                        {project.title}
                    </h3>
                    <div className='flex text-xs gap-2 font-thin sm:gap-3 md:gap-4 lg:gap-5'>
                        {project.dep.map((tech,index)=>{
                            return <motion.p
                            initial={{opacity:0,y:10}}
                            whileInView={{opacity:1,y:0}}
                            transition={{duration:0.4,delay:index*0.1,ease:'backIn'}}
                             className={`py-1 px-2 rounded-xl ${tech.color} ${inter.className}`} key={tech.id}>{tech.tool}</motion.p>
                        })}
                    </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard