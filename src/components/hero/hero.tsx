import Image from 'next/image';
import React from 'react';
import profile from "@/assets/cprofile.png"
import DualButton from '../ui/dualButton';
import { FaGithub, FaLinkedinIn,  } from 'react-icons/fa6';
import { RiInstagramLine } from 'react-icons/ri';
import { BiLogoGmail } from 'react-icons/bi';


function Hero() {
    return (
        <div className="relative w-screen h-screen pt-24">
            {/* Background Text */}
            <div className="absolute inset-0 -z-10 flex items-center justify-start overflow-hidden">
                <p className="sm:text-[300px] text-[200px] max-w-2xl text-[#1A1A1A] font-extrabold break-words sm:max-w-screen text-left leading-[0.8]">
                    WEB DEVELOPER
                </p>
            </div>

            {/* Foreground Content */}
            <div className="flex justify-center items-center flex-col gap-10 w-full h-full">
                <div className='space-y-5 flex flex-col items-center'>
                    <Image src={profile} alt='Mohammed Irfan' className='w-36 h-36' />
                    <p className='text-sm text-gray-400'>Hello , I m Mohammed Irfan 👋</p></div>
                <div
                    className="sm:text-6xl text-3xl gradient text-center space-y-2 sm:space-y-3.5 
             bg-gradient-to-br from-[#121212] to-[#1f1f1f] p-6 rounded-lg"
                >
                    <p>MERN Stack Developer,</p>
                    <p>open to exciting new full-stack</p>
                    <p>opportunities.</p>
                </div>
                <div className='flex'>
                    <div className='flex gap-5 py-1 px-5 bg-[#323237] text-lg items-center'>
                    <BiLogoGmail className='hover:cursor-pointer hover:opacity-55 transition-opacity duration-200' />
                    <FaGithub  className='hover:cursor-pointer hover:opacity-55 transition-opacity duration-200'/>
                    <FaLinkedinIn  className='hover:cursor-pointer hover:opacity-55 transition-opacity duration-200'/>
                    <RiInstagramLine className='hover:cursor-pointer font-bold hover:opacity-55 transition-opacity duration-200' />
                    </div>
                <DualButton />
                </div>
            </div>
        </div>
    );
}

export default Hero;
