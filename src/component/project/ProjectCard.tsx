import React from 'react'
import { youngSerif } from '@/lib/font'
import { IProject } from '@/lib/types'
import Image from 'next/image'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

function ProjectCard({ project }: { project: IProject }) {
  return (
    <div className={`w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] overflow-hidden relative rounded-lg group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300`}>
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/60" />

      <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 md:p-5 lg:p-6 z-10">
        <div className="flex gap-2 sm:gap-3 justify-end">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
          >
            <FiGithub className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
          >
            <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </a>
        </div>

        <div className="flex-1 flex items-end">
          <h3 className={`text-white ${youngSerif.className} font-thin text-sm md:text-base transform transition-transform duration-300 group-hover:translate-y-[-4px]`}>
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
