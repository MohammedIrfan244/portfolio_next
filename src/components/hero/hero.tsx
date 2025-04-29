"use client"
import Image from 'next/image';
import React from 'react';
import profile from "@/assets/cprofile.png";
import DualButton from '../ui/dualButton';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { RiInstagramLine } from 'react-icons/ri';
import { BiLogoGmail } from 'react-icons/bi';
import { motion } from 'framer-motion';

function Hero() {
    return (
        <div className="relative h-screen pt-24" id='hero'>
            {/* Background Text */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 -z-10 flex items-center justify-start overflow-hidden"
            >
                <motion.p
                    initial={{ x: -100 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="sm:text-[300px] text-[200px] max-w-2xl text-[#1A1A1A] font-extrabold break-words sm:max-w-screen text-left leading-[0.8]"
                >
                    WEB DEVELOPER
                </motion.p>
            </motion.div>

            {/* Foreground Content */}
            <div className="flex justify-center items-center flex-col gap-10 w-full h-full">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className='space-y-5 flex flex-col items-center'
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Image src={profile} alt='Mohammed Irfan' className='w-36 h-36' />
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className='text-sm text-gray-400'
                    >
                        Hello , I&apos;m Mohammed Irfan 👋
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="sm:text-6xl text-3xl gradient text-center space-y-2 sm:space-y-3.5 
                    bg-gradient-to-br from-[#121212] to-[#1f1f1f] p-6 rounded-lg"
                >
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        MERN Stack Developer,
                    </motion.p>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                    >
                        open to exciting new full-stack
                    </motion.p>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                    >
                        opportunities.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.6 }}
                    className='flex'
                >
                    <motion.div className='flex gap-5 py-1 px-5 bg-[#323237] text-lg items-center'>
                        {[
                            <BiLogoGmail key="gmail" />,
                            <FaGithub key="github" />,
                            <FaLinkedinIn key="linkedin" />,
                            <RiInstagramLine key="instagram" className="font-bold" />
                        ].map((icon, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.2, color: "#fff" }}
                                transition={{ type: "spring", stiffness: 500 }}
                                className="hover:cursor-pointer"
                            >
                                {icon}
                            </motion.div>
                        ))}
                    </motion.div>
                    <DualButton />
                </motion.div>
            </div>
        </div>
    );
}

export default Hero;