"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiRedux, 
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSocketdotio,
  SiGit,
  SiDocker,
  SiFigma,
  SiNpm
} from 'react-icons/si'
import { FaDatabase, FaCloud, FaTools } from 'react-icons/fa'

function Skill() {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "React.js", icon: SiReact, color: "text-blue-500" },
        { name: "Next.js", icon: SiNextdotjs, color: "text-black" },
        { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
        { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
        { name: "Redux", icon: SiRedux, color: "text-purple-600" },
        { name: "TailwindCSS", icon: SiTailwindcss, color: "text-cyan-500" },
      ]
    },
    {
      title: "Backend Technologies",
      skills: [
        { name: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
        { name: "Express.js", icon: SiExpress, color: "text-gray-700" },
        { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
        { name: "REST API", icon: FaDatabase, color: "text-orange-500" },
        { name: "Socket.io", icon: SiSocketdotio, color: "text-black" },
      ]
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git", icon: SiGit, color: "text-red-500" },
        { name: "Docker", icon: SiDocker, color: "text-blue-400" },
        { name: "Figma", icon: SiFigma, color: "text-pink-500" },
        { name: "NPM", icon: SiNpm, color: "text-red-600" },
        { name: "React Query", icon: FaCloud, color: "text-indigo-500" },
        { name: "Zustand", icon: FaTools, color: "text-gray-600" },
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut" as const // use a valid string for ease
      }
    }
  }

  const skillVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as import("framer-motion").Easing // use the correct type for ease
      }
    }
  }

  return (
    <div className='w-full h-full flex flex-col justify-start items-start'>
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeInOut",
          y: { duration: 0.8, ease: "easeOut" }
        }}
        className="text-2xl font-bold text-stone-800 font-serif mb-8"
      >
        Technical Skills
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full space-y-8"
      >
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            variants={categoryVariants}
            className="w-full"
          >
            <h3 className="text-lg font-semibold text-stone-700 mb-4">
              {category.title}
            </h3>
            
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: categoryIndex * 0.2
                  }
                }
              }}
            >
              {category.skills.map((skill) => {
                const IconComponent = skill.icon
                return (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                  >
                    <IconComponent 
                      className={`w-8 h-8 mb-2 ${skill.color} group-hover:scale-110 transition-transform duration-200`} 
                    />
                    <span className="text-sm font-medium text-stone-700 text-center leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Skill